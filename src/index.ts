import { createRequire } from 'node:module'
import { createTSBlankSpace as _createTSBlankSpace } from './browser'
import type { TSLib } from './browser'

const require = createRequire(import.meta.url)

/**
 * Create tsBlankSpace
 *
 * @param tsLibOrTsPath - `typescript` module or path to `typescript/lib/typescript.js`
 * @returns object with `tsBlankSpace` function
 *
 * @example
 *
 * ```ts
 * import { createTSBlankSpace } from 'ts-blank-space-lite'
 *
 * const { tsBlankSpace } = await createTSBlankSpace()
 *
 * console.log(tsBlankSpace(`const foo: string = 'foo'`))
 * // => `const foo         = 'foo'`
 * ```
 */
export function createTSBlankSpace(tsLibOrTsPath: TSLib | string = require.resolve('typescript')) {
  return _createTSBlankSpace(tsLibOrTsPath)
}
