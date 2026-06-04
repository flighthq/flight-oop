import { existsSync, readdirSync, readFileSync } from 'fs';
import { extname, join, resolve } from 'path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

import { workspacePackages } from '../../scripts/workspaces';

interface Example {
  name: string;
}

const projectRoot = resolve(__dirname, '../..');
const examplesDir = join(projectRoot, 'examples');

function discoverExamples(): Example[] {
  return readdirSync(examplesDir, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        existsSync(join(examplesDir, d.name, 'package.json')) &&
        existsSync(join(examplesDir, d.name, 'src/app.ts')),
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ name }) => ({ name }));
}

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.json': 'application/json',
};

function explorerPlugin(examples: Example[]): Plugin[] {
  return [
    {
      name: 'explorer:modules',
      enforce: 'pre',

      resolveId(source) {
        if (source === 'virtual:explorer-examples') return '\0virtual:explorer-examples';
        if (source.startsWith('virtual:entry:')) return '\0' + source;

        // Trampoline: resolve ___app___{name} to the real file path so Windows
        // backslashes never appear inside generated module source.
        if (source.startsWith('___app___')) {
          const name = source.slice('___app___'.length);
          return join(examplesDir, name, 'src', 'app.ts');
        }
      },

      load(id) {
        if (id === '\0virtual:explorer-examples') {
          return `export const examples = ${JSON.stringify(examples)};`;
        }

        if (id.startsWith('\0virtual:entry:')) {
          const name = id.slice('\0virtual:entry:'.length);
          return `import '___app___${name}';`;
        }
      },
    },

    {
      name: 'explorer:routes',

      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = (req.url ?? '/').split('?')[0];
          const parts = urlPath.split('/').filter(Boolean);

          // Must start with /examples/{name}
          if (parts[0] !== 'examples' || parts.length < 2) return next();
          const [, name, ...assetParts] = parts;

          const example = examples.find((e) => e.name === name);
          if (!example) return next();

          // Asset request: /examples/{name}/{assetPath...}
          if (assetParts.length > 0) {
            const assetRel = assetParts.join('/');
            const publicFile = join(examplesDir, name, 'public', assetRel);
            if (existsSync(publicFile)) {
              const mime = MIME[extname(publicFile)] ?? 'application/octet-stream';
              res.setHeader('Content-Type', mime);
              res.end(readFileSync(publicFile));
              return;
            }
            return next();
          }

          // HTML entry page
          const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name}</title>
  <style>*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } body { overflow: hidden; }</style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/@vite/client"></script>
  <script type="module" src="/@id/__x00__virtual:entry:${name}"></script>
</body>
</html>`;

          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        });
      },
    },
  ];
}

export default defineConfig(() => {
  const examples = discoverExamples();

  const alias: Record<string, string> = Object.fromEntries(
    workspacePackages.map((pkg) => [pkg.name, pkg.dir + '/src']),
  );

  return {
    root: __dirname,

    plugins: explorerPlugin(examples),

    resolve: {
      alias,
      preserveSymlinks: false,
    },

    optimizeDeps: {
      exclude: workspacePackages.map((p) => p.name),
    },

    server: {
      fs: {
        allow: [projectRoot],
      },
      watch: {
        followSymlinks: true,
      },
    },
  };
});
