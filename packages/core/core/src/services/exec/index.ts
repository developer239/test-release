import { shell } from '../shell'

export const addDependencies = ({
  projectFolder,
  libraries,
  isDev = false,
}: {
  projectFolder: string
  libraries: string[]
  isDev?: boolean
}) =>
  shell.execInProjectWithSpinner(projectFolder)(
    `yarn add ${libraries.join(' ')} ${isDev ? '-D' : ''}`,
    `[dependencies][add]`,
  )

export const removeDependencies = ({
  projectFolder,
  name,
  libraries,
}: {
  projectFolder: string
  name: string
  libraries: string[]
}) =>
  shell.execInProjectWithSpinner(projectFolder)(
    `yarn remove ${libraries.join(' ')}`,
    `[dependencies][remove] ${name}`,
  )

export const moveToDevDependencies = ({
  projectFolder,
  name,
  libraries,
}: {
  projectFolder: string
  name: string
  libraries: string[]
}) =>
  shell.execInProjectWithSpinner(projectFolder)(
    `yarn remove ${libraries.join(' ')} && yarn add ${libraries.join(' ')} -D`,
    `[dependencies][move] ${name}`,
  )

export const removeFiles = ({
  projectFolder,
  name,
  files,
  recursive = false,
}: {
  projectFolder: string
  name: string
  files: string[]
  recursive?: boolean
}) =>
  shell.execInProjectWithSpinner(projectFolder)(
    `rm ${recursive ? '-r' : ''} ${files.join(' ')}`,
    `[fs][remove files] ${name}`,
  )

export const makeDir = (name: string) =>
  shell.execWithSpinner(
    `mkdir ${name}`,
    `[fs][make dir] ${name}`,
  )
