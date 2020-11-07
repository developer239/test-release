import { execute, askProjectName, logError } from '@test-release/core'
import { askIsRouter } from './services/prompt'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const isRouter = await askIsRouter()

  const createReactAppSchema = createSchema({
    projectFolder,
    isRouter,
  })

  await execute(createReactAppSchema, projectFolder)
}

run().catch(logError)
