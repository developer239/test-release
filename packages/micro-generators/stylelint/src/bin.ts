import {
  AppType,
  askAppTypeFE, execute,
  getPathArgv,
  logger,
} from '@test-release/core'
import { askHasPrettier } from './services/prompt'
import { createStylelintMobileConfig, createStylelintWebConfig } from './index'

const run = async () => {
  const projectFolder = getPathArgv() ?? '.'
  const type = await askAppTypeFE()
  const hasPrettier = await askHasPrettier()

  if (type !== AppType.WEB && type !== AppType.MOBILE){
    logger.error('App type is not supported!')
  }

  const stylelintSchema = type === AppType.WEB
    ? createStylelintWebConfig({ hasPrettier })
    : createStylelintMobileConfig({ hasPrettier })

  await execute(stylelintSchema, projectFolder)
}

run().catch(logger.error)
