import { generate } from '@test-release/core'

export const createEditorConfig = async () => {
  await generate('editorconfig')({
    projectFolder: 'temp',
    source: 'templates',
    destination: '.',
    context: {},
  })
}
