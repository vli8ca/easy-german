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
    verbPractice: context.window.KlarVerbPractice,
    lessons: context.window.KlarLessons,
    exerciseOnly: context.window.KlarExerciseOnly
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
    assert.deepEqual(Object.keys(verbPractice.pages), ['first-sentences', 'first-sentences-2', 'first-sentences-3', 'sein', 'haben', 'numbers', 'w-fragen']);
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
  ['aceita omissão de trema em todas as respostas digitadas e mantém a forma padrão', () => {
    const { exercises, verbPractice, lessons, exerciseOnly } = getModules();
    const umlautToBase = { ä: 'a', ö: 'o', ü: 'u', Ä: 'A', Ö: 'O', Ü: 'U' };
    const withoutUmlauts = (answer) => answer.replace(/[äöüÄÖÜ]/g, (letter) => umlautToBase[letter]);
    const omitFirstUmlaut = (answer) => answer.replace(/[äöüÄÖÜ]/, (letter) => umlautToBase[letter]);
    const ambiguousOmission = (answer, omission) => (
      (/schön/i.test(answer) && /schon/i.test(omission)) ||
      (/möchte/i.test(answer) && /mochte/i.test(omission))
    );
    const textExercises = [];

    [...lessons, ...exerciseOnly].forEach((lesson) => {
      (lesson.exercises || []).forEach((exercise) => {
        if (['fill', 'translate'].includes(exercise.type)) textExercises.push({ label: lesson.id + '/' + exercise.id, exercise });
      });
    });
    Object.values(verbPractice.pages).forEach((page) => {
      Object.values(page.modes).forEach((mode) => {
        mode.items.forEach((item) => {
          const isTextInput = mode.interaction === 'streak' || mode.interaction === 'form' || (mode.interaction === 'mixed' && item.interaction === 'text');
          if (isTextInput) textExercises.push({ label: page.id + '/' + mode.id + '/' + item.id, exercise: item });
        });
      });
    });

    let umlautAnswers = 0;
    let ambiguousAnswers = 0;
    textExercises.forEach(({ label, exercise }) => {
      const acceptedAnswers = exercise.answers || [exercise.answer];
      acceptedAnswers.forEach((canonical) => {
        if (!/[äöüÄÖÜ]/.test(canonical)) return;
        umlautAnswers += 1;
        const completeOmission = withoutUmlauts(canonical);
        const partialOmission = omitFirstUmlaut(canonical);
        const shouldAcceptComplete = !ambiguousOmission(canonical, completeOmission);
        const shouldAcceptPartial = !ambiguousOmission(canonical, partialOmission);
        if (!shouldAcceptComplete) ambiguousAnswers += 1;
        assert.equal(exercises.matchesGermanAnswer(completeOmission, [canonical]), shouldAcceptComplete, label + ' deve tratar a omissão conforme a ambiguidade da palavra');
        assert.equal(exercises.matchesGermanAnswer(partialOmission, [canonical]), shouldAcceptPartial, label + ' deve tratar a omissão parcial conforme a ambiguidade da palavra');
        if (exercise.type === 'fill' || exercise.type === 'translate') {
          assert.equal(exercises.isCorrect(completeOmission, exercise), shouldAcceptComplete, label + ' deve aplicar a regra na validação da aula');
        }
      });
      assert.equal(exercises.answerLabel(exercise), exercise.answer || acceptedAnswers[0], label + ' deve mostrar a resposta padrão');
    });

    assert.ok(textExercises.length > 100, 'a auditoria deve cobrir todas as seções com resposta digitada');
    assert.ok(umlautAnswers > 0, 'as seções auditadas precisam conter respostas com trema');
    assert.ok(ambiguousAnswers > 0, 'a auditoria deve encontrar e proteger as palavras em que omitir o trema muda o significado');
    assert.equal(exercises.isCorrect('funf', { type: 'translate', answer: 'fünf', answers: ['fünf'] }), true);
    assert.equal(exercises.isCorrect('fünf', { type: 'translate', answer: 'funf', answers: ['funf'] }), false, 'a tolerância deve aceitar omissões, não adicionar trema a outra resposta');
    assert.equal(exercises.isCorrect('mochte', { type: 'multiple', answer: 'möchte' }), false, 'alternativas continuam exigindo a grafia exata');
    assert.equal(exercises.matchesGermanAnswer('Mochtest du Tee oder Kaffee?', ['Möchtest du Tee oder Kaffee?']), false, 'möchtest e mochtest têm significados diferentes');
    assert.equal(exercises.matchesGermanAnswer('mochte', ['möchte']), false, 'möchte e mochte também têm significados diferentes');
    assert.equal(exercises.matchesGermanAnswer('mochten', ['möchten']), false, 'möchten e mochten também têm significados diferentes');
    assert.equal(exercises.matchesGermanAnswer('Die Bäckerei ist schon', ['Die Bäckerei ist schön']), false, 'schön e schon têm significados diferentes');
    assert.equal(exercises.hasOmittedUmlaut('funf', 'fünf'), true, 'o feedback deve identificar a grafia sem trema');
    assert.equal(exercises.hasOmittedUmlaut('schon', 'schön'), true, 'o helper deve reconhecer que o trema foi omitido');
    assert.equal(exercises.hasAmbiguousUmlautOmission('schon', 'schön'), true, 'o feedback deve explicar quando a omissão muda o significado');
    assert.equal(exercises.hasOmittedUmlaut('schön', 'schon'), false, 'o feedback não deve tratar trema acrescentado como omissão');
    const appSource = readSource('js/app.js');
    assert.equal((appSource.match(/exercises\.matchesGermanAnswer\(response, item\.answers\)/g) || []).length, 3, 'frases, treino misto e lote de verbos devem usar a mesma validação');
    assert.ok(appSource.includes('exercises.hasOmittedUmlaut(response, standardAnswer)'), 'o feedback das aulas deve mostrar a grafia padrão quando o trema foi omitido');
    assert.ok(appSource.includes('exercise.umlautChangesMeaning'), 'a interface deve explicar quando o trema distingue palavras');
    assert.ok(appSource.includes('exercise.correctKeyboardVariant'), 'a interface deve ter uma mensagem com a resposta padrão');
  }],
  ['mantém normalização estrita, mas aceita omissão de trema sem alterar ß ou letras simples', () => {
    const { exercises } = getModules();
    const pairs = [
      ['glücklich', 'glucklich'],
      ['für', 'fur']
    ];

    for (const [canonical, ascii] of pairs) {
      assert.notEqual(
        exercises.normalizeGermanAnswer(canonical),
        exercises.normalizeGermanAnswer(ascii),
        'a normalização não deve fundir ' + canonical + '/' + ascii
      );
      assert.equal(
        exercises.matchesGermanAnswer(ascii, [canonical]),
        true,
        'a resposta sem trema deve ser aceita para ' + canonical
      );
    }
    assert.notEqual(exercises.normalizeGermanAnswer('schön'), exercises.normalizeGermanAnswer('schon'));
    assert.equal(exercises.matchesGermanAnswer('schoen', ['schön']), false, 'ae/oe/ue não são omissão de trema');
    assert.equal(exercises.matchesGermanAnswer('schon', ['schön']), false, 'schön e schon têm significados diferentes');
    assert.equal(exercises.matchesGermanAnswer('Masse', ['Maße']), false, 'ß/ss deve continuar distinto');
    assert.equal(exercises.matchesGermanAnswer('Strasse', ['Straße']), false, 'ß/ss deve continuar distinto');
    assert.equal(exercises.matchesGermanAnswer('fällen', ['fallen']), false, 'a tolerância não pode acrescentar trema à resposta');
    assert.equal(exercises.matchesGermanAnswer('schoen', ['schön', 'schoen']), true, 'variantes explicitamente cadastradas continuam aceitas');
  }],
  ['ignora pontuação na comparação e usa vírgulas nas frases iniciais 3', () => {
    const { exercises, verbPractice } = getModules();
    const typedAnswer = 'Lisa und Anna sind sportlich sie joggen oft im park';
    const canonicalAnswer = 'Lisa und Anna sind sportlich, sie joggen oft im Park.';

    assert.equal(exercises.matchesGermanAnswer(typedAnswer, [canonicalAnswer]), true, 'a resposta do usuário não deve precisar repetir a vírgula');
    assert.equal(exercises.matchesGermanAnswer('Lisa und Anna sind sportlich; sie joggen oft im Park', [canonicalAnswer]), true, 'ponto e vírgula e vírgula não devem mudar a validação');
    assert.equal(exercises.matchesGermanAnswer('schon', ['schön,']), false, 'ignorar pontuação não pode fundir schon e schön');
    assert.equal(exercises.matchesGermanAnswer('Strasse', ['Straße;']), false, 'ignorar pontuação não pode fundir ß e ss');

    const page = Object.values(verbPractice.pages).find((candidate) => candidate.modes && candidate.modes.sentences && candidate.modes.sentences.label === 'Frases iniciais 3');
    assert.ok(page, 'a seção Frases iniciais 3 deve continuar registrada');
    page.modes.sentences.items.forEach((item) => {
      const sentenceText = [item.prompt, item.prompt_en].concat(item.answers || []).join(' ');
      assert.doesNotMatch(sentenceText, /;/, item.id + ' não deve usar ponto e vírgula nas frases');
    });
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
