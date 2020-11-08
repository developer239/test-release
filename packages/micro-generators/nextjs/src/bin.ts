import { askProjectName, execute, logger } from '@test-release/core'
import { createSchema } from './index'

const run = async () => {
  const { projectFolder } = await askProjectName()

  const nextJsSchema = createSchema({
    projectFolder,
  })

  await execute(nextJsSchema, projectFolder)
}

run().catch(logger.error)
