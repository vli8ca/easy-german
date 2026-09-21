const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadWindow(relativePath) {
  const window = {};
  const context = { window, console };
  const source = fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8');
  vm.runInNewContext(source, context, { filename: relativePath });
  return window;
}

function requireEnglish(object, field, label) {
  if (object[field] !== undefined) {
    assert.notEqual(object[field + '_en'], undefined, `${label}.${field} is missing English content`);
  }
}

const lessons = loadWindow('js/lessons.js').KlarLessons;
assert.equal(lessons.length, 11);

const connectorLesson = lessons.find((lesson) => lesson.id === 'connectors-prepositions');
assert.ok(connectorLesson, 'the connectors and prepositions lesson must exist');
assert.equal(connectorLesson.number, 11);
assert.ok(connectorLesson.exercises.length >= 20, 'the lesson needs enough practice');
assert.ok(connectorLesson.sections.some((section) => section.title === 'Conectores: uma ideia leva à outra'));
assert.ok(connectorLesson.sections.some((section) => section.title === 'Preposições: lugar, direção, tempo e relações'));
assert.equal(connectorLesson.exercises.filter((exercise) => exercise.id.startsWith('cp')).length, connectorLesson.exercises.length);
assert.equal(new Set(connectorLesson.exercises.map((exercise) => exercise.id)).size, connectorLesson.exercises.length);
assert.deepEqual(Array.from(connectorLesson.exercises.slice(0, 10), (exercise) => exercise.id), ['cp1', 'cp2', 'cp3', 'cp4', 'cp5', 'cp6', 'cp7', 'cp8', 'cp9', 'cp10']);
assert.deepEqual(Array.from(connectorLesson.exercises.slice(10), (exercise) => exercise.id), ['cp11', 'cp12', 'cp13', 'cp14', 'cp15', 'cp16', 'cp17', 'cp18', 'cp19', 'cp20', 'cp21', 'cp22', 'cp23', 'cp24']);

lessons.forEach((lesson) => {
  ['title', 'description', 'focus', 'introduction', 'objectives', 'summary'].forEach((field) => requireEnglish(lesson, field, `lesson:${lesson.id}`));
  lesson.sections.forEach((section, sectionIndex) => {
    const label = `lesson:${lesson.id}.section:${sectionIndex}`;
    ['title', 'lede', 'text', 'caption', 'headers', 'rows', 'segments'].forEach((field) => requireEnglish(section, field, label));
    if (section.items) {
      section.items.forEach((item, itemIndex) => {
        const itemLabel = `${label}.item:${itemIndex}`;
        ['title', 'pronunciation', 'translation', 'description', 'examples', 'note'].forEach((field) => requireEnglish(item, field, itemLabel));
        if (item.pt !== undefined) assert.notEqual(item.en, undefined, `${itemLabel}.pt is missing English content`);
      });
    }
    if (section.scenarios) {
      section.scenarios.forEach((scenario, scenarioIndex) => {
        requireEnglish(scenario, 'title', `${label}.scenario:${scenarioIndex}`);
        requireEnglish(scenario, 'phrases', `${label}.scenario:${scenarioIndex}`);
      });
    }
    if (section.lines) assert.notEqual(section.lines_en, undefined, `${label}.lines is missing English content`);
  });
  lesson.vocabulary.forEach((item, index) => requireEnglish(item, 'meaning', `lesson:${lesson.id}.vocabulary:${index}`));
  lesson.exercises.forEach((exercise, index) => {
    const label = `lesson:${lesson.id}.exercise:${index}`;
    ['prompt', 'options', 'explanation'].forEach((field) => requireEnglish(exercise, field, label));
  });
});

const verbPractice = loadWindow('js/verb-exercises.js').KlarVerbPractice;
Object.values(verbPractice.pages).forEach((page) => {
  const pageLabel = `verb:${page.id}`;
  ['title', 'subtitle', 'meaning', 'heroTitle', 'heroAccent', 'heroCopy', 'perfectMessage'].forEach((field) => requireEnglish(page, field, pageLabel));
  Object.values(page.modes).forEach((mode) => {
    const modeLabel = `${pageLabel}.mode:${mode.id}`;
    ['label', 'shortLabel', 'title', 'instruction'].forEach((field) => requireEnglish(mode, field, modeLabel));
    mode.items.forEach((item, index) => {
      const itemLabel = `${modeLabel}.item:${index}`;
      const itemIsChoice = mode.interaction === 'multiple-choice' || item.interaction === 'multiple-choice';
      const fields = itemIsChoice
        ? ['prompt', 'detail', 'options']
        : ['prompt', 'detail', 'placeholder'];
      fields.forEach((field) => requireEnglish(item, field, itemLabel));
      if (mode.interaction === 'mixed') requireEnglish(item, 'questionType', itemLabel);
      if (itemIsChoice) {
        assert.ok(Array.isArray(item.options) && item.options.length === 4, `${itemLabel}.options must have four alternatives`);
        assert.ok(Array.isArray(item.options_en) && item.options_en.length === 4, `${itemLabel}.options_en must have four alternatives`);
        assert.ok(Array.isArray(item.optionIds) && item.optionIds.length === 4, `${itemLabel}.optionIds must have four IDs`);
        assert.notEqual(item.correctOptionId, undefined, `${itemLabel}.correctOptionId is missing`);
      }
    });
  });
});

const i18nSource = fs.readFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), 'utf8');
const exercisesSource = fs.readFileSync(path.join(__dirname, '..', 'js', 'exercises.js'), 'utf8');
const exerciseWindow = {
  KlarIcons: { render: () => '' },
  KlarI18n: null
};
const exerciseContext = {
  window: exerciseWindow,
  document: { documentElement: { lang: 'pt-BR' } },
  localStorage: { getItem: () => null, setItem: () => {} },
  console
};
exerciseContext.window.localStorage = exerciseContext.localStorage;
exerciseContext.window.document = exerciseContext.document;
vm.runInNewContext(i18nSource, exerciseContext, { filename: 'js/i18n.js' });
vm.runInNewContext(exercisesSource, exerciseContext, { filename: 'js/exercises.js' });

const trueFalseExercise = {
  id: 'localization-true-false',
  type: 'truefalse',
  prompt: 'O verbo está correto?',
  prompt_en: 'Is the verb correct?',
  options: ['Verdadeiro', 'Falso'],
  options_en: ['True', 'False'],
  answer: 'Verdadeiro',
  explanation: 'A forma está correta.',
  explanation_en: 'The form is correct.'
};
exerciseContext.window.KlarI18n.setLanguage('en');
const englishExerciseHTML = exerciseContext.window.KlarExercises.renderExercise(trueFalseExercise, 0, 'lesson-1');
assert.match(englishExerciseHTML, />True</);
assert.match(englishExerciseHTML, />False</);
assert.match(englishExerciseHTML, /data-option="Verdadeiro"/);
assert.match(englishExerciseHTML, /data-option="Falso"/);
assert.equal(exerciseContext.window.KlarExercises.isCorrect('Verdadeiro', trueFalseExercise), true);
assert.equal(exerciseContext.window.KlarExercises.isCorrect('True', trueFalseExercise), false);

exerciseContext.window.KlarI18n.setLanguage('pt');
const portugueseExerciseHTML = exerciseContext.window.KlarExercises.renderExercise(trueFalseExercise, 0, 'lesson-1');
assert.match(portugueseExerciseHTML, /O verbo está correto\?/);
assert.match(portugueseExerciseHTML, />Verdadeiro</);
assert.match(portugueseExerciseHTML, />Falso</);
assert.doesNotMatch(portugueseExerciseHTML, /Which|True|False/);

console.log('content localization tests passed');
