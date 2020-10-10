import { logError, execute, askProjectName, askYesNo } from '@test-release/core'
import { createCRAJsConfig } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const isRouter = await askYesNo('Do you want to configure router?')
  const isHeroku = await askYesNo(
    'Do you want to generate Heroku configuration?'
  )

  const schema = createCRAJsConfig({ projectFolder, isHeroku, isRouter })

  await execute(schema, projectFolder)
}

run().catch(logError)
