import {
  askAppType, execute,
  getPathArgv,
  logger,
} from '@test-release/core'
import { createPrettierConfig } from './index'

const run = async () => {
  const projectFolder = getPathArgv() ?? '.'
  const appType = await askAppType()

  const prettierSchema = createPrettierConfig({ appType })

  await execute(prettierSchema, projectFolder)
}

run().catch(logger.error)
