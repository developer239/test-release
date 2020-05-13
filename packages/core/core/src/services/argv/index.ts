import yargs from 'yargs'

export const getPathArgv = () => yargs.argv.path as string | undefined
