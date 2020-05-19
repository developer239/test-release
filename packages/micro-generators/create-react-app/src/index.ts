import path from 'path'
import { builder } from '@test-release/core'

interface IOptions {
  projectFolder: string
  isHeroku: boolean
  isRouter: boolean
}

export const createCreateReactAppSchema = ({
  projectFolder,
  isHeroku,
  isRouter,
}: IOptions) => {
  const schema = builder('create-react-app')
  schema.addCommand({
    command: `npx create-react-app ${projectFolder} --template typescript`,
    successMessage: '[create react app] initialize',
    priority: 99,
  })
  schema.addCommand({
    command: 'rm -rf src/*',
    successMessage: '[fs][remove files] old project structure',
    priority: 98,
    shouldRunInProject: true,
  })

  schema.moveDependencies([
    '@types/jest',
    '@types/node',
    '@types/react',
    '@types/react-dom',
  ])
  schema.addDevDependencies(['@types/webpack-env'])
  schema.addDependencies([
    'styled-components',
    'sanitize.css',
    '@types/styled-components',
  ])

  schema.addJsonProperty({
    path: ['compilerOptions', 'baseUrl'],
    value: 'src',
    file: 'tsconfig.json',
  })

  schema.removePackageJsonProperty(['private'])
  schema.removePackageJsonProperty(['browserslist'])
  schema.removePackageJsonProperty(['eslintConfig'])
  schema.removePackageJsonProperty(['scripts', 'eject'])
  schema.removePackageJsonProperty(['scripts', 'start'])

  schema.addScript('start', 'react-scripts start')

  schema.addFolder({
    name: 'create react app base',
    source: path.join(__dirname, 'templates/base'),
    context: {
      projectFolder,
      isHeroku,
    },
  })

  if (isRouter) {
    schema.addDependencies(['react-router', 'react-router-dom'])
    schema.addDevDependencies(['@types/react-router-dom'])

    schema.addFolder({
      name: 'create react app router',
      source: path.join(__dirname, 'templates/react-router'),
      context: {
        projectFolder,
      },
    })
  }

  return schema.toJson()
}
