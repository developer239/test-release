import path from 'path'
import { AppType, builder } from '@test-release/core'

export const createPrettierConfig = ({
  appType,
}: {
  appType: AppType
}) => {
  const schema = builder('prettier')

  schema.addFile({
    name: 'prettier',
    source: path.join(__dirname, 'templates'),
  })

  if (appType === 'node') {
    schema.addScript('format', 'prettier --write \'*/**/*.{ts,md,json}\'')
  } else {
    schema.addScript('format', 'prettier --write \'*/**/*.{ts,tsx,css,md,json}\'')
  }

  schema.addDevDependencies(['prettier', '@linters/prettier-config'])

  return schema.toJson()
}
