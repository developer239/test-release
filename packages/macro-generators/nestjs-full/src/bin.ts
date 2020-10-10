import { logError, execute, askProjectName, askYesNo } from '@test-release/core'
import { createNestJsConfig } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const isDatabase = await askYesNo('Do you want to setup database?')
  const isHeroku = await askYesNo('Do you want to generate Heroku configuration?')

  const schema = createNestJsConfig({ projectFolder, isHeroku, isDatabase })

  await execute(schema, projectFolder)
}

run().catch(logError)
