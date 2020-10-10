import {
  askProjectName,
  execute,
  logError,
} from '@test-release/core'
import { askIsDatabase } from './services/prompt'
import { createNestJsSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()
  const isDatabase = await askIsDatabase()

  const nestJsSchema = createNestJsSchema({
    projectFolder,
    isDatabase,
  })

  await execute(nestJsSchema, projectFolder)
}

run().catch(logError)
