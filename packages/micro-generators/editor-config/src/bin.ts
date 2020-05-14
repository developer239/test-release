import { execute, getPathArgv, logger } from '@test-release/core'
import { createEditorConfigSchema } from './index'

const run = async () => {
  const projectFolder = getPathArgv() ?? '.'
  const schema = createEditorConfigSchema()

  await execute(schema, projectFolder)
}

run().catch(logger.error)
