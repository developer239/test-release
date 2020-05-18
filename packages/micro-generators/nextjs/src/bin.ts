import { execute, getProjectPath, logError } from '@test-release/core'
import { createNextJsSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'

  const nextJsSchema = createNextJsSchema({
    projectFolder,
    isHeroku: false,
  })

  await execute(nextJsSchema, projectFolder)
}

run().catch(logError)
