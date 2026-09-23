const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const context = { window: {}, console };

vm.runInNewContext(
  fs.readFileSync(path.join(root, 'js', 'verb-exercises.js'), 'utf8'),
  context,
  { filename: 'js/verb-exercises.js' }
);

const page = context.window.KlarVerbPractice.pages['w-fragen'];
assert.ok(page, 'a página de W-Fragen deve existir');
assert.equal(page.id, 'w-fragen');
assert.deepEqual(Object.keys(page.modes), ['questions']);

const mode = page.modes.questions;
assert.equal(mode.interaction, 'streak');
assert.equal(mode.shuffle, false);
assert.equal(mode.items.length, 10, 'W-Fragen deve ter exatamente 10 itens');

const expected = [
  ['Was', 'o quê?'],
  ['Wer', 'quem?'],
  ['Wo', 'onde?'],
  ['Woher', 'de onde?'],
  ['Wohin', 'para onde?'],
  ['Wann', 'quando?'],
  ['Warum', 'por quê?'],
  ['Wie', 'como?'],
  ['Wie viel', 'quanto?'],
  ['Wie lange', 'quanto tempo?']
];

assert.equal(
  JSON.stringify(mode.items.map((item) => [item.answers[0], item.prompt])),
  JSON.stringify(expected),
  'as W-Fragen devem seguir a ordem e os significados da referência'
);

const ids = new Set();
mode.items.forEach((item, index) => {
  const label = `w-fragen.questions.items[${index}]`;
  assert.ok(item.id && !ids.has(item.id), `${label}.id deve ser único`);
  ids.add(item.id);
  for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en', 'placeholder', 'placeholder_en']) {
    assert.equal(typeof item[field], 'string', `${label}.${field} deve ser texto`);
    assert.ok(item[field].trim(), `${label}.${field} não pode ficar vazio`);
  }
  assert.ok(Array.isArray(item.answers) && item.answers.length > 0, `${label}.answers deve existir`);
});

const appSource = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');
assert.match(appSource, /exercises-w-fragen/);
assert.match(appSource, /'w-fragen': 'questions'/);

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.match(html, /data-route="exercises-w-fragen"/);
assert.match(html, /data-i18n="sidebar\.wFragen"/);

console.log('w-fragen contract tests passed');
