# ts-transpile-node16

An example repo to demonstrate a divergence btw TS compilation and transpilation when `module: node16` is used.\
Transpilation does not account for `type: module` in `package.json` and emits CommonJS, while ESM is expected.

## Usage

`npm run build` to run TS compilation - output will be stored in `dist`\
`npm run transpile` to run TS transpilation - output will be stored in `dist_transpiled`\
`npm start` to run both of the above

compiled output:
```js
import path from 'node:path';
console.log(path.join('foo', 'bar'));
```

transpiled output:
```js
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_path_1 = __importDefault(require("node:path"));
console.log(node_path_1.default.join('foo', 'bar'));

```
