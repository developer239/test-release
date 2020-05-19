import {
  execute,
  getProjectPath,
  logError,
} from '@test-release/core'
import { askIsHeroku, askIsDatabase } from './services/prompt'
import { createNestJsSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const isHeroku = await askIsHeroku()
  const isDatabase = await askIsDatabase()

  const nestJsSchema = createNestJsSchema({
    projectFolder,
    isHeroku,
    isDatabase,
  })

  await execute(nestJsSchema, projectFolder)
}

run().catch(logError)
