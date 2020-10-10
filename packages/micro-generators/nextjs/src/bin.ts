import { askProjectName, execute, logError } from '@test-release/core'
import { createNextJsSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()

  const nextJsSchema = createNextJsSchema({
    projectFolder,
  })

  await execute(nextJsSchema, projectFolder)
}

run().catch(logError)
