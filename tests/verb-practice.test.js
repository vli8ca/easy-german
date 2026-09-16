const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

function loadVerbPracticeModules() {
  const context = vm.createContext({
    console,
    window: {
      KlarIcons: {
        render() { return ''; },
        refresh() {}
      },
      KlarI18n: {
        t(key) { return key; }
      }
    }
  });

  vm.runInContext(
    fs.readFileSync(path.join(root, 'js', 'exercises.js'), 'utf8'),
    context,
    { filename: 'js/exercises.js' }
  );
  vm.runInContext(
    fs.readFileSync(path.join(root, 'js', 'verb-exercises.js'), 'utf8'),
    context,
    { filename: 'js/verb-exercises.js' }
  );

  return {
    exercises: context.window.KlarExercises,
    verbPractice: context.window.KlarVerbPractice
  };
}

let modules;

function getModules() {
  if (!modules) modules = loadVerbPracticeModules();
  return modules;
}

function assertNonEmpty(value, message) {
  assert.equal(typeof value, 'string', message + ' deve ser texto');
  assert.ok(value.trim(), message + ' não pode ficar vazio');
}

function readSource(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function runScenario(name, scenario) {
  try {
    scenario();
    console.log('✓ ' + name);
    return true;
  } catch (error) {
    console.error('✗ ' + name + '\n  ' + error.message);
    return false;
  }
}

const scenarios = [
  ['carrega exercises.js e verb-exercises.js em VM mínima', () => {
    const loaded = getModules();
    assert.ok(loaded.exercises, 'KlarExercises não foi exposto no window');
    assert.ok(loaded.verbPractice, 'KlarVerbPractice não foi exposto no window');
  }],
  ['mantém 50 frases A1 bilíngues para sein e haben com IDs únicos', () => {
    const { verbPractice } = getModules();
    const ids = new Set();

    for (const pageId of ['sein', 'haben']) {
      const page = verbPractice.pages[pageId];
      assert.ok(page, 'página ' + pageId + ' não encontrada');
      assertNonEmpty(page.title, pageId + '.title');
      assertNonEmpty(page.title_en, pageId + '.title_en');

      const mode = page.modes && page.modes.sentences;
      assert.ok(mode, pageId + ' precisa ter o modo sentences');
      assertNonEmpty(mode.title, pageId + '.modes.sentences.title');
      assertNonEmpty(mode.title_en, pageId + '.modes.sentences.title_en');
      assertNonEmpty(mode.instruction, pageId + '.modes.sentences.instruction');
      assertNonEmpty(mode.instruction_en, pageId + '.modes.sentences.instruction_en');
      assert.ok(Array.isArray(mode.items), pageId + '.modes.sentences.items deve ser uma lista');
      assert.equal(mode.items.length, 50, pageId + ' precisa ter exatamente 50 frases');

      for (const item of mode.items) {
        assertNonEmpty(item.id, pageId + ' item.id');
        assert.ok(!ids.has(item.id), 'ID de frase duplicado: ' + item.id);
        ids.add(item.id);

        for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en', 'placeholder', 'placeholder_en']) {
          assertNonEmpty(item[field], pageId + '/' + item.id + '.' + field);
        }

        assert.ok(Array.isArray(item.answers) && item.answers.length > 0, pageId + '/' + item.id + '.answers deve ter ao menos uma resposta');
        item.answers.forEach((answer, index) => assertNonEmpty(answer, pageId + '/' + item.id + '.answers[' + index + ']'));
      }
    }
    assert.equal(ids.size, 100, 'a prática deve ter 100 frases no total');
  }],
  ['aceita grafia sem diacríticos para ä/ö/ü e ß', () => {
    const { exercises } = getModules();
    const pairs = [
      ['glücklich', 'glucklich'],
      ['schön', 'schon'],
      ['für', 'fur'],
      ['Straße', 'Strasse']
    ];

    for (const [canonical, ascii] of pairs) {
      assert.equal(
        exercises.normalizeGermanAnswer(canonical),
        exercises.normalizeGermanAnswer(ascii),
        'normalização divergente para ' + canonical + '/' + ascii
      );
      assert.equal(
        exercises.isCorrect(ascii, { answers: [canonical] }),
        true,
        'a grafia sem diacrítico deveria ser aceita para ' + canonical
      );
    }
  }],
  ['expõe o contrato estático da UI one-at-a-time', () => {
    const appSource = readSource('js/app.js');
    for (const marker of ['data-verb-answer', 'data-check-verb', 'data-next-verb', 'data-retry-verb']) {
      assert.ok(appSource.includes(marker), 'app.js não contém o marcador ' + marker);
    }
  }],
  ['embaralha a ordem das frases a cada nova sessão', () => {
    const appSource = readSource('js/app.js');
    assert.match(appSource, /\border\s*:/i, 'a sessão precisa guardar a ordem das frases');
    assert.match(appSource, /\bshuffle\w*\s*\(/i, 'a prática precisa ter uma operação de shuffle');
    assert.match(appSource, /Math\.random\s*\(/, 'o shuffle precisa usar aleatoriedade');
    assert.ok(
      /\border[\s\S]{0,400}\bshuffle|\bshuffle[\s\S]{0,400}\border/i.test(appSource),
      'a ordem embaralhada precisa estar ligada ao estado da sessão'
    );
  }],
  ['incrementa o streak no acerto e zera no erro', () => {
    const appSource = readSource('js/app.js');
    assert.match(appSource, /(?:session\.)?streak\s*:\s*0/, 'a sessão precisa iniciar streak em zero');
    assert.ok(
      /session\.streak\s*\+=\s*1|session\.streak\s*=\s*session\.streak\s*\+\s*1/i.test(appSource),
      'um acerto precisa incrementar session.streak'
    );
    assert.match(appSource, /session\.streak\s*=\s*0/, 'um erro precisa zerar session.streak');
  }],
  ['remove o progresso por número da frase e exibe marcadores de streak', () => {
    const uiSource = readSource('js/app.js') + readSource('css/styles.css');

    for (const marker of ['verb-sentence-progress', 'data-verb-sentence-progress']) {
      assert.doesNotMatch(uiSource, new RegExp(marker), 'o marcador visual antigo não deve existir: ' + marker);
    }

    for (const marker of ['data-verb-streak', 'verb-streak']) {
      assert.ok(uiSource.includes(marker), 'a UI não contém o marcador de streak ' + marker);
    }
  }]
];

const passed = scenarios.reduce((count, [name, scenario]) => (
  count + (runScenario(name, scenario) ? 1 : 0)
), 0);

console.log('\nVerb practice QA: ' + passed + '/' + scenarios.length + ' cenários aprovados.');
if (passed !== scenarios.length) process.exitCode = 1;
