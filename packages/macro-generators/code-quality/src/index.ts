import { AppType, builder } from '@test-release/core'
import { createEditorConfigSchema } from '@test-release/editor-config'
import { createPrettierConfig } from '@test-release/prettier'
import { createStylelintWebConfig, createStylelintMobileConfig } from '@test-release/stylelint'

export interface IOptions {
  appType: AppType.WEB | AppType.MOBILE
}

export const createCodeQualityConfig = ({ appType }: IOptions) => {
  const schema = builder('codequality')
  const hasPrettier = true

  const editorConfigSchema = createEditorConfigSchema()
  const prettierSchema = createPrettierConfig({ appType })
  const stylelintConfig = appType === AppType.MOBILE
    ? createStylelintWebConfig({ hasPrettier })
    : createStylelintMobileConfig({ hasPrettier })

  schema.combineSchema(editorConfigSchema)
  schema.combineSchema(prettierSchema)
  schema.combineSchema(stylelintConfig)

  return schema.toJson()
}
