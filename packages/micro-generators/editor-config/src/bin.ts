import { execute, getPath, logger } from '@test-release/core'
import { createEditorConfigSchema } from './index'

const run = async () => {
  const projectFolder = getPath() ?? '.'
  const schema = createEditorConfigSchema()

  await execute(schema, projectFolder)
}

run().catch(logger.error)
