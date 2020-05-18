import {
  AppType,
  askAppType,
  execute,
  getProjectPath,
  logError,
} from '@test-release/core'
import { askIsEslint, askIsPrettier, askIsStylelint } from './services/prompt'
import { createGitHooksSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const appType = await askAppType()
  const isEslint = await askIsEslint()
  const isPrettier = await askIsPrettier()
  let isStylelint = false

  if (appType !== AppType.NODE) {
    isStylelint = await askIsStylelint()
  }

  const schema = createGitHooksSchema({
    appType,
    isEslint,
    isPrettier,
    isStylelint,
  })

  await execute(schema, projectFolder)
}

run().catch(logError)
