import { askYesNo } from '@test-release/core'

export const askIsDatabase = () =>
  askYesNo('Do you want to use database?')
