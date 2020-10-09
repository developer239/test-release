/* eslint-disable no-await-in-loop */
import {
  getProjectPath,
  logError,
  execute,
  askAppType,
} from '@test-release/core'
import { createCodeQualityConfig } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const appType = await askAppType()

  const codeQualitySchema = createCodeQualityConfig({ appType })

  await execute(codeQualitySchema, projectFolder)
}

run().catch(logError)
