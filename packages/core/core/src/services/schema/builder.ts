import { deepMerge } from '../../helpers/object/deepMerge'
import { ISchemaAddFile, ISchema, ISchemaAddProperty } from '../../types'

export const builder = (name: string) => {
  let schema = {
    name,
    commands: [],
    files: {
      add: [],
      remove: [],
    },
    packageProperties: {
      add: [],
      remove: [],
    },
    dependencies: {
      add: {
        prod: [],
        dev: [],
      },
      move: {
        prod: [],
      },
      remove: [],
    },
  } as ISchema

  const addDependencies = (dependencies: string[]) => {
    schema.dependencies.add.prod = [
      ...schema.dependencies.add.prod,
      ...dependencies,
    ]
  }

  const addDevDependencies = (dependencies: string[]) => {
    schema.dependencies.add.dev = [
      ...schema.dependencies.add.dev,
      ...dependencies,
    ]
  }

  const moveDependencies = (dependencies: string[]) => {
    schema.dependencies.move.prod = [
      ...schema.dependencies.move.prod,
      ...dependencies,
    ]
  }

  const addPackageJsonProperty = (property: ISchemaAddProperty) =>
    schema.packageProperties.add.push(property)

  const removePackageJsonProperty = (pathToProperty: string[]) =>
    schema.packageProperties.remove.push(pathToProperty)

  const addScript = (key: string, value: string) =>
    addPackageJsonProperty({
      path: ['scripts', key],
      value,
    })

  const removeScript = (key: string) =>
    removePackageJsonProperty(['scripts', key])

  const addFolder = (file: ISchemaAddFile) => schema.files.add.push(file)

  const combineSchema = (newSchema: ISchema) => {
    schema = deepMerge(schema, newSchema)
  }

  const toJson = (): ISchema => schema

  return {
    addDependencies,
    addDevDependencies,
    moveDependencies,
    addScript,
    removeScript,
    addPackageJsonProperty,
    removePackageJsonProperty,
    combineSchema,
    addFolder,
    toJson,
  }
}
