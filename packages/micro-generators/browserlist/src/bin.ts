import { execute, getProjectPath, logError } from '@test-release/core'
import { createBrowserListSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const schema = createBrowserListSchema()

  await execute(schema, projectFolder)
}

run().catch(logError)
