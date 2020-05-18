import {
  askAppType, execute,
  getPath,
  logger,
} from '@test-release/core'
import { createPrettierConfig } from './index'

const run = async () => {
  const projectFolder = getPath() ?? '.'
  const appType = await askAppType()

  const prettierSchema = createPrettierConfig({ appType })

  await execute(prettierSchema, projectFolder)
}

run().catch(logger.error)
