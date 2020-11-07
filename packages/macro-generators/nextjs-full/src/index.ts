import { createSchema as createBrowserlistSchema } from '@test-release/browserlist'
import { createSchema as createCodeQualitySchema } from '@test-release/code-quality'
import { AppType, builder } from '@test-release/core'
import { createSchema as createGitHooksSchema } from '@test-release/git-hooks'
import { createSchema as createHerokuSchema } from '@test-release/heroku'
import { createSchema as createNextJsSchema } from '@test-release/nextjs'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
}

export const createSchema = ({ projectFolder, isHeroku }: IOptions) => {
  const appType = AppType.WEB

  const schema = builder('nextjs')

  schema.combineSchema(createNextJsSchema({ projectFolder }))
  schema.combineSchema(createBrowserlistSchema())
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
        isDatabase: false,
      })
    )
  }

  return schema.toJson()
}
