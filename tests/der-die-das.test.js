const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const context = vm.createContext({
  console,
  window: {
    KlarIcons: { render() { return ''; } },
    KlarI18n: { getLanguage() { return 'pt'; }, t(key) { return key; } }
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

const lesson = context.window.KlarLessons.find((item) => item.id === 'der-die-das');
assert.ok(lesson, 'the der/die/das lesson must be available in the app catalog');
assert.equal(lesson.number, 12, 'the der/die/das lesson must follow the existing 11 lessons');

for (const field of ['title', 'description', 'focus', 'introduction', 'objectives', 'summary']) {
  assert.ok(lesson[field], `the lesson needs Portuguese ${field}`);
  assert.ok(lesson[`${field}_en`], `the lesson needs English ${field}`);
}
assert.ok(Array.isArray(lesson.objectives) && lesson.objectives.length >= 2, 'the lesson needs clear learning objectives');
assert.ok(Array.isArray(lesson.objectives_en) && lesson.objectives_en.length === lesson.objectives.length, 'each objective needs its English counterpart');

assert.ok(Array.isArray(lesson.sections) && lesson.sections.length > 0, 'the lesson needs instructional content sections');
const contentSection = lesson.sections.find((section) => section.title && (section.text || section.lede || section.items));
assert.ok(contentSection, 'the lesson needs a section with actual instructional content');
assert.ok(contentSection.title_en, 'the instructional section needs an English title');
for (const field of ['text', 'lede']) {
  if (contentSection[field]) assert.ok(contentSection[`${field}_en`], `the instructional section needs English ${field}`);
}
if (contentSection.items) {
  assert.ok(contentSection.items.length > 0, 'instructional section items must not be empty');
  assert.ok(contentSection.items.some((item) => item.en || item.title_en || item.description_en), 'instructional items need English content');
}

assert.ok(Array.isArray(lesson.vocabulary) && lesson.vocabulary.length >= 3, 'the lesson needs vocabulary examples');
for (const article of ['der', 'die', 'das']) {
  assert.ok(lesson.vocabulary.some((item) => new RegExp(`^${article}\\s`, 'i').test(item.word)), `vocabulary must include a noun with ${article}`);
}
lesson.vocabulary.forEach((item, index) => {
  assert.ok(item.word && item.meaning, `vocabulary item ${index + 1} needs a German word and Portuguese meaning`);
  assert.ok(item.meaning_en, `vocabulary item ${index + 1} needs an English meaning`);
});

assert.ok(Array.isArray(lesson.exercises) && lesson.exercises.length >= 6, 'the lesson needs enough practice to reinforce the three articles');
const exerciseIds = lesson.exercises.map((exercise) => exercise.id);
assert.equal(new Set(exerciseIds).size, exerciseIds.length, 'exercise IDs must be unique');
const supportedTypes = new Set(['multiple', 'fill', 'order', 'translate', 'truefalse']);
lesson.exercises.forEach((exercise, index) => {
  const label = `exercise ${index + 1}`;
  assert.match(exercise.id, /^ddd\d+$/, `${label} needs a stable der/die/das exercise ID`);
  assert.ok(supportedTypes.has(exercise.type), `${label} has an unsupported exercise type`);
  assert.ok(exercise.prompt && exercise.explanation, `${label} needs a prompt and explanation`);

  if (exercise.type === 'order') {
    assert.ok(Array.isArray(exercise.answer) && exercise.answer.length > 0, `${label} needs an ordered answer`);
    assert.equal(context.window.KlarExercises.isCorrect(exercise.answer, exercise), true, `${label}'s ordered answer must be accepted`);
  } else {
    assert.ok(typeof exercise.answer === 'string' && exercise.answer.trim(), `${label} needs a non-empty answer`);
    if (exercise.answers) {
      assert.ok(Array.isArray(exercise.answers) && exercise.answers.includes(exercise.answer), `${label}'s accepted answers must include its primary answer`);
    }
    if (exercise.type === 'multiple' || exercise.type === 'truefalse') {
      assert.ok(Array.isArray(exercise.options) && exercise.options.length >= 2, `${label} needs answer options`);
      assert.ok(exercise.options.includes(exercise.answer), `${label}'s correct answer must be one of its options`);
    }
    assert.equal(context.window.KlarExercises.isCorrect(exercise.answer, exercise), true, `${label}'s answer must pass the app checker`);
  }
});

const existingArticlesLesson = context.window.KlarLessons.find((item) => item.id === 'articles');
assert.ok(existingArticlesLesson, 'the existing articles lesson must remain available');
assert.ok(existingArticlesLesson.exercises.length > 0, 'the existing articles lesson needs exercises');
const articleExerciseIds = existingArticlesLesson.exercises.map((exercise) => exercise.id);
articleExerciseIds.forEach((id, index) => {
  assert.ok(typeof id === 'string' && id.trim(), `articles exercise ${index + 1} needs a non-empty ID`);
});
assert.equal(new Set(articleExerciseIds).size, articleExerciseIds.length, 'articles exercise IDs must be unique for progress tracking');

console.log('der/die/das lesson tests passed');
