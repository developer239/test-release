import { createCodeQualityConfig } from '@test-release/code-quality'
import { AppType, builder } from '@test-release/core'
import { createNestJsSchema } from '@test-release/nestjs'
import { createGitHooksSchema } from '@test-release/git-hooks'
import { createHerokuSchema } from '@test-release/heroku'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
  isDatabase: boolean
}

export const createNestJsConfig = ({
  projectFolder,
  isHeroku,
  isDatabase,
}: IOptions) => {
  const appType = AppType.NODE

  const schema = builder('nestjs')

  const nestJsSchema = createNestJsSchema({
    projectFolder,
    isDatabase,
  })
  schema.combineSchema(nestJsSchema)

  const codeQualitySchema = createCodeQualityConfig({ appType })
  schema.combineSchema(codeQualitySchema)

  const gitHooksSchema = createGitHooksSchema({
    appType,
    isEslint: true,
    isPrettier: true,
    isStylelint: true,
  })
  schema.combineSchema(gitHooksSchema)

  if (isHeroku) {
    const herokuSchema = createHerokuSchema({
      appType,
      isCRA: false,
      projectFolder,
      isDatabase: false,
    })
    schema.combineSchema(herokuSchema)
  }

  return schema.toJson()
}
