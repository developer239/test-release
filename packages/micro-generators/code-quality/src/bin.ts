/* eslint-disable no-await-in-loop */
import {
  AppType,
  askAppTypeFE,
  getPathArgv,
  logger,
  execute,
} from '@test-release/core'
import { createCodeQualityConfig } from './index'

const run = async () => {
  const projectFolder = getPathArgv() ?? '.'
  const appType = await askAppTypeFE()

  if (appType !== AppType.WEB && appType !== AppType.MOBILE){
    logger.error('App type is not supported!')
  }

  const codeQualitySchema = createCodeQualityConfig({ appType })

  await execute(codeQualitySchema, projectFolder)
}

run().catch(logger.error)
