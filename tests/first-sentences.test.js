const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

function loadModules() {
  const window = {};
  const context = { window, console };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js', 'lessons.js'), 'utf8'), context, { filename: 'js/lessons.js' });
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js', 'verb-exercises.js'), 'utf8'), context, { filename: 'js/verb-exercises.js' });
  return window;
}

function assertNonEmpty(value, label) {
  assert.equal(typeof value, 'string', `${label} deve ser texto`);
  assert.ok(value.trim(), `${label} não pode ficar vazio`);
}

const modules = loadModules();
const lessons = modules.KlarLessons;
const verbPractice = modules.KlarVerbPractice;
const appSource = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');

assert.ok(Array.isArray(lessons), 'KlarLessons deve ser uma lista');
assert.equal(lessons.length, 11, 'o curso deve ter somente as 11 aulas do caminho');
assert.equal(lessons.find((lesson) => lesson.id === 'first-sentences'), undefined, 'first-sentences não pode aparecer como aula');

assert.ok(verbPractice && verbPractice.pages, 'as páginas de exercícios devem existir');
assert.deepEqual(Object.keys(verbPractice.pages), ['first-sentences', 'sein', 'haben', 'numbers'], 'first-sentences deve ser o primeiro exercício');
const firstExercisePage = verbPractice.pages['first-sentences'];
assert.equal(firstExercisePage.id, 'first-sentences');
for (const field of ['heroIntro', 'heroIntro_en', 'metaPrimary', 'metaPrimary_en', 'metaThird', 'metaThird_en', 'ruleCopy', 'ruleCopy_en']) {
  assertNonEmpty(firstExercisePage[field], `first-sentences.${field}`);
}
assert.equal(Object.keys(firstExercisePage.modes).length, 1, 'first-sentences deve ter somente um módulo');
const firstMode = firstExercisePage.modes.sentences;
assert.ok(firstMode, 'first-sentences deve ter um módulo de frases');
assert.equal(firstMode.interaction, 'streak');
assert.equal(firstMode.shuffle, false);
assert.ok(Array.isArray(firstMode.items), 'first-sentences.items deve ser uma lista');
assert.equal(firstMode.items.length, 50, 'first-sentences deve ter exatamente 50 exercícios');

const exerciseIds = new Set();
firstMode.items.forEach((exercise, index) => {
  const label = `first-sentences.items[${index}]`;
  assertNonEmpty(exercise.id, `${label}.id`);
  assert.ok(!exerciseIds.has(exercise.id), `ID de exercício duplicado: ${exercise.id}`);
  exerciseIds.add(exercise.id);

  for (const field of ['prompt', 'prompt_en', 'detail', 'detail_en', 'placeholder', 'placeholder_en']) {
    assertNonEmpty(exercise[field], `${label}.${field}`);
  }
  assert.ok(Array.isArray(exercise.answers) && exercise.answers.length > 0, `${label}.answers deve ter ao menos uma resposta`);
  exercise.answers.forEach((answer, answerIndex) => {
    assertNonEmpty(answer, `${label}.answers[${answerIndex}]`);
  });
});
assert.equal(exerciseIds.size, 50, 'os 50 exercícios devem ter IDs únicos');

const expectedLessonIds = [
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
assert.deepEqual(Array.from(lessons, (lesson) => lesson.id), expectedLessonIds, 'as aulas devem continuar presentes e na mesma ordem');
assert.deepEqual(Array.from(lessons, (lesson) => lesson.number), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

assert.match(appSource, /exercises-first-sentences/, 'app.js deve reconhecer a rota do exercício de frases iniciais');
assert.match(appSource, /isStreakMode\(mode\)/, 'app.js deve usar o fluxo unitário de exercícios');
assert.match(appSource, /data-check-verb/, 'app.js deve conferir a resposta do exercício');
assert.match(appSource, /data-next-verb/, 'app.js deve avançar após o acerto');
assert.match(appSource, /data-retry-verb/, 'app.js deve permitir tentar novamente após o erro');

console.log('first sentences contract tests passed');
