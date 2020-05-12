import path from 'path'
import ora from 'ora'
import { copyFiles } from '../template'

interface IOptions {
  projectFolder: string
  source: string
  destination: string
  context?: Object
}

export const generate = (name: string) => async ({
  projectFolder,
  source,
  destination,
  context,
}: IOptions) => {
  const spinner = ora()
  spinner.start(`[generator] running ${name}`)

  try {
    await copyFiles(path.join(name, source), destination, projectFolder, context)
    spinner.succeed(`[generator] create ${name}`)
  } catch (error) {
    spinner.warn(`[generator] ${name} error: ${error}`)
  }
}
