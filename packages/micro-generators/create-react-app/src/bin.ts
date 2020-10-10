import { execute, askProjectName, logError } from '@test-release/core'
import { askIsRouter } from './services/prompt'
import { createCreateReactAppSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const isRouter = await askIsRouter()

  const createReactAppSchema = createCreateReactAppSchema({
    projectFolder,
    isRouter,
  })

  await execute(createReactAppSchema, projectFolder)
}

run().catch(logError)
