import { askYesNo } from '@test-release/core'

export const askIsRouter = () => askYesNo('Do you want to use React Router?')

export const askIsHeroku = () => askYesNo('Do you use Heroku?')
