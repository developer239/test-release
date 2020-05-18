/* eslint-disable no-await-in-loop */
import {
  addDependencies,
  AppType,
  askAppTypeFE,
  createFilesFromFolder,
  getPath,
  logger,
  updatePackageJson,
} from '@test-release/core'
import { createCodeQualityConfig } from './index'

const run = async () => {
  const projectFolder = getPath() ?? '.'
  const appType = await askAppTypeFE()

  if (appType !== AppType.WEB && appType !== AppType.MOBILE){
    logger.error('App type is not supported!')
  }

  const codeQualitySchema = createCodeQualityConfig({ appType })

  await updatePackageJson(
    {
      projectFolder,
      message: 'adding code quality dependencies',
      messageSuccess: 'added code quality dependencies',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        ...codeQualitySchema.packageJson.scripts,
      },
    }),
  )
  await addDependencies({
    projectFolder,
    libraries: codeQualitySchema.packageJson.devDependencies,
  })

  for (const templateSource of codeQualitySchema.sources) {
    await createFilesFromFolder({
      name: templateSource.name,
      projectFolder,
      source: templateSource.source,
      context: templateSource.context,
    })
  }
}

run().catch(logger.error)
