import yargs from 'yargs'

export const getPathArgv = (): string | undefined => String(yargs.argv.path)
