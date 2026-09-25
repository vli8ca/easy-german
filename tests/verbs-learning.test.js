const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const context = vm.createContext({ window: {} });
vm.runInContext(
  fs.readFileSync(path.join(root, 'js', 'verbs.js'), 'utf8'),
  context,
  { filename: 'js/verbs.js' }
);

const pages = context.window.KlarVerbs.pages;
const page = pages.starter;

assert.deepEqual(Object.keys(pages), ['starter'], 'a primeira versão deve ter uma única seção de verbos');
assert.equal(page.id, 'verbs-starter');
assert.equal(page.title, 'Primeiros verbos');
assert.equal(page.title_en, 'First verbs');

const expectedVerbs = {
  lernen: ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen'],
  machen: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'],
  spielen: ['spiele', 'spielst', 'spielt', 'spielen', 'spielt', 'spielen']
};
const expectedExamples = {
  lernen: 'Ich lerne Deutsch.',
  machen: 'Wir machen eine Pause.',
  spielen: 'Die Kinder spielen draußen.'
};
const expectedUsageCounts = { lernen: 4, machen: 12, spielen: 8 };

assert.deepEqual(
  Array.from(page.verbs, (verb) => verb.infinitive),
  ['lernen', 'machen', 'spielen'],
  'a primeira seção deve ensinar três verbos regulares e úteis'
);

for (const verb of page.verbs) {
  assert.ok(verb.meaning && verb.meaning_en, verb.infinitive + ' precisa ter tradução em português e inglês');
  assert.ok(verb.explanation && verb.explanation_en, verb.infinitive + ' precisa explicar sua conjugação nos dois idiomas');
  assert.equal(verb.forms.length, 6, verb.infinitive + ' deve apresentar as seis pessoas do presente');
  assert.deepEqual(
    Array.from(verb.forms, (form) => form.form),
    expectedVerbs[verb.infinitive],
    'formas do presente incorretas para ' + verb.infinitive
  );
  assert.equal(verb.example, expectedExamples[verb.infinitive], 'o exemplo em alemão deve continuar visível nos dois idiomas');
  assert.ok(verb.exampleTranslation && verb.exampleTranslation_en, verb.infinitive + ' precisa de uma tradução bilíngue');
  assert.ok(Array.isArray(verb.usages) && verb.usages.length > 0, verb.infinitive + ' precisa explicar seus usos comuns');
  assert.equal(verb.usages.length, expectedUsageCounts[verb.infinitive], verb.infinitive + ' precisa cobrir todos os usos definidos');
  for (const usage of verb.usages) {
    for (const field of ['title', 'title_en', 'copy', 'copy_en']) {
      assert.ok(usage[field] && usage[field].trim(), verb.infinitive + ' precisa preencher ' + field + ' em cada uso');
    }
    assert.ok(Array.isArray(usage.examples) && usage.examples.length > 0, verb.infinitive + ' precisa exemplificar cada uso');
    for (const example of usage.examples) {
      for (const field of ['de', 'pt', 'en']) {
        assert.ok(example[field] && example[field].trim(), verb.infinitive + ' precisa preencher exemplo.' + field);
      }
    }
  }
}

const mode = page.modes.practice;
assert.equal(page.showQuestionCount, true, 'o treino deve informar a posição dentro das vinte questões');
assert.equal(mode.interaction, 'streak', 'o treino deve corrigir uma questão por vez');
assert.equal(mode.shuffle, false, 'a primeira sessão deve seguir uma ordem didática');
assert.equal(mode.items.length, 20, 'a primeira seção deve ter vinte questões');

const expectedAnswers = [
  'lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen',
  'mache', 'machst', 'macht', 'machen', 'macht', 'machen',
  'spiele', 'spielst', 'spielt', 'spielen', 'spielt', 'spielen',
  'lernen', 'spielen'
];
const exerciseIds = new Set();
const countsByVerb = { lernen: 0, machen: 0, spielen: 0 };

mode.items.forEach((item, index) => {
  assert.ok(item.id && !exerciseIds.has(item.id), 'cada questão precisa de um ID único');
  exerciseIds.add(item.id);
  for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en', 'placeholder', 'placeholder_en']) {
    assert.ok(item[field] && item[field].trim(), item.id + ' precisa preencher ' + field);
  }
  assert.deepEqual(Array.from(item.answers), [expectedAnswers[index]], 'resposta incorreta em ' + item.id);
  if (Object.prototype.hasOwnProperty.call(countsByVerb, item.verbId)) countsByVerb[item.verbId] += 1;
});

assert.deepEqual(countsByVerb, { lernen: 7, machen: 6, spielen: 7 }, 'as vinte questões devem se referir aos três verbos do módulo');
assert.equal(mode.items[18].verbId, 'lernen');
assert.equal(mode.items[19].verbId, 'spielen');

const phraseMode = page.modes.phrases;
assert.ok(phraseMode, 'a prática de frases deve existir junto com a conjugação');
assert.equal(phraseMode.interaction, 'streak', 'as frases devem manter o fluxo de uma questão por vez');
assert.equal(phraseMode.shuffle, true, 'as frases devem começar em ordem aleatória');
assert.equal(phraseMode.items.length, 75, 'a prática deve conter 75 frases');
for (const field of ['label', 'label_en', 'shortLabel', 'shortLabel_en', 'title', 'title_en', 'instruction', 'instruction_en', 'restartLabel', 'restartLabel_en']) {
  assert.ok(phraseMode[field] && phraseMode[field].trim(), 'a prática de frases precisa preencher ' + field);
}

const phraseIds = new Set();
const phraseCounts = { lernen: 0, machen: 0, spielen: 0 };
for (const item of phraseMode.items) {
  assert.ok(item.id && !phraseIds.has(item.id), 'cada frase precisa de um ID único');
  phraseIds.add(item.id);
  assert.ok(Object.hasOwn(phraseCounts, item.verbId), item.id + ' precisa identificar um dos três verbos');
  phraseCounts[item.verbId] += 1;
  for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en', 'placeholder', 'placeholder_en']) {
    assert.ok(item[field] && item[field].trim(), item.id + ' precisa preencher ' + field);
  }
  assert.ok(Array.isArray(item.answers) && item.answers.length > 0, item.id + ' precisa ter resposta aceita');
  item.answers.forEach((answer) => assert.ok(answer && answer.trim(), item.id + ' não pode ter resposta vazia'));
}
assert.deepEqual(phraseCounts, { lernen: 25, machen: 25, spielen: 25 }, 'a prática precisa ter 25 frases para cada verbo');

const appSource = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');
assert.ok(appSource.includes('<dialog class="verb-usage-dialog"'), 'os usos devem abrir em uma janela sobreposta independente');
assert.ok(appSource.includes('data-open-verb-usage'), 'cada cartão deve abrir sua própria janela de usos');
assert.ok(appSource.includes('data-close-verb-usage'), 'a janela deve oferecer uma ação de fechamento');
assert.ok(appSource.includes('dialog.showModal()'), 'a janela deve usar o modo modal nativo');
assert.ok(appSource.includes('role="tablist"'), 'a prática deve expor as duas modalidades como abas acessíveis');
assert.ok(appSource.includes('renderActiveVerbPractice();'), 'a troca de modo deve renderizar também a página de verbos');
const exerciseModeHandler = appSource.match(/const exerciseMode = event\.target\.closest\('\[data-exercise-mode\]'\);([\s\S]*?)\n\s*\}/);
assert.ok(exerciseModeHandler, 'a troca entre conjugação e frases deve ter um handler dedicado');
assert.doesNotMatch(
  exerciseModeHandler[0],
  /window\.scrollTo\s*\(\s*\{\s*top\s*:\s*0\b/,
  'trocar de modalidade deve preservar o ponto de rolagem da página'
);
const stylesSource = fs.readFileSync(path.join(root, 'css', 'styles.css'), 'utf8');
assert.match(stylesSource, /\.verb-usage-dialog-content\s*\{[^}]*overflow-y:\s*auto/s, 'o conteúdo longo deve rolar dentro da janela');

console.log('verb learning content tests passed (3 verbs, 20 conjugation prompts, 75 randomized phrases)');
