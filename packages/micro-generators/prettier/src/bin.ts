import {
  askAppType, execute,
  getProjectPath,
  logError,
} from '@test-release/core'
import { createPrettierConfig } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const appType = await askAppType()

  const prettierSchema = createPrettierConfig({ appType })

  await execute(prettierSchema, projectFolder)
}

run().catch(logError)
