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
    fs.readFileSync(path.join(root, 'js', 'lessons.js'), 'utf8'),
    context,
    { filename: 'js/lessons.js' }
  );
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

function assertMultipleChoiceMode(pageId, page, allPracticeIds) {
  const label = pageId + '/multipleChoice';
  const mode = page.modes && page.modes.multipleChoice;
  assert.ok(mode, pageId + ' precisa ter o modo multipleChoice');
  assert.equal(mode.id, 'multipleChoice', label + '.id inesperado');
  assert.equal(mode.interaction, 'multiple-choice', label + '.interaction inesperado');
  assert.ok(Array.isArray(mode.items), label + '.items deve ser uma lista');
  assert.equal(mode.items.length, 50, pageId + ' precisa ter exatamente 50 questões de alternativa');

  const writingIds = new Set((page.modes.sentences.items || []).map((item) => item.id));
  const choiceIds = new Set();
  const correctForms = new Set();
  const answerPositions = new Set();
  const correctAnswers = new Set();
  const expectedForms = pageId === 'sein'
    ? ['bin', 'bist', 'ist', 'sind', 'seid']
    : ['habe', 'hast', 'hat', 'haben', 'habt'];

  mode.items.forEach((item, index) => {
    const itemLabel = label + '/' + index;
    assertNonEmpty(item.id, itemLabel + '.id');
    assert.ok(!choiceIds.has(item.id), 'ID de alternativa duplicado em ' + pageId + ': ' + item.id);
    assert.ok(!writingIds.has(item.id), 'ID de alternativa colide com frase escrita: ' + item.id);
    assert.ok(!allPracticeIds.has(item.id), 'ID de alternativa colide com outro exercício: ' + item.id);
    choiceIds.add(item.id);
    allPracticeIds.add(item.id);

    for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en']) {
      assertNonEmpty(item[field], itemLabel + '.' + field);
    }
    assert.ok(Array.isArray(item.options) && item.options.length === 4, itemLabel + '.options deve ter quatro itens');
    assert.ok(Array.isArray(item.options_en) && item.options_en.length === 4, itemLabel + '.options_en deve ter quatro itens');
    assert.ok(Array.isArray(item.optionIds) && item.optionIds.length === 4, itemLabel + '.optionIds deve ter quatro itens');
    assert.equal(new Set(item.options.map((option) => option.trim().toLowerCase())).size, 4, itemLabel + '.options deve ser única');
    assert.equal(new Set(item.optionIds).size, 4, itemLabel + '.optionIds deve ser único');
    item.options.forEach((option, optionIndex) => assertNonEmpty(option, itemLabel + '.options[' + optionIndex + ']'));
    item.options_en.forEach((option, optionIndex) => assertNonEmpty(option, itemLabel + '.options_en[' + optionIndex + ']'));
    assert.ok(item.optionIds.includes(item.correctOptionId), itemLabel + '.correctOptionId inválido');

    const correctIndex = item.optionIds.indexOf(item.correctOptionId);
    const correctAnswer = item.options[correctIndex];
    const correctFormMatch = correctAnswer.match(/\b(bin|bist|ist|sind|seid|habe|hast|hat|haben|habt)\b/);
    assert.ok(correctFormMatch, itemLabel + ' não contém uma forma conjugada reconhecível');
    assert.ok(expectedForms.includes(correctFormMatch[1]), itemLabel + ' mistura o verbo errado');
    correctForms.add(correctFormMatch[1]);
    answerPositions.add(correctIndex);
    correctAnswers.add(correctAnswer);
  });

  assert.equal(choiceIds.size, 50, pageId + ' deve ter 50 IDs de alternativas únicos');
  assert.equal(answerPositions.size, 4, pageId + ' deve variar a posição da resposta correta entre as quatro alternativas');
  for (const form of expectedForms) {
    assert.ok(correctForms.has(form), pageId + ' deve incluir a forma ' + form + ' nas respostas corretas');
  }
  assert.equal(correctAnswers.size, 50, pageId + ' deve variar as respostas corretas das alternativas');
}

function assertMixedMode(pageId, page, allPracticeIds) {
  const label = pageId + '/mixed';
  const mixed = page.modes && page.modes.mixed;
  assert.ok(mixed, pageId + ' precisa ter o modo mixed');
  assert.equal(mixed.id, 'mixed', label + '.id inesperado');
  assert.equal(mixed.interaction, 'mixed', label + '.interaction inesperado');
  assert.ok(Array.isArray(mixed.items), label + '.items deve ser uma lista');
  assert.equal(mixed.items.length, 100, pageId + ' deve ter 100 questões no treino misto');
  assert.ok(page.modes.multipleChoice, pageId + ' precisa ter o modo multipleChoice antes do modo mixed');

  const writingIds = new Set(page.modes.sentences.items.map((item) => item.id));
  const choiceIds = new Set(page.modes.multipleChoice.items.map((item) => item.id));
  const mixedIds = new Set();
  const mixedWritingIds = new Set();
  const mixedChoiceIds = new Set();

  mixed.items.forEach((item, index) => {
    const itemLabel = label + '/' + index;
    assertNonEmpty(item.id, itemLabel + '.id');
    assert.ok(!mixedIds.has(item.id), 'ID duplicado no treino misto de ' + pageId + ': ' + item.id);
    mixedIds.add(item.id);
    assert.ok(allPracticeIds.has(item.id), itemLabel + ' deve reutilizar um item de escrita ou alternativa existente');
    assert.ok(['text', 'multiple-choice'].includes(item.interaction), itemLabel + '.interaction inválido');

    if (item.interaction === 'text') {
      mixedWritingIds.add(item.id);
      assert.equal(item.questionType, 'Escrita', itemLabel + '.questionType PT inesperado');
      assert.equal(item.questionType_en, 'Writing', itemLabel + '.questionType EN inesperado');
    } else {
      mixedChoiceIds.add(item.id);
      assert.equal(item.questionType, 'Múltipla escolha', itemLabel + '.questionType PT inesperado');
      assert.equal(item.questionType_en, 'Multiple choice', itemLabel + '.questionType EN inesperado');
    }
  });

  assert.equal(mixedWritingIds.size, 50, pageId + ' deve ter 50 questões escritas no treino misto');
  assert.equal(mixedChoiceIds.size, 50, pageId + ' deve ter 50 questões de alternativa no treino misto');
  assert.deepEqual(mixedWritingIds, writingIds, pageId + ' mixed deve conter todas as frases escritas');
  assert.deepEqual(mixedChoiceIds, choiceIds, pageId + ' mixed deve conter todas as alternativas');

  const visibleModes = Object.values(page.modes)
    .filter((mode) => mode.visible !== false)
    .map((mode) => mode.id);
  assert.deepEqual(visibleModes, ['conjugation', 'mixed'], pageId + ' deve exibir somente conjugation e mixed');
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
  ['oferece 50 alternativas reutilizáveis para sein e haben', () => {
    const { verbPractice } = getModules();
    const allPracticeIds = new Set();
    for (const pageId of ['sein', 'haben']) {
      const page = verbPractice.pages[pageId];
      assert.ok(page, 'página ' + pageId + ' não encontrada');
      page.modes.conjugation.items.forEach((item) => allPracticeIds.add(item.id));
      page.modes.sentences.items.forEach((item) => allPracticeIds.add(item.id));
    }
    for (const pageId of ['sein', 'haben']) {
      const page = verbPractice.pages[pageId];
      assertMultipleChoiceMode(pageId, page, allPracticeIds);
    }
  }],
  ['une escrita e alternativas em treinos mistos de 100 questões para sein e haben', () => {
    const { verbPractice } = getModules();
    const allPracticeIds = new Set();
    for (const pageId of ['sein', 'haben']) {
      const page = verbPractice.pages[pageId];
      assert.ok(page, 'página ' + pageId + ' não encontrada');
      page.modes.conjugation.items.forEach((item) => allPracticeIds.add(item.id));
      page.modes.sentences.items.forEach((item) => allPracticeIds.add(item.id));
      assert.ok(page.modes.multipleChoice, pageId + ' precisa ter o modo multipleChoice antes do modo mixed');
      page.modes.multipleChoice.items.forEach((item) => allPracticeIds.add(item.id));
    }
    for (const pageId of ['sein', 'haben']) {
      assertMixedMode(pageId, verbPractice.pages[pageId], allPracticeIds);
    }

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
  ['oferece frases iniciais como primeiro exercício unitário', () => {
    const { verbPractice } = getModules();
    assert.deepEqual(Object.keys(verbPractice.pages), ['first-sentences', 'sein', 'haben', 'numbers', 'w-fragen']);
    const page = verbPractice.pages['first-sentences'];
    assertNonEmpty(page.title, 'first-sentences.title');
    assertNonEmpty(page.title_en, 'first-sentences.title_en');
    assert.deepEqual(Object.keys(page.modes), ['sentences', 'random']);
    const mode = page.modes.sentences;
    assert.equal(mode.interaction, 'streak');
    assert.equal(mode.shuffle, false);
    assert.equal(mode.items.length, 50);
    assert.ok(mode.items.every((item) => item.id.startsWith('fs')));
    assert.equal(new Set(mode.items.map((item) => item.id)).size, 50);
    mode.items.forEach((item, index) => {
      const label = 'first-sentences/' + index;
      for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en', 'placeholder', 'placeholder_en']) {
        assertNonEmpty(item[field], label + '.' + field);
      }
      assert.ok(Array.isArray(item.answers) && item.answers.length > 0, label + '.answers deve existir');
    });
    const randomMode = page.modes.random;
    assert.equal(randomMode.interaction, 'streak');
    assert.equal(randomMode.shuffle, true);
    assert.equal(randomMode.items.length, 50);
    assert.deepEqual(
      Array.from(randomMode.items, (item) => item.id),
      Array.from(mode.items, (item) => item.id)
    );
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
