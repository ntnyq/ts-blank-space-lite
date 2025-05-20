# ts-blank-space-lite

[![CI](https://github.com/ntnyq/ts-blank-space-lite/workflows/CI/badge.svg)](https://github.com/ntnyq/ts-blank-space-lite/actions)
[![NPM VERSION](https://img.shields.io/npm/v/ts-blank-space-lite.svg)](https://www.npmjs.com/package/ts-blank-space-lite)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/ts-blank-space-lite.svg)](https://www.npmjs.com/package/ts-blank-space-lite)
[![LICENSE](https://img.shields.io/github/license/ntnyq/ts-blank-space-lite.svg)](https://github.com/ntnyq/ts-blank-space-lite/blob/main/LICENSE)

Fork of [bloomberg/ts-blank-space](https://github.com/bloomberg/ts-blank-space), a small, fast, pure JavaScript type-stripper that uses the official TypeScript parser.

Changes in this fork:

- Rename and publish as `ts-blank-space-lite`
- Wrap all `index.ts` content in async function `createTSBlankSpace`
- Export only function `createTSBlankSpace`
- Replace `String#charCodeAt` to `String#codePointAt`
- Ships ESM and CJS bundles
- Change dependency `typescript` to a params of `createTSBlankSpace`
- Support import typescript module by path
- Drop Node.js loader support

## Install

```shell
npm install ts-blank-space-lite
```

```shell
yarn add ts-blank-space-lite
```

```shell
pnpm add ts-blank-space-lite
```

## Usage

```ts
import { createTSBlankSpace } from 'ts-blank-space-lite'

const { tsBlankSpace } = await createTSBlankSpace()

console.log(tsBlankSpace(`const foo: string = 'foo'`))
// => `const foo         = 'foo'`
```

## Api

### createTSBlankSpace(tsLibOrTsPath)

Create a `tsBlankSpace` function with `tsLibOrTsPath`.

#### tsLibOrTsPath

- **type**: `typeof import('typescript') | string`
- **default**: `require.resolve('typescript')`
- **required**: `false`

`typescript` module or path to `typescript/lib/typescript.js`.

## Credits

- [bloomberg/ts-blank-space](https://github.com/bloomberg/ts-blank-space)

## License

[Apache-2.0](./LICENSE) License
