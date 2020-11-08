import { execute, getProjectFolder, logger } from '@test-release/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'

  const tsNodeSchema = createSchema()

  await execute(tsNodeSchema, projectFolder)
}

run().catch(logger.error)
