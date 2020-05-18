import { execute, getProjectPath, logError } from '@test-release/core'
import { createEditorConfigSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const schema = createEditorConfigSchema()

  await execute(schema, projectFolder)
}

run().catch(logError)
