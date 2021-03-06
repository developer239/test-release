/* eslint-disable no-await-in-loop */
import {
  getProjectFolder,
  logger,
  execute,
  askAppType,
} from '@test-release/core'
import { createSchema } from './index'

const run = async () => {
  const projectFolder = getProjectFolder() ?? '.'
  const appType = await askAppType()

  const codeQualitySchema = createSchema({ appType })

  await execute(codeQualitySchema, projectFolder)
}

run().catch(logger.error)
