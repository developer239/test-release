import { askYesNo } from '@test-release/core'

export const askIsCRA = () => askYesNo('Is this Create React App APP?')

export const askPostgreAddon = () =>
  askYesNo('Do you use heroku-postgresql addon?')
