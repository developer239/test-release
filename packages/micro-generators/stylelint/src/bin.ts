import {
  AppType,
  askAppTypeFE, execute,
  getProjectPath,
  logError,
} from '@test-release/core'
import { askHasPrettier } from './services/prompt'
import { createStylelintMobileConfig, createStylelintWebConfig } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const type = await askAppTypeFE()
  const hasPrettier = await askHasPrettier()

  if (type !== AppType.WEB && type !== AppType.MOBILE){
    logError('App type is not supported!')
  }

  const stylelintSchema = type === AppType.WEB
    ? createStylelintWebConfig({ hasPrettier })
    : createStylelintMobileConfig({ hasPrettier })

  await execute(stylelintSchema, projectFolder)
}

run().catch(logError)
