const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const window = {};
const context = { window, console };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js', 'lessons.js'), 'utf8'), context, { filename: 'js/lessons.js' });
vm.runInNewContext(fs.readFileSync(path.join(root, 'js', 'verb-exercises.js'), 'utf8'), context, { filename: 'js/verb-exercises.js' });

const pages = window.KlarVerbPractice.pages;
const page = pages['first-sentences-3'];
const appSource = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');
const navSource = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const i18nSource = fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8');

assert.ok(page, 'a seção Frases iniciais 3 deve existir');
assert.deepEqual(Object.keys(pages), ['first-sentences', 'first-sentences-2', 'first-sentences-3', 'sein', 'haben', 'numbers', 'w-fragen']);
assert.equal(page.title, 'Frases iniciais 3');
assert.equal(page.title_en, 'First sentences 3');
assert.equal(page.metaThird, '80 frases');
assert.match(page.perfectMessage, /80/);
assert.match(page.completedCopy, /80/);
assert.equal(page.modes.sentences.interaction, 'streak');
assert.equal(page.modes.sentences.shuffle, false);
assert.equal(page.modes.random.interaction, 'streak');
assert.equal(page.modes.random.shuffle, true);
assert.strictEqual(page.modes.sentences.items, page.modes.random.items, 'os dois modos devem reutilizar as mesmas 80 frases');

const items = page.modes.sentences.items;
assert.equal(items.length, 80, 'a seção deve conter exatamente 80 frases');
assert.equal(new Set(items.map((item) => item.id)).size, 80, 'as 80 frases devem ter IDs únicos');
items.forEach((item, index) => {
  const label = `first-sentences-3.items[${index}]`;
  assert.equal(item.id, `first-sentences-3-${String(index + 1).padStart(2, '0')}`);
  for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en', 'placeholder', 'placeholder_en']) {
    assert.equal(typeof item[field], 'string', `${label}.${field} deve ser texto`);
    assert.ok(item[field].trim(), `${label}.${field} não pode ficar vazio`);
  }
  assert.ok(Array.isArray(item.answers) && item.answers.length > 0, `${label}.answers deve ter resposta`);
});

const answers = items.map((item) => item.answers.join(' ')).join('\n');
const newVocabulary = [
  ['ich', /(?:^|[^\p{L}])ich(?=$|[^\p{L}])/iu],
  ['du', /(?:^|[^\p{L}])du(?=$|[^\p{L}])/iu],
  ['er', /(?:^|[^\p{L}])er(?=$|[^\p{L}])/iu],
  ['sie', /(?:^|[^\p{L}])sie(?=$|[^\p{L}])/iu],
  ['wir', /(?:^|[^\p{L}])wir(?=$|[^\p{L}])/iu],
  ['dein', /(?:^|[^\p{L}])dein(?:e|en|em|er|es)?(?=$|[^\p{L}])/iu],
  ['bist', /(?:^|[^\p{L}])bist(?=$|[^\p{L}])/iu],
  ['sind', /(?:^|[^\p{L}])sind(?=$|[^\p{L}])/iu],
  ['machen', /(?:^|[^\p{L}])mach(?:e|st|t|en)?(?=$|[^\p{L}])/iu],
  ['gehen', /(?:^|[^\p{L}])geh(?:e|st|t|en)?(?=$|[^\p{L}])/iu],
  ['brauchen', /(?:^|[^\p{L}])brauch(?:e|st|t|en)?(?=$|[^\p{L}])/iu],
  ['trinken', /(?:^|[^\p{L}])trink(?:e|st|t|en)?(?=$|[^\p{L}])/iu],
  ['spielen', /(?:^|[^\p{L}])spiel(?:e|st|t|en)?(?=$|[^\p{L}])/iu],
  ['schwimmen', /(?:^|[^\p{L}])schwimm(?:e|st|t|en)?(?=$|[^\p{L}])/iu],
  ['joggen', /(?:^|[^\p{L}])jogg(?:e|st|t|en)?(?=$|[^\p{L}])/iu],
  ['wandern', /(?:^|[^\p{L}])wander(?:e|st|t|n)?(?=$|[^\p{L}])/iu],
  ['Verkäufer', /(?:^|[^\p{L}])verkäufer(?=$|[^\p{L}])/iu],
  ['Verkäuferin', /(?:^|[^\p{L}])verkäuferin(?=$|[^\p{L}])/iu],
  ['Frau', /(?:^|[^\p{L}])frau(?=$|[^\p{L}])/iu],
  ['Bäckerin', /(?:^|[^\p{L}])bäckerin(?=$|[^\p{L}])/iu],
  ['Lehrerin', /(?:^|[^\p{L}])lehrerin(?=$|[^\p{L}])/iu],
  ['Musiker', /(?:^|[^\p{L}])musiker(?=$|[^\p{L}])/iu],
  ['Handy', /(?:^|[^\p{L}])handy(?=$|[^\p{L}])/iu],
  ['Taxi', /(?:^|[^\p{L}])taxi(?=$|[^\p{L}])/iu],
  ['Cola', /(?:^|[^\p{L}])cola(?=$|[^\p{L}])/iu],
  ['Toilette', /(?:^|[^\p{L}])toilette(?=$|[^\p{L}])/iu],
  ['Musik', /(?:^|[^\p{L}])musik(?=$|[^\p{L}])/iu],
  ['Party', /(?:^|[^\p{L}])party(?=$|[^\p{L}])/iu],
  ['Sport', /(?:^|[^\p{L}])sport(?=$|[^\p{L}])/iu],
  ['Yoga', /(?:^|[^\p{L}])yoga(?=$|[^\p{L}])/iu],
  ['Tennis', /(?:^|[^\p{L}])tennis(?=$|[^\p{L}])/iu],
  ['Fußball', /(?:^|[^\p{L}])fußball(?=$|[^\p{L}])/iu],
  ['ja', /(?:^|[^\p{L}])ja(?=$|[^\p{L}])/iu],
  ['nein', /(?:^|[^\p{L}])nein(?=$|[^\p{L}])/iu],
  ['oft', /(?:^|[^\p{L}])oft(?=$|[^\p{L}])/iu],
  ['nie', /(?:^|[^\p{L}])nie(?=$|[^\p{L}])/iu],
  ['sportlich', /(?:^|[^\p{L}])sportlich(?=$|[^\p{L}])/iu],
  ['draußen', /(?:^|[^\p{L}])draußen(?=$|[^\p{L}])/iu],
  ['sehr', /(?:^|[^\p{L}])sehr(?=$|[^\p{L}])/iu],
  ['cool', /(?:^|[^\p{L}])cool(?=$|[^\p{L}])/iu],
  ['mehr', /(?:^|[^\p{L}])mehr(?=$|[^\p{L}])/iu],
  ['durstig', /(?:^|[^\p{L}])durstig(?=$|[^\p{L}])/iu],
  ['laut', /(?:^|[^\p{L}])laut(?=$|[^\p{L}])/iu],
  ['müde', /(?:^|[^\p{L}])müde(?=$|[^\p{L}])/iu],
  ['nach Hause', /(?:^|[^\p{L}])nach Hause(?=$|[^\p{L}])/iu],
  ['zu', /(?:^|[^\p{L}])zu(?=$|[^\p{L}])/iu]
];
for (const [word, pattern] of newVocabulary) assert.match(answers, pattern, `o vocabulário novo precisa incluir ${word}`);

const previousVocabulary = /(?:^|[^\p{L}])(?:Bäcker|Lehrer|Mann|Bibliothek|U-Bahn|Bäckerei|Bahnhof|Park|Hotel|Café|Restaurant|Stadt|Alex|Anna|Mia|Max|Lisa|Berlin|Brot|Käse|Salat|Pizza|Wurst|Schnitzel|Kaffee|Wasser|Kekse|Milch|Zucker|Bruder|Schwester|Sohn|Tochter|Papa|Mama|schön|nett|lustig|billig|hier|links|rechts|groß|klein|hungrig|satt|Wo ist)(?=$|[^\p{L}])/iu;
items.forEach((item) => {
  const german = item.answers.join(' ');
  assert.match(german, previousVocabulary, `${item.id} precisa reutilizar vocabulário de Frases iniciais 2`);
  assert.match(german, /(?:^|[^\p{L}])(?:ich|du|er|sie|wir|dein|bist|sind|mach(?:e|st|t|en)?|geh(?:e|st|t|en)?|brauch(?:e|st|t|en)?|trink(?:e|st|t|en)?|spiel(?:e|st|t|en)?|schwimm(?:e|st|t|en)?|jogg(?:e|st|t|en)?|wander(?:e|st|t|n)?|verkäufer(?:in)?|frau|bäckerin|lehrerin|musiker|handy|taxi|cola|toilette|musik|party|sport|yoga|tennis|fußball|ja|nein|oft|nie|sportlich|draußen|sehr|cool|mehr|durstig|laut|müde|nach Hause|zu)(?=$|[^\p{L}])/iu, `${item.id} precisa usar o vocabulário novo`);
});

assert.match(navSource, /data-route="exercises-first-sentences-3"/);
assert.match(navSource, /data-i18n="sidebar\.firstSentences3"/);
assert.match(appSource, /'exercises-first-sentences-3':\s*'first-sentences-3'/);
assert.match(appSource, /'first-sentences-3':\s*'sentences'/);
assert.match(i18nSource, /'sidebar\.firstSentences3':\s*'Frases iniciais 3'/);
assert.match(i18nSource, /'sidebar\.firstSentences3':\s*'First sentences 3'/);

console.log('first sentences 3 content and integration tests passed');
