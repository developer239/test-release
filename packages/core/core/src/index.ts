export { deepMerge } from './helpers/deepMerge'
export { generateTemplate } from './services/generator/generate'
export { logger } from './services/logger'
export { copyFiles } from './services/generator/copyFiles'
export { getPathArgv } from './services/argv'
export { askYesNo, askAppType, askAppTypeFE } from './services/prompt'
export {
  addDependencies,
  removeDependencies,
  moveToDevDependencies,
  removeFiles,
  makeDir,
} from './services/exec'
export {
  updatePackageJson
} from './services/package-json'
export {
  execute
} from './services/schema/executor'
export {
  builder,
} from './services/schema/builder'
export { AppType, ISchema } from './types'
