import { askYesNo } from '@test-release/core'

export const askIsHeroku = () => askYesNo('Do you use Heroku for deployment?')

export const askIsDatabase = () =>
  askYesNo('Do you want to use database?')
