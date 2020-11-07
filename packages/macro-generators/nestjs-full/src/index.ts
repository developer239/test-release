import { createSchema as createCodeQualitySchema } from '@test-release/code-quality'
import { AppType, builder } from '@test-release/core'
import { createSchema as createGitHooksSchema } from '@test-release/git-hooks'
import { createSchema as createHerokuSchema } from '@test-release/heroku'
import { createSchema as createNestJsSchema } from '@test-release/nestjs'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
  isDatabase: boolean
}

export const createSchema = ({
  projectFolder,
  isHeroku,
  isDatabase,
}: IOptions) => {
  const appType = AppType.NODE

  const schema = builder('nestjs')
  schema.combineSchema(
    createNestJsSchema({
      projectFolder,
      isDatabase,
    })
  )
  schema.combineSchema(createCodeQualitySchema({ appType }))
  schema.combineSchema(
    createGitHooksSchema({
      appType,
      isEslint: true,
      isPrettier: true,
      isStylelint: true,
    })
  )

  if (isHeroku) {
    schema.combineSchema(
      createHerokuSchema({
        appType,
        isCRA: false,
        projectFolder,
        isDatabase,
      })
    )
  }

  return schema.toJson()
}
