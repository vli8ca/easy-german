const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const verbContext = { window: {}, console };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'verb-exercises.js'), 'utf8'), verbContext, { filename: 'js/verb-exercises.js' });

const appSource = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
const vocabularyStart = appSource.indexOf('const vocabulary = {');
const vocabularyEnd = appSource.indexOf('const vocabularyRoutes', vocabularyStart);
const vocabularyContext = { window: { KlarVerbPractice: verbContext.window.KlarVerbPractice }, console };
const vocabularySource = 'const verbPractice = window.KlarVerbPractice;' + appSource.slice(vocabularyStart, vocabularyEnd) + '; window.KlarVocabulary = vocabulary;';
vm.runInNewContext('(function () {' + vocabularySource + '})();', vocabularyContext, { filename: 'js/app-vocabulary.js' });

const vocabulary = vocabularyContext.window.KlarVocabulary;
const phrases = vocabulary.phrases;
const words = vocabulary.words;

assert.equal(phrases.filter((item) => item.group === 'sein').length, 50);
assert.equal(phrases.filter((item) => item.group === 'haben').length, 50);
assert.equal(phrases.filter((item) => !item.group).length, 28);
assert.equal(new Set(phrases.map((item) => item.de.toLocaleLowerCase('de-DE'))).size, phrases.length);
assert.ok(phrases.some((item) => item.de === 'Ich bin glücklich'));
assert.ok(phrases.some((item) => item.de === 'Er hat um sieben Uhr Frühstück'));

assert.ok(words.some((item) => item.word === 'glücklich' && item.group === 'sein'));
assert.ok(words.some((item) => item.word === 'Frühstück' && item.group === 'haben'));
assert.ok(words.some((item) => item.word === 'wir' || item.word === 'Wir'));
assert.ok(words.every((item) => item.meaning && item.meaning_en));
assert.equal(new Set(words.map((item) => item.word.toLocaleLowerCase('de-DE'))).size, words.length);

console.log(`vocabulary integration tests passed (${words.length} words, ${phrases.length} phrases)`);
