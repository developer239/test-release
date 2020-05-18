import inquirer from 'inquirer'
import { AppType, CDType, CIType, DatabaseType } from '../../types'

export const askYesNo = async (question: string): Promise<boolean> => {
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

export const askCIType = async (): Promise<CIType> => {
  const { answer } = await inquirer.prompt({
    name: 'answer',
    type: 'list',
    message: 'Do you want to use CI?',
    choices: [
      { name: 'None', value: CIType.NONE },
      { name: 'GitHub Actions', value: CIType.ACTIONS },
    ],
  })

  return answer
}

export const askCDType = async (): Promise<CDType> => {
  const { answer } = await inquirer.prompt({
    name: 'answer',
    type: 'list',
    message: 'Do you want to use CI?',
    choices: [
      { name: 'None', value: CDType.NONE },
      { name: 'Heroku', value: CDType.HEROKU },
    ],
  })

  return answer
}

export const askDatabaseType = async (): Promise<DatabaseType> => {
  const { answer } = await inquirer.prompt({
    name: 'answer',
    type: 'list',
    message: 'Do you want to use database?',
    choices: [
      { name: 'None', value: DatabaseType.NONE },
      { name: 'SQL', value: DatabaseType.SQL },
    ],
  })

  return answer
}
