import path from 'path'
import { builder } from '@test-release/core'

interface IOptions {
  hasPrettier: boolean
}

export const createCommonSchema = ({ hasPrettier }: IOptions) => {
  const schema = builder('stylelint')
  schema.addScript('lint:css', "stylelint '**/*.{ts,tsx}'")
  schema.addDevDependencies(['stylelint'])

  if (hasPrettier) {
    schema.addDevDependencies(['stylelint-config-prettier'])
  }

  return schema
}

export const createStylelintWebConfig = (options: IOptions) => {
  const schema = createCommonSchema(options)

  schema.addFolder({
    name: 'stylelint',
    source: path.join(__dirname, 'templates/web'),
  })

  schema.addDevDependencies(['@linters/stylelint-css-in-js-config'])

  return schema.toJson()
}

export const createStylelintMobileConfig = (options: IOptions) => {
  const schema = createCommonSchema(options)

  schema.addFolder({
    name: 'stylelint',
    source: path.join(__dirname, 'templates/mobile'),
  })

  schema.addDevDependencies([
    '@linters/stylelint-css-in-js-react-native-config',
  ])

  return schema.toJson()
}
