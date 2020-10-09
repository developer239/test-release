import { execute, getProjectPath, logError } from '@test-release/core'
import { askIsRouter } from './services/prompt'
import { createCreateReactAppSchema } from './index'

const run = async () => {
  // TODO: replace with `askProjectName`
  const projectFolder = getProjectPath() ?? '.'
  const isRouter = await askIsRouter()

  const createReactAppSchema = createCreateReactAppSchema({
    projectFolder,
    isRouter,
  })

  await execute(createReactAppSchema, projectFolder)
}

run().catch(logError)
