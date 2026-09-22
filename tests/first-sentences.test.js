const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

function loadLessons() {
  const window = {};
  const context = { window, console };
  const source = fs.readFileSync(path.join(root, 'js', 'lessons.js'), 'utf8');
  vm.runInNewContext(source, context, { filename: 'js/lessons.js' });
  return window.KlarLessons;
}

function assertNonEmpty(value, label) {
  assert.equal(typeof value, 'string', `${label} deve ser texto`);
  assert.ok(value.trim(), `${label} não pode ficar vazio`);
}

const lessons = loadLessons();
const appSource = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');

assert.ok(Array.isArray(lessons), 'KlarLessons deve ser uma lista');
assert.equal(lessons.length, 12, 'o curso deve ter a nova aula e as 11 aulas antigas');

const firstLesson = lessons[0];
assert.ok(firstLesson, 'a primeira aula deve existir');
assert.equal(firstLesson.id, 'first-sentences');
assert.equal(firstLesson.number, 1);
assert.equal(firstLesson.level, 'A1');
assert.equal(firstLesson.practiceMode, 'sequential-translate');
assert.ok(Array.isArray(firstLesson.exercises), 'first-sentences.exercises deve ser uma lista');
assert.equal(firstLesson.exercises.length, 50, 'first-sentences deve ter exatamente 50 exercícios');

const exerciseIds = new Set();
firstLesson.exercises.forEach((exercise, index) => {
  const label = `first-sentences.exercises[${index}]`;
  assert.equal(exercise.type, 'translate', `${label}.type deve ser translate`);
  assertNonEmpty(exercise.id, `${label}.id`);
  assert.ok(!exerciseIds.has(exercise.id), `ID de exercício duplicado: ${exercise.id}`);
  exerciseIds.add(exercise.id);

  for (const field of ['prompt', 'prompt_en', 'answer', 'explanation', 'explanation_en']) {
    assertNonEmpty(exercise[field], `${label}.${field}`);
  }
  assert.ok(Array.isArray(exercise.answers) && exercise.answers.length > 0, `${label}.answers deve ter ao menos uma resposta`);
  exercise.answers.forEach((answer, answerIndex) => {
    assertNonEmpty(answer, `${label}.answers[${answerIndex}]`);
  });
});
assert.equal(exerciseIds.size, 50, 'os 50 exercícios devem ter IDs únicos');

const expectedOldLessonIds = [
  'pronunciation',
  'pronouns',
  'sein-haben',
  'sentence-structure',
  'questions',
  'present-verbs',
  'articles',
  'negation',
  'accusative',
  'modals-real-life',
  'connectors-prepositions'
];
const oldLessons = lessons.slice(1);
assert.deepEqual(Array.from(oldLessons, (lesson) => lesson.id), expectedOldLessonIds, 'as aulas antigas devem continuar presentes e na mesma ordem');
assert.deepEqual(Array.from(oldLessons, (lesson) => lesson.number), [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

assert.match(appSource, /sequential-translate/, 'app.js deve reconhecer a prática sequential-translate');
assert.match(appSource, /practiceMode/, 'app.js deve consultar o modo de prática da aula');
assert.match(appSource, /hydrateSequentialSession/, 'app.js deve retomar o progresso sequencial salvo');
assert.match(appSource, /session\.isRetry/, 'app.js deve preservar um reinício explícito da prática');
assert.match(appSource, /lessonScores\[lesson\.id\]/, 'app.js deve reconstruir a sessão a partir do progresso da aula');
for (const attribute of [
  'data-sequential-practice',
  'data-sequential-input',
  'data-sequential-check',
  'data-sequential-next',
  'data-sequential-retry',
  'data-sequential-index'
]) {
  assert.match(appSource, new RegExp(attribute), `app.js deve conter ${attribute}`);
}

assert.match(appSource, /closest\('\[data-sequential-check\]'\)/, 'app.js deve tratar a ação de conferir a frase sequencial');
assert.match(appSource, /closest\('\[data-sequential-next\]'\)/, 'app.js deve tratar a ação de avançar na prática sequencial');
assert.match(appSource, /closest\('\[data-sequential-retry\]'\)/, 'app.js deve tratar a tentativa novamente da prática sequencial');
assert.match(appSource, /matches\('\[data-sequential-input\]'\)/, 'app.js deve tratar a entrada da frase sequencial');

console.log('first sentences contract tests passed');
