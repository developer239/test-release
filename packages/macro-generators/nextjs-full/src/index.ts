import { createBrowserListSchema } from '@test-release/browserlist'
import { createCodeQualityConfig } from '@test-release/code-quality'
import { AppType, builder } from '@test-release/core'
import { createGitHooksSchema } from '@test-release/git-hooks'
import { createHerokuSchema } from '@test-release/heroku'
import { createNextJsSchema } from '@test-release/nextjs'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
}

export const createNextJsConfig = ({ projectFolder, isHeroku }: IOptions) => {
  const appType = AppType.WEB

  const schema = builder('nextjs')

  const nextJsSchema = createNextJsSchema({ projectFolder })
  schema.combineSchema(nextJsSchema)

  const browserListSchema = createBrowserListSchema()
  schema.combineSchema(browserListSchema)

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
