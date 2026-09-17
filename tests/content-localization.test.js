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
assert.equal(lessons.length, 10);

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
      ['prompt', 'detail', 'placeholder'].forEach((field) => requireEnglish(item, field, itemLabel));
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
