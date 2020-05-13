import fs from 'fs'
import path from 'path'
import ora from 'ora'

interface IOptions {
  projectFolder: string
  message: string
  messageSuccess: string
}

type jsonFileType = any

export const updatePackageJson = async (
  { projectFolder, message, messageSuccess }: IOptions,
  updateFile: (packageJson: jsonFileType) => Promise<jsonFileType>,
) => {
  const fileName = 'package.json'
  const spinner = ora()
  spinner.start(message)

  const jsonFilePath = path.join(process.cwd(), projectFolder, fileName)

  // These two lines break about 10 different eslint rules 🙈
  // eslint-disable-next-line
  delete require.cache[jsonFilePath]
  // eslint-disable-next-line
  const jsonFile = require(jsonFilePath)

  const updatedJsonFile = await updateFile(jsonFile)

  fs.writeFileSync(jsonFilePath, JSON.stringify(updatedJsonFile, null, 2))
  spinner.succeed(messageSuccess)
}
