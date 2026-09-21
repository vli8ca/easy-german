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
  ['adiciona 50 alternativas novas de sein com quatro opções estáveis', () => {
    const { verbPractice } = getModules();
    const page = verbPractice.pages.sein;
    const writing = page.modes.sentences;
    const multipleChoice = page.modes.multipleChoice;
    assert.ok(multipleChoice, 'sein precisa ter o modo multipleChoice');
    assert.equal(verbPractice.pages.haben.modes.multipleChoice, undefined, 'o modo novo deve existir somente em sein');
    assert.equal(multipleChoice.interaction, 'multiple-choice');
    assert.equal(multipleChoice.items.length, 50, 'sein precisa ter exatamente 50 questões de alternativa');

    const writingIds = new Set(writing.items.map((item) => item.id));
    const writingAnswers = new Set(writing.items.flatMap((item) => item.answers.map((answer) => answer.trim().toLowerCase())));
    const choiceIds = new Set();
    const correctAnswers = new Set();
    const conjugations = new Set();
    const answerPositions = new Set();

    multipleChoice.items.forEach((item, index) => {
      const label = 'sein/multipleChoice/' + index;
      assertNonEmpty(item.id, label + '.id');
      assert.ok(!choiceIds.has(item.id), 'ID de alternativa duplicado: ' + item.id);
      assert.ok(!writingIds.has(item.id), 'ID de alternativa colide com frase escrita: ' + item.id);
      choiceIds.add(item.id);
      for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en']) assertNonEmpty(item[field], label + '.' + field);
      assert.ok(Array.isArray(item.options) && item.options.length === 4, label + '.options deve ter quatro itens');
      assert.ok(Array.isArray(item.options_en) && item.options_en.length === 4, label + '.options_en deve ter quatro itens');
      assert.ok(Array.isArray(item.optionIds) && item.optionIds.length === 4, label + '.optionIds deve ter quatro itens');
      assert.equal(new Set(item.options.map((option) => option.trim().toLowerCase())).size, 4, label + '.options deve ser único');
      assert.equal(new Set(item.optionIds).size, 4, label + '.optionIds deve ser único');
      item.options.forEach((option, optionIndex) => assertNonEmpty(option, label + '.options[' + optionIndex + ']'));
      assert.ok(item.options.every((option) => !/\b(habe|hast|hat|haben|habt)\b/i.test(option)), label + ' deve praticar somente sein');
      assert.ok(item.optionIds.includes(item.correctOptionId), label + '.correctOptionId inválido');
      const correctIndex = item.optionIds.indexOf(item.correctOptionId);
      const correctAnswer = item.options[correctIndex];
      answerPositions.add(correctIndex);
      assert.ok(!correctAnswers.has(correctAnswer), 'resposta correta repetida: ' + correctAnswer);
      assert.ok(!writingAnswers.has(correctAnswer.trim().toLowerCase()), 'resposta correta reaproveita frase escrita: ' + correctAnswer);
      correctAnswers.add(correctAnswer);
      conjugations.add(correctAnswer.split(/\s+/)[1]);
    });

    assert.equal(choiceIds.size, 50, 'os IDs das alternativas devem ser únicos');
    assert.equal(answerPositions.size, 4, 'a posição da resposta correta deve variar entre as quatro alternativas');
    for (const form of ['bin', 'bist', 'ist', 'sind', 'seid']) {
      assert.ok(conjugations.has(form), 'a prática de alternativas deve incluir a forma ' + form);
    }
  }],
  ['une escrita e alternativas em um único treino misto de 100 questões', () => {
    const { verbPractice } = getModules();
    const page = verbPractice.pages.sein;
    const mixed = page.modes.mixed;
    assert.ok(mixed, 'sein precisa ter o modo mixed');
    assert.equal(mixed.interaction, 'mixed');
    assert.equal(mixed.items.length, 100, 'o treino misto deve ter 100 questões');

    const writingIds = new Set(page.modes.sentences.items.map((item) => item.id));
    const choiceIds = new Set(page.modes.multipleChoice.items.map((item) => item.id));
    const mixedIds = new Set(mixed.items.map((item) => item.id));
    assert.equal(mixedIds.size, 100, 'o treino misto não pode repetir IDs');
    assert.equal(mixed.items.filter((item) => item.interaction === 'text').length, 50, 'o treino misto deve ter 50 questões de escrita');
    assert.equal(mixed.items.filter((item) => item.interaction === 'multiple-choice').length, 50, 'o treino misto deve ter 50 questões de alternativa');
    assert.ok(mixed.items.filter((item) => item.interaction === 'text').every((item) => item.questionType === 'Escrita' && item.questionType_en === 'Writing'), 'as questões escritas precisam indicar o tipo');
    assert.ok(mixed.items.filter((item) => item.interaction === 'multiple-choice').every((item) => item.questionType === 'Múltipla escolha' && item.questionType_en === 'Multiple choice'), 'as questões de alternativa precisam indicar o tipo');
    assert.deepEqual(new Set(mixed.items.filter((item) => item.interaction === 'text').map((item) => item.id)), writingIds);
    assert.deepEqual(new Set(mixed.items.filter((item) => item.interaction === 'multiple-choice').map((item) => item.id)), choiceIds);

    const visibleModes = Object.values(page.modes).filter((mode) => mode.visible !== false).map((mode) => mode.id);
    assert.deepEqual(visibleModes, ['conjugation', 'mixed'], 'somente conjugação e treino misto devem aparecer como abas');
    const appSource = readSource('js/app.js');
    assert.ok(appSource.includes('shuffleVerbMixedOrder'), 'a sessão mista deve ter uma ordem própria');
    assert.ok(appSource.includes('isMixedMode(mode)'), 'a UI deve detectar o modo misto pelo contrato');
  }],
  ['oferece prática de números em dois módulos bilíngues', () => {
    const { verbPractice } = getModules();
    const page = verbPractice.pages.numbers;
    assert.ok(page, 'página numbers não encontrada');
    assertNonEmpty(page.title, 'numbers.title');
    assertNonEmpty(page.title_en, 'numbers.title_en');

    const sequence = page.modes && page.modes.sequence;
    const random = page.modes && page.modes.random;
    assert.ok(sequence, 'numbers precisa ter o modo sequence');
    assert.ok(random, 'numbers precisa ter o modo random');
    assert.equal(sequence.interaction, 'streak');
    assert.equal(random.interaction, 'streak');
    assert.equal(sequence.shuffle, false, 'o primeiro módulo deve manter 1 a 10 em ordem');
    assert.equal(random.shuffle, true, 'o segundo módulo deve embaralhar os números');

    const expected = ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'];
    for (const [modeId, mode] of [['sequence', sequence], ['random', random]]) {
      assert.ok(Array.isArray(mode.items), 'numbers.' + modeId + '.items deve ser uma lista');
      assert.equal(mode.items.length, 10, 'numbers.' + modeId + ' precisa ter dez números');
      mode.items.forEach((item, index) => {
        assert.equal(item.prompt, String(index + 1), 'prompt inesperado em numbers.' + modeId);
        assert.equal(item.answers[0], expected[index], 'resposta inesperada para ' + item.prompt);
        for (const field of ['prompt_en', 'detail', 'detail_en', 'placeholder', 'placeholder_en']) {
          assertNonEmpty(item[field], 'numbers/' + modeId + '/' + item.id + '.' + field);
        }
      });
    }
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
    for (const marker of ['data-verb-answer', 'data-check-verb', 'data-next-verb', 'data-retry-verb', 'data-verb-option', 'data-verb-option-id', 'data-verb-mixed-practice', 'role="radiogroup"', 'renderMixedPractice', 'checkChoicePractice', 'checkMixedPractice']) {
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
