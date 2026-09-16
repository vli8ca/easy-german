const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const i18nContext = { window: {}, document: { documentElement: {} }, console };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8'), i18nContext, { filename: 'js/i18n.js' });
const catalogs = i18nContext.window.KlarI18n.messages;

const scriptSources = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
assert.ok(scriptSources.findIndex((source) => source.startsWith('js/i18n.js')) < scriptSources.findIndex((source) => source.startsWith('js/app.js')));
assert.match(html, /data-language="pt"/);
assert.match(html, /data-language="en"/);
assert.match(html, /data-i18n="language\.label"/);
assert.match(html, /data-i18n-aria-label="language\.select"/);
assert.match(fs.readFileSync(path.join(root, 'css', 'styles.css'), 'utf8'), /\.order-answer:empty::before\s*\{\s*content:\s*attr\(data-placeholder\)/);

const staticKeys = new Set();
for (const match of html.matchAll(/data-i18n(?:-[\w-]+)?="([^"]+)"/g)) staticKeys.add(match[1]);
for (const key of staticKeys) {
  assert.notEqual(catalogs.pt[key], undefined, `Portuguese catalog is missing ${key}`);
  assert.notEqual(catalogs.en[key], undefined, `English catalog is missing ${key}`);
}

console.log(`site integration checks passed (${staticKeys.size} static keys)`);
