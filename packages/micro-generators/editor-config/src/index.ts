import path from 'path'

export const createEditorConfig = () => ({
  name: 'editorconfig',
  source: path.join(__dirname, 'templates'),
})
