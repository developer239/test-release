import { generateTemplate, getPathArgv, logger } from '@test-release/core'
import { createEditorConfig } from './index'

generateTemplate({
  ...createEditorConfig(),
  projectFolder: getPathArgv() || '.',
}).catch(logger.error)
