import { logError, execute, askProjectName, askYesNo } from '@test-release/core'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const isHeroku = await askYesNo(
    'Do you want to generate Heroku configuration?'
  )

  const schema = createSchema({ projectFolder, isHeroku })

  await execute(schema, projectFolder)
}

run().catch(logError)
