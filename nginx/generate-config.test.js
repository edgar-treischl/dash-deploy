const assert = require('node:assert/strict');
const test = require('node:test');
const { generateConfig } = require('./generate-config');

test('rejects invalid and ambiguous registry entries before rendering', () => {
  const mfe = { name: 'dashboard', path: '/mfe-dashboard' };
  const invalidRegistries = [
    null,
    { mfes: [null] },
    { mfes: [{ ...mfe, name: 'shell' }] },
    { mfes: [{ ...mfe, path: '/bad;path' }] },
    { mfes: [{ ...mfe, requiresLogin: 'false' }] },
    { mfes: [mfe, { ...mfe, path: '/other' }] },
    { mfes: [mfe, { name: 'other', path: mfe.path }] },
    { mfes: [{ ...mfe, remoteEntry: '/mfe-dashboard/remoteEntry.js' }] },
    { mfes: [{ ...mfe, remoteEntry: '/remote/../remoteEntry.js' }] },
    { mfes: [
      { ...mfe, remoteEntry: '/remote/assets/remoteEntry.js' },
      { name: 'other', path: '/other', remoteEntry: '/remote/remoteEntry.js' },
    ] },
  ];
  for (const registry of invalidRegistries) {
    assert.throws(() => generateConfig(registry, '__MFE_LOCATIONS__'));
  }
});

test('rejects missing or repeated template placeholders', () => {
  for (const template of ['server {}', '__MFE_LOCATIONS__ __MFE_LOCATIONS__']) {
    assert.throws(() => generateConfig({ mfes: [] }, template), /placeholder/);
  }
});
