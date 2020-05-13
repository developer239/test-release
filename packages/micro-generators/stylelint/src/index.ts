import path from 'path'
import { deepMerge } from '@test-release/core'

interface IOptions {
  hasPrettier: boolean
}

export const createCommonConfig = ({ hasPrettier }: IOptions) => ({
  name: 'stylelint',
  packageJson: {
    scripts: {
      'lint:css': 'stylelint \'**/*.{ts,tsx}\'',
    },
    devDependencies: [
      'stylelint',
      ...(hasPrettier ? ['stylelint-config-prettier'] : []),
    ],
  },
  context: {
    hasPrettier,
  },
})

export const createStylelintWebConfig = (options: IOptions) => deepMerge(
  createCommonConfig(options),
  {
    source: path.join(__dirname, 'templates/web'),
    packageJson: {
      devDependencies: ['@linters/stylelint-css-in-js-config'],
    },
  },
)

export const createStylelintMobileConfig = (options: IOptions) => deepMerge(
  createCommonConfig(options),
  {
    source: path.join(__dirname, 'templates/mobile'),
    packageJson: {
      devDependencies: ['@linters/stylelint-css-in-js-react-native-config'],
    },
  },
)
