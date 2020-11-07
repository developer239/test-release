import {
  askAppType,
  execute,
  getProjectFolder,
  logError,
} from '@test-release/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()

  const eslintSchema = createSchema({ appType })

  await execute(eslintSchema, projectFolder)
}

run().catch(logError)
