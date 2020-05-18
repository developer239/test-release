import { execute, getProjectPath, logError } from '@test-release/core'
import { createTsNodeSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'

  const tsNodeSchema = createTsNodeSchema()

  await execute(tsNodeSchema, projectFolder)
}

run().catch(logError)
