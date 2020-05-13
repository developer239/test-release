import path from 'path'
import { AppType } from '@test-release/core'

export const createPrettierConfig = ({
  appType,
}: {
  appType: AppType
}) => ({
  name: 'prettier',
  source: path.join(__dirname, 'templates'),
  packageJson: {
    scripts: {
      format: appType === 'node'
        ? 'prettier --write \'*/**/*.{ts,md,json}\''
        : 'prettier --write \'*/**/*.{ts,tsx,css,md,json}\'',
    },
    devDependencies: ['prettier', '@linters/prettier-config'],
  },
})
