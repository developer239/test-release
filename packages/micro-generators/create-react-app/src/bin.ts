import { execute, getProjectPath, logError } from '@test-release/core'
import { askIsHeroku, askIsRouter } from './services/prompt'
import { createCreateReactAppSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const isRouter = await askIsRouter()
  const isHeroku = await askIsHeroku()

  const createReactAppSchema = createCreateReactAppSchema({
    projectFolder,
    isRouter,
    isHeroku,
  })

  await execute(createReactAppSchema, projectFolder)
}

run().catch(logError)
