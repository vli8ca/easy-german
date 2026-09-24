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

console.log('verb learning content tests passed (3 verbs, 20 questions)');
