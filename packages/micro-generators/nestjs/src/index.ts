import path from 'path'
import { builder } from '@test-release/core'

interface IOptions {
  projectFolder: string
  isHeroku: boolean
  isDatabase: boolean
}

export const createNestJsSchema = ({
  projectFolder,
  isHeroku,
  isDatabase,
}: IOptions) => {
  const schema = builder('nestjs')

  schema.addCommand({
    command: `npx nest new ${projectFolder} --package-manager yarn`,
    successMessage: '[nest.js] initialize',
    priority: 99,
  })

  schema.addDependencies(['@nestjs/config', 'class-transformer', '@nestjs/swagger', 'swagger-ui-express', '@godaddy/terminus', '@nestjs/terminus'])

  schema.addCommand({
    command: 'rm -rf src test .eslintrc.js .prettierrc README.md',
    successMessage: '[fs][remove files] old project structure',
    priority: 98,
    shouldRunInProject: true,
  })

  schema.removePackageJsonProperty(['jest'])
  schema.removePackageJsonProperty(['scripts', 'lint'])
  schema.removePackageJsonProperty(['scripts', 'test:e2e])'])

  schema.addScript('start:dev', 'NODE_ENV=development nest start --watch')

  schema.addScript('nestjs-postbuild', 'npm run build')

  schema.addFolder({
    name: 'nest.js base',
    source: path.join(__dirname, 'templates/base'),
    context: {
      isHeroku,
      isDatabase,
      projectFolder
    },
  })

  if (isDatabase) {
    schema.addDependencies(['pg', 'typeorm', '@nestjs/typeorm', 'pg-connection-string'])
    schema.addDevDependencies(['@types/pg-connection-string'])

    schema.addFolder({
      name: 'nest.js base',
      source: path.join(__dirname, 'templates/typeorm'),
      context: {
        isHeroku,
        isDatabase,
        projectFolder
      },
    })
  }

  return schema.toJson()
}
