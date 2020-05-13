import {
  addDependencies,
  askAppType,
  generateTemplate,
  getPathArgv,
  logger,
  updatePackageJson,
} from '@test-release/core'
import { createPrettierConfig } from './index'

const run = async () => {
  const projectFolder = getPathArgv() || '.'
  const type = await askAppType()

  const prettierSchema = createPrettierConfig({ appType: type })

  await updatePackageJson(
    {
      projectFolder,
      message: 'adding prettier dependencies',
      messageSuccess: 'added prettier dependencies',
    },
    jsonFile => ({
      ...jsonFile,
      scripts: {
        ...jsonFile.scripts,
        ...prettierSchema.packageJson.scripts,
      },
    }),
  )
  await addDependencies({
    projectFolder,
    libraries: prettierSchema.packageJson.devDependencies,
  })
  await generateTemplate({
    name: prettierSchema.name,
    projectFolder,
    source: prettierSchema.source,
  })
}

run().catch(logger.error)
