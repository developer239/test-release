import path from 'path'
import { generate } from '@test-release/core'

export const createEditorConfig = async () => {
  await generate('editorconfig')({
    projectFolder: 'temp',
    source: path.join(__dirname, 'templates'),
    destination: '.',
    context: {},
  })
}
