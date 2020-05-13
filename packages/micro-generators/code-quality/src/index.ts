import { AppType } from '@test-release/core'
import { createEditorConfig } from '@test-release/editor-config'
import { createPrettierConfig } from '@test-release/prettier'
import { createStylelintWebConfig, createStylelintMobileConfig } from '@test-release/stylelint'

export interface IOptions {
  appType: AppType.WEB | AppType.MOBILE
}

export const createCodeQualityConfig = ({ appType }: IOptions) => {
  const hasPrettier = true

  const editorConfigSchema = createEditorConfig()
  const prettierSchema = createPrettierConfig({ appType })
  const stylelintConfig = appType === AppType.MOBILE
    ? createStylelintWebConfig({ hasPrettier })
    : createStylelintMobileConfig({ hasPrettier })

  return {
    name: 'code-quality',
    sources: [
      {
        name: 'editorconfig',
        source: editorConfigSchema.source,
      },
      {
        name: 'prettier',
        source: prettierSchema.source,
      },
      {
        name: 'stylelint',
        source: stylelintConfig.source,
        context: stylelintConfig.context,
      },
    ],
    packageJson: {
      scripts: {
        ...prettierSchema.packageJson.scripts,
        ...stylelintConfig.packageJson.scripts,
      },
      devDependencies: [
        ...prettierSchema.packageJson.devDependencies,
        ...stylelintConfig.packageJson.devDependencies,
      ]
    }
  }
}
