import { createBrowserListSchema } from '@test-release/browserlist'
import { createCodeQualityConfig } from '@test-release/code-quality'
import { AppType, builder } from '@test-release/core'
import { createCreateReactAppSchema } from '@test-release/create-react-app'
import { createGitHooksSchema } from '@test-release/git-hooks'
import { createHerokuSchema } from '@test-release/heroku'

export interface IOptions {
  projectFolder: string
  isHeroku: boolean
  isRouter: boolean
}

export const createCRAJsConfig = ({
  projectFolder,
  isRouter,
  isHeroku,
}: IOptions) => {
  const appType = AppType.WEB

  const schema = builder('cra')

  const createReactAppSchema = createCreateReactAppSchema({
    projectFolder,
    isRouter,
  })
  schema.combineSchema(createReactAppSchema)

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
      isCRA: true,
      projectFolder,
      isDatabase: false,
    })
    schema.combineSchema(herokuSchema)
  }

  return schema.toJson()
}
