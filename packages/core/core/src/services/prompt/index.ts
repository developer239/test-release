import inquirer from 'inquirer'
import { AppType } from '../../types'

export const askYesNo = async (question: string) => {
  const { answer } = await inquirer.prompt({
    name: 'answer',
    type: 'list',
    message: question,
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
    ],
  })

  return answer
}

export const askAppType = async (): Promise<AppType> => {
  const { answer } = await inquirer.prompt({
    name: 'answer',
    type: 'list',
    message: 'What application are you working on?',
    choices: [
      { name: 'Web (React, Angular)', value: AppType.WEB },
      { name: 'Mobile (React Native)', value: AppType.MOBILE },
      { name: 'Node.js (Express, Nest.js, ...)', value: AppType.NODE },
    ],
  })

  return answer
}

export const askAppTypeFE = async (): Promise<AppType.WEB | AppType.MOBILE> => {
  const { answer } = await inquirer.prompt({
    name: 'answer',
    type: 'list',
    message: 'What application are you working on?',
    choices: [
      { name: 'Web (React, Angular)', value: AppType.WEB },
      { name: 'Mobile (React Native)', value: AppType.MOBILE },
    ],
  })

  return answer
}
