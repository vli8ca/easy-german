const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

function loadExercises() {
  const context = vm.createContext({
    window: {
      KlarIcons: {},
      KlarI18n: {
        getLanguage() { return 'pt'; },
        t(key) { return key; }
      }
    }
  });

  vm.runInContext(
    fs.readFileSync(path.join(root, 'js', 'exercises.js'), 'utf8'),
    context,
    { filename: 'js/exercises.js' }
  );

  return context.window.KlarExercises;
}

function readApp() {
  return fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');
}

function run(name, scenario) {
  try {
    scenario();
    console.log('✓ ' + name);
    return true;
  } catch (error) {
    console.error('✗ ' + name + '\n  ' + error.message);
    return false;
  }
}

const scenarios = [
  ['decide submit, retry ou next pelo estado da resposta', () => {
    const resolve = loadExercises().resolveEnterAction;
    assert.equal(typeof resolve, 'function', 'exercises.js deve expor resolveEnterAction');

    assert.equal(resolve({ checked: false, correct: false }), 'submit');
    assert.equal(resolve({ checked: false, correct: true }), 'submit');
    assert.equal(resolve({ checked: true, correct: false }), 'retry');
    assert.equal(resolve({ checked: true, correct: true }), 'next');
  }],
  ['conecta Enter aos exercícios em lote e aos fluxos de etapa única', () => {
    const app = readApp();
    assert.match(app, /document\.addEventListener\(['"]keydown['"]/i, 'app.js deve ouvir keydown');
    assert.match(app, /event\.key\s*===?\s*['"]Enter['"]/i, 'app.js deve detectar Enter');
    assert.ok(app.includes('resolveEnterAction'), 'app.js deve usar a decisão compartilhada de Enter');

    for (const marker of [
      '[data-exercise-card]',
      '[data-check-exercise]',
      '[data-sequential-input]',
      '[data-sequential-next]',
      '[data-sequential-retry]',
      '[data-verb-input]',
      '[data-check-verb]',
      '[data-next-verb]',
      '[data-retry-verb]'
    ]) {
      assert.ok(app.includes(marker), 'app.js deve rotear Enter no fluxo ' + marker);
    }
  }]
];

const passed = scenarios.reduce((count, [name, scenario]) => count + (run(name, scenario) ? 1 : 0), 0);
console.log('\nEnter behavior QA: ' + passed + '/' + scenarios.length + ' cenários aprovados.');
if (passed !== scenarios.length) process.exitCode = 1;
