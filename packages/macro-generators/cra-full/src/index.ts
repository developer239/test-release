import { createSchema as createBrowserlistSchema } from '@test-release/browserlist'
import { createSchema as createCodeQualitySchema } from '@test-release/code-quality'
import { AppType, builder } from '@test-release/core'
import { createSchema as createReactAppSchema } from '@test-release/create-react-app'
import { createSchema as createGitHooksSchema } from '@test-release/git-hooks'
import { createSchema as createHerokuSchema } from '@test-release/heroku'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
  isRouter: boolean
}

export const createSchema = ({
  projectFolder,
  isRouter,
  isHeroku,
}: IOptions) => {
  const appType = AppType.WEB

  const schema = builder('cra')

  schema.combineSchema(createReactAppSchema({
    projectFolder,
    isRouter,
  }))
  schema.combineSchema(createBrowserlistSchema())
  schema.combineSchema(createCodeQualitySchema({ appType }))
  schema.combineSchema(createGitHooksSchema({
    appType,
    isEslint: true,
    isPrettier: true,
    isStylelint: true,
  }))

  if (isHeroku) {
    schema.combineSchema(createHerokuSchema({
      appType,
      projectFolder,
      isCRA: true,
      isDatabase: false,
    }))
  }

  return schema.toJson()
}
