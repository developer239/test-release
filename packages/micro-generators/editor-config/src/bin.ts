import { generate } from '@test-release/core'
import { createEditorConfig } from './index'

generate(createEditorConfig()).catch(error => error)
