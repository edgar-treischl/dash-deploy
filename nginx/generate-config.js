#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const staticExtensions = 'js|mjs|css|json|png|jpg|svg|woff2?';

function generateConfig(registry, template) {
  if (!registry || !Array.isArray(registry.mfes)) {
    throw new Error('Invalid mfes.json: must contain "mfes" array');
  }
  if (template.split('__MFE_LOCATIONS__').length !== 2) {
    throw new Error('Template must contain exactly one __MFE_LOCATIONS__ placeholder');
  }

  const names = new Set();
  const routes = new Set();
  const identifier = /^[a-z][a-z0-9-]*$/;
  for (const mfe of registry.mfes) {
    if (!mfe || typeof mfe.name !== 'string' || !identifier.test(mfe.name)
        || mfe.name === 'shell') {
      throw new Error('Each MFE needs a lowercase name (letters, digits, hyphens), other than shell');
    }
    if (typeof mfe.path !== 'string' || !/^\/[a-z][a-z0-9-]*$/.test(mfe.path)) {
      throw new Error(`${mfe.name}: path must be a single URL segment, e.g. /class`);
    }
    if (mfe.requiresLogin !== undefined && typeof mfe.requiresLogin !== 'boolean') {
      throw new Error(`${mfe.name}: requiresLogin must be a boolean`);
    }
    if (names.has(mfe.name)) {
      throw new Error(`Duplicate MFE name: ${mfe.name}`);
    }
    names.add(mfe.name);

    const prefixes = [mfe.path];
    if (mfe.remoteEntry !== undefined) {
      if (typeof mfe.remoteEntry !== 'string'
          || !/^\/[a-z][a-z0-9-]*(?:\/[a-zA-Z0-9_-]+)*\/[a-zA-Z0-9_-]+\.(?:js|mjs)$/.test(mfe.remoteEntry)) {
        throw new Error(`${mfe.name}: remoteEntry must be a local /base/.../file.js or .mjs path`);
      }
      // The entire asset base is served, including assets/ next to remoteEntry.js.
      prefixes.push(`/${mfe.remoteEntry.split('/')[1]}`);
    }
    for (const prefix of prefixes) {
      if (routes.has(prefix)) {
        throw new Error(`Duplicate MFE URL prefix: ${prefix}`);
      }
      routes.add(prefix);
    }
  }

  const locations = registry.mfes.map(({ name, path: mfePath, remoteEntry, requiresLogin }) => {
    let config = `    # ${name.toUpperCase()} MFE
    location = ${mfePath} {
        return 301 ${requiresLogin ? '/' : `${mfePath}/`};
    }

    location ${mfePath}/ {
${requiresLogin ? `        return 302 /?login_required=${name};` : `        root /srv;
        rewrite ^${mfePath}/(.*)$ /${name}/$1 break;
        try_files $uri ${mfePath}/index.html;`}
    }

    location ~* ^${mfePath}/.*\\.(${staticExtensions})$ {
        root /srv;
        rewrite ^${mfePath}/(.*)$ /${name}/$1 break;
        try_files $uri =404;
    }
`;
    if (remoteEntry) {
      const remoteBase = `/${remoteEntry.split('/')[1]}`;
      config += `
    location = ${remoteBase} {
        return 301 ${remoteBase}/;
    }

    location ^~ ${remoteBase}/ {
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, HEAD, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type' always;

        root /srv;
        rewrite ^${remoteBase}/(.*)$ /${name}/$1 break;
        try_files $uri =404;
    }
`;
    }
    return config;
  }).join('\n');
  return template.replace('__MFE_LOCATIONS__', () => locations.trimEnd());
}

if (require.main === module) {
  const outputPath = process.argv[2] || path.join(__dirname, 'nginx.conf');
  try {
    const registry = JSON.parse(fs.readFileSync(path.join(__dirname, 'mfes.json'), 'utf8'));
    const template = fs.readFileSync(path.join(__dirname, 'nginx.conf.template'), 'utf8');
    fs.writeFileSync(outputPath, generateConfig(registry, template));
    console.log(`Generated ${outputPath} from mfes.json (${registry.mfes.length} MFEs)`);
  } catch (error) {
    console.error(`Nginx config generation failed: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { generateConfig };
