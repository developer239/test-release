import { execute, getProjectFolder, logError } from '@test-release/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const schema = createSchema()

  await execute(schema, projectFolder)
}

run().catch(logError)
