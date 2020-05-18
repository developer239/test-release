import yargs from 'yargs'

export const getProjectPath = () => yargs.argv.path as string | undefined
