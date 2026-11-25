const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { generateConfig } = require('./generate-config');

test('serves Shell, protected MFE files, and a second public SPA correctly', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'dash-nginx-test-'));
  let container;
  const docker = (...args) => execFileSync('docker', args, { encoding: 'utf8' }).trim();
  try {
    const files = {
      'shell/index.html': 'shell home',
      'shell/assets/app.js': 'shell script',
      'class/index.html': 'class home',
      'class/assets/remoteEntry.js': 'class remote',
      'class/assets/chunk.js': 'class chunk',
      'dashboard/index.html': 'dashboard home',
      'dashboard/assets/app.js': 'dashboard script',
    };
    for (const [filename, contents] of Object.entries(files)) {
      const target = path.join(directory, 'srv', filename);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, contents);
    }
    const template = fs.readFileSync(path.join(__dirname, 'nginx.conf.template'), 'utf8');
    const registry = { mfes: [
      {
        name: 'class', path: '/class', requiresLogin: true,
        remoteEntry: '/klassenwiederholung-mfe/assets/remoteEntry.js',
      },
      {
        name: 'dashboard', path: '/mfe-dashboard',
        remoteEntry: '/dashboard-mfe/assets/remoteEntry.js',
      },
    ] };
    fs.writeFileSync(path.join(directory, 'default.conf'), generateConfig(registry, template));
    container = docker('run', '--rm', '-d', '-p', '127.0.0.1::80',
      '-v', `${directory}/srv:/srv:ro`,
      '-v', `${directory}/default.conf:/etc/nginx/conf.d/default.conf:ro`,
      process.env.NGINX_TEST_IMAGE || 'nginx:alpine');
    docker('exec', container, 'nginx', '-t');
    const address = docker('port', container, '80/tcp');
    const request = (uri) => fetch(`http://${address}${uri}`, { redirect: 'manual' });
    let ready = false;
    for (let attempt = 0; attempt < 30; attempt++) {
      try {
        const response = await request('/');
        if (response.status === 200) {
          ready = true;
          break;
        }
      } catch (error) {
        if (error.cause?.code !== 'ECONNREFUSED') throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert.ok(ready, 'nginx must become responsive');
    for (const [uri, body] of [
      ['/', 'shell home'],
      ['/shell/deep-link', 'shell home'],
      ['/assets/app.js', 'shell script'],
      ['/class/assets/remoteEntry.js', 'class remote'],
      ['/klassenwiederholung-mfe/assets/remoteEntry.js', 'class remote'],
      ['/klassenwiederholung-mfe/assets/chunk.js', 'class chunk'],
      ['/mfe-dashboard/', 'dashboard home'],
      ['/mfe-dashboard/deep/link', 'dashboard home'],
      ['/mfe-dashboard/assets/app.js', 'dashboard script'],
      ['/dashboard-mfe/assets/app.js', 'dashboard script'],
    ]) {
      const response = await request(uri);
      assert.equal(response.status, 200, uri);
      assert.equal(await response.text(), body, uri);
      if (uri.startsWith('/klassenwiederholung-mfe/')) {
        assert.equal(response.headers.get('access-control-allow-origin'), '*');
      }
    }
    for (const uri of [
      '/assets/missing.js', '/class/assets/missing.js', '/mfe-dashboard/assets/missing.js',
      '/klassenwiederholung-mfe/assets/missing.js', '/klassenwiederholung-mfe/deep-link',
    ]) {
      assert.equal((await request(uri)).status, 404, uri);
    }
    for (const [uri, status, location] of [
      ['/class', 301, '/'],
      ['/class/', 302, '/?login_required=class'],
      ['/class/deep-link', 302, '/?login_required=class'],
      ['/mfe-dashboard', 301, '/mfe-dashboard/'],
      ['/klassenwiederholung-mfe', 301, '/klassenwiederholung-mfe/'],
    ]) {
      const response = await request(uri);
      assert.equal(response.status, status, uri);
      assert.equal(response.headers.get('location'), location, uri);
    }
  } finally {
    if (container) docker('rm', '-f', container);
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
