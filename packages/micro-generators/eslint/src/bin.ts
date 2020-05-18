import {
  askAppType,
  execute,
  getProjectPath,
  logError,
} from '@test-release/core'
import { createEslintSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const appType = await askAppType()

  const eslintSchema = createEslintSchema({ appType })

  await execute(eslintSchema, projectFolder)
}

run().catch(logError)
