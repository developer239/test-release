import {
  askAppType,
  execute,
  getProjectPath,
  logError,
} from '@test-release/core'
import { askIsCRA, askPostgreAddon } from './services/prompt'
import { createHerokuSchema } from './index'

const run = async () => {
  const projectFolder = getProjectPath() ?? '.'
  const appType = await askAppType()
  const isCRA = await askIsCRA()

  let isDatabase = false

  if (!isCRA) {
    isDatabase = await askPostgreAddon()
  }

  const herokuSchema = createHerokuSchema({
    appType,
    projectFolder,
    isCRA,
    isDatabase,
  })

  await execute(herokuSchema, projectFolder)
}

run().catch(logError)
