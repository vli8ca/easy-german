const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), 'utf8');

function createStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); }
  };
}

function loadI18n() {
  const storage = createStorage();
  const context = {
    window: {},
    document: { documentElement: { lang: 'pt-BR' } },
    localStorage: storage,
    console
  };
  context.window.localStorage = storage;
  context.window.document = context.document;
  vm.runInNewContext(source, context, { filename: 'js/i18n.js' });
  return { i18n: context.window.KlarI18n, document: context.document, storage };
}

const { i18n, document, storage } = loadI18n();

assert.equal(i18n.getLanguage(), 'pt');
assert.equal(i18n.t('nav.overview'), 'Visão geral');
assert.equal(
  i18n.t('exercise.correctKeyboardVariant', { answer: 'fünf', explanation: 'Cinco.' }),
  'Correto! Grafia padrão: fünf. Cinco.'
);
assert.equal(
  i18n.t('exercise.umlautChangesMeaning', { answer: 'schön' }),
  'Aqui, o trema muda o significado. Forma correta: schön.'
);

let changes = 0;
i18n.subscribe(() => { changes += 1; });
i18n.setLanguage('en');
assert.equal(i18n.getLanguage(), 'en');
assert.equal(i18n.t('nav.overview'), 'Overview');
assert.equal(
  i18n.t('exercise.correctKeyboardVariant', { answer: 'fünf', explanation: 'Five.' }),
  'Correct! Standard spelling: fünf. Five.'
);
assert.equal(
  i18n.t('exercise.umlautChangesMeaning', { answer: 'schön' }),
  'Here, the umlaut changes the meaning. Correct form: schön.'
);
assert.equal(document.documentElement.lang, 'en');
assert.equal(storage.getItem(i18n.STORAGE_KEY), 'en');
assert.equal(changes, 1);

assert.equal(i18n.localize({ title: 'Aula', en: { title: 'Lesson' } }, 'title'), 'Lesson');
assert.equal(i18n.localize({ title: 'Aula', titleEn: 'Lesson' }, 'title'), 'Lesson');
assert.equal(i18n.localize({ pt: 'bom dia', en: 'good morning' }, 'pt'), 'good morning');
assert.equal(i18n.localize({ title: 'Aula' }, 'title'), 'Aula');

i18n.setLanguage('de');
assert.equal(i18n.getLanguage(), 'en');
assert.equal(i18n.t('missing.key'), 'missing.key');

console.log('i18n tests passed');
