import path from 'path'
import { builder } from '@test-release/core'

interface IOptions {
  projectFolder: string
}

export const createSchema = ({ projectFolder }: IOptions) => {
  const schema = builder('nextjs')

  schema.addCommand({
    command: '[fs][make dir] create project directory',
    successMessage: '[fs][make dir] create project directory',
    priority: 99,
  })
  schema.addDependencies(['next', 'react', 'react-dom', 'styled-components'])
  schema.addDevDependencies([
    '@types/node ',
    '@types/react',
    '@types/react-dom',
    '@types/styled-components',
    'babel-plugin-styled-components',
    'typescript',
    'jest',
    '@types/jest',
    '@testing-library/react',
    'ts-jest',
    'babel-jest',
    'jest-styled-components',
  ])

  schema.addFolder({
    name: 'nextjs',
    source: path.join(__dirname, 'templates'),
    context: {
      projectFolder,
    },
  })

  return schema.toJson()
}
