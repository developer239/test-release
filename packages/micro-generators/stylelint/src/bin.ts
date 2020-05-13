import {
  addDependencies,
  AppType,
  askAppTypeFE,
  generateTemplate,
  getPathArgv,
  logger,
  updatePackageJson,
} from '@test-release/core'
import { askHasPrettier } from './services/prompt'
import { createStylelintMobileConfig, createStylelintWebConfig } from './index'

const run = async () => {
  const projectFolder = getPathArgv() || '.'
  const type = await askAppTypeFE()
  const hasPrettier = await askHasPrettier()

  if (type !== AppType.WEB && type !== AppType.MOBILE){
    logger.error('App type is not supported!')
  }

  const stylelintSchema = type === AppType.WEB
    ? createStylelintWebConfig({ hasPrettier })
    : createStylelintMobileConfig({ hasPrettier })

  await updatePackageJson(
    {
      projectFolder,
      message: 'adding stylelint dependencies',
      messageSuccess: 'added stylelint dependencies',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        ...stylelintSchema.packageJson.scripts,
      },
    }),
  )
  await addDependencies({
    projectFolder,
    libraries: stylelintSchema.packageJson.devDependencies,
  })
  await generateTemplate({
    name: stylelintSchema.name,
    projectFolder,
    source: stylelintSchema.source,
    context: stylelintSchema.context,
  })
}

run().catch(logger.error)
