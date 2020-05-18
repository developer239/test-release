/* eslint-disable no-await-in-loop */
import {
  AppType,
  askAppTypeFE,
  getProjectPath,
  logError,
  execute,
} from '@test-release/core'
import { createCodeQualityConfig } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const appType = await askAppTypeFE()

  if (appType !== AppType.WEB && appType !== AppType.MOBILE) {
    logError('App type is not supported!')
  }

  const codeQualitySchema = createCodeQualityConfig({ appType })

  await execute(codeQualitySchema, projectFolder)
}

run().catch(logError)
