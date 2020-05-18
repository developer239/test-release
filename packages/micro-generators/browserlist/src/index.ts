import path from 'path'
import { builder } from '@test-release/core'

export const createBrowserListSchema = () => {
  const schema = builder('browserlist')
  schema.addFolder({
    name: 'browserlist',
    source: path.join(__dirname, 'templates'),
  })

  return schema.toJson()
}
