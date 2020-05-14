import path from 'path'
import { builder } from '@test-release/core'

export const createEditorConfigSchema = () => {
  const schema = builder('editorconfig')
  schema.addFile({
    name: 'editorconfig',
    source: path.join(__dirname, 'templates'),
  })

  return schema.toJson()
}
