import yargs from 'yargs'

export const getPath = () => yargs.argv.path as string | undefined
