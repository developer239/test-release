import { deepMerge } from '../../helpers/deepMerge'
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

  const addDevDependencies = (dependencies: string[]) => {
    schema.dependencies.add.dev = [
      ...schema.dependencies.add.dev,
      ...dependencies
    ]
  }

  const addProperty = (property: ISchemaAddProperty) =>
    schema.packageProperties.add.push(property)

  const addScript = (key: string, value: string) =>
    addProperty({
      path: ['scripts', key],
      value
    })

  const combineSchema = (newSchema: ISchema) => {
    schema = deepMerge(schema, newSchema)
  }

  const addFile = (file: ISchemaAddFile) =>
    schema.files.add.push(file)

  const toJson = (): ISchema =>
    schema

  return {
    addDevDependencies,
    addScript,
    addProperty,
    combineSchema,
    addFile,
    toJson,
  }
}
