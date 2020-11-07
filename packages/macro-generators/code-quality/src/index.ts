import { AppType, builder } from '@test-release/core'
import { createSchema as createEditorConfigSchema } from '@test-release/editor-config'
import { createSchema as createEslintSchema } from '@test-release/eslint'
import { createSchema as createPrettierSchema } from '@test-release/prettier'
import {
  createSchemaForWeb as createStylelintSchemaForWeb,
  createSchemaForMobile as createStylelintSchemaForMobile,
} from '@test-release/stylelint'

export interface IOptions {
  appType: AppType
}

export const createSchema = ({ appType }: IOptions) => {
  const schema = builder('codequality')
  const hasPrettier = true

  schema.combineSchema(createEditorConfigSchema())
  schema.combineSchema(createPrettierSchema({ appType }))
  schema.combineSchema(createEslintSchema({ appType }))

  if (AppType.MOBILE) {
    schema.combineSchema(createStylelintSchemaForWeb({ hasPrettier }))
  }

  if (AppType.WEB) {
    schema.combineSchema(createStylelintSchemaForMobile({ hasPrettier }))
  }

  return schema.toJson()
}
