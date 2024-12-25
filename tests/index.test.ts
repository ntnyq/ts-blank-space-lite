import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { globSync } from 'tinyglobby'
import { describe, expect, it } from 'vitest'
import { resolve } from '../scripts/utils'
import { createTSBlankSpace } from '../src'

const fixtures = globSync('*.ts', {
  onlyFiles: true,
  cwd: resolve('tests/fixtures'),
})

const require = createRequire(import.meta.url)

const cachedFixtureMap = new Map<string, string>([])

async function readFixture(fixture: string) {
  if (cachedFixtureMap.has(fixture)) {
    return cachedFixtureMap.get(fixture)!
  }
  const content = await readFile(resolve(`tests/fixtures/${fixture}`), 'utf-8')

  cachedFixtureMap.set(fixture, content)

  return content
}

describe('default', () => {
  it.each(fixtures)('default - %s', async fixturePath => {
    const { tsBlankSpace } = await createTSBlankSpace()

    await expect(tsBlankSpace(await readFixture(fixturePath))).toMatchFileSnapshot(
      `__snapshots__/default.${fixturePath}.js`,
    )
  })
})

describe('tsPath', () => {
  it.each(fixtures)('require.resolve - %s', async fixturePath => {
    const { tsBlankSpace } = await createTSBlankSpace(require.resolve('typescript'))

    await expect(tsBlankSpace(await readFixture(fixturePath))).toMatchFileSnapshot(
      `__snapshots__/require.resolve.${fixturePath}.js`,
    )
  })

  it.each(fixtures)('path - %s', async fixturePath => {
    const { tsBlankSpace } = await createTSBlankSpace(
      resolve('node_modules/typescript/lib/typescript.js'),
    )

    await expect(tsBlankSpace(await readFixture(fixturePath))).toMatchFileSnapshot(
      `__snapshots__/path.${fixturePath}.js`,
    )
  })
})

describe('tsLib', () => {
  it.each(fixtures)('typescript - %s', async fixturePath => {
    const tsLib = await import('typescript')
    const { tsBlankSpace } = await createTSBlankSpace(tsLib)

    await expect(tsBlankSpace(await readFixture(fixturePath))).toMatchFileSnapshot(
      `__snapshots__/typescript.${fixturePath}.js`,
    )
  })
})
