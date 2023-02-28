#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from "typescript";

const DIST = 'dist_transpiled';

const patckagePath = path.resolve(
  fileURLToPath(import.meta.url),
  '../..'
);

const source = await fs.readFile(
  path.resolve(patckagePath, 'src/index.ts'),
  'utf8'
);

const result = ts.transpileModule(
  source,
  {
    compilerOptions: {
      module: 100, // ts.ModuleKind.Node16
      isolatedModules: true
    }
  }
);

try {
  await fs.mkdir(path.resolve(patckagePath, DIST));
} catch (e) {
  if (e.code !== 'EEXIST') {
    throw e;
  }
}

await fs.writeFile(
  path.resolve(patckagePath, DIST, 'index.js'),
  result.outputText,
  'utf8'
);
