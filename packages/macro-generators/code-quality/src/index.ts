import { AppType, builder } from '@test-release/core'
import { createEditorConfigSchema } from '@test-release/editor-config'
import { createEslintSchema } from '@test-release/eslint'
import { createPrettierConfig } from '@test-release/prettier'
import {
  createStylelintWebConfig,
  createStylelintMobileConfig,
} from '@test-release/stylelint'

export interface IOptions {
  appType: AppType
}

export const createCodeQualityConfig = ({ appType }: IOptions) => {
  const schema = builder('codequality')
  const hasPrettier = true

  const editorConfigSchema = createEditorConfigSchema()
  const prettierSchema = createPrettierConfig({ appType })
  const eslintSchema = createEslintSchema({ appType })

  schema.combineSchema(editorConfigSchema)
  schema.combineSchema(prettierSchema)
  schema.combineSchema(eslintSchema)

  if(appType !== AppType.NODE) {
    const stylelintConfig =
      appType === AppType.MOBILE
        ? createStylelintMobileConfig({ hasPrettier })
        : createStylelintWebConfig({ hasPrettier })

    schema.combineSchema(stylelintConfig)
  }

  return schema.toJson()
}
