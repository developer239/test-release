import { orderBy } from '../../helpers/array/orderBy'
import { addProperty } from '../../helpers/object/addProperty'
import { deleteProperty } from '../../helpers/object/deleteProperty'
import { ISchema, ISchemaCommand } from '../../types'
import { createFilesFromFolder } from '../files/createFromFolder'
import { updatePackageJson } from '../packageJson'
import { addDependencies, moveToDevDependencies, removeDependencies } from '../shell/dependencies'
import { execWithSpinner } from '../shell/exec'
import { removeProjectFiles } from '../shell/files'

export const execute = async (
  schema: ISchema,
  projectFolder: string,
) => {
  //
  // Execute commands
  //

  const commands = orderBy<ISchemaCommand>('priority')(schema.commands)
  for (const command of commands) {
    await execWithSpinner(
      command.command,
      command.successMessage,
    )
  }

  //
  // Remove unnecessary project files
  //

  await removeProjectFiles({
    projectFolder,
    message: 'all',
    files: schema.files.remove,
    recursive: true,
  })

  //
  // Add new project files
  //

  for (const template of schema.files.add) {
    await createFilesFromFolder({
      name: template.name,
      projectFolder,
      source: template.source,
      context: template.context,
    })
  }

  //
  // Update package json
  //

  await updatePackageJson(
    {
      projectFolder,
      message: '[json] cleaning package.json',
      messageSuccess: '[json] clean package.json',
    },
    packageJson => {
      for (const propertyPath of schema.packageProperties.remove) {
        deleteProperty(packageJson, propertyPath)
      }

      for (const property of schema.packageProperties.add) {
        addProperty(property.path, property.value)(packageJson)
      }

      return packageJson
    },
  )

  //
  // Uninstall dependencies
  //

  await removeDependencies({
    projectFolder,
    libraries: schema.dependencies.remove,
  })

  //
  // Move dependencies to dev dependencies
  //

  await moveToDevDependencies({
    projectFolder,
    libraries: schema.dependencies.move.prod,
  })

  //
  // Install dependencies
  //

  await addDependencies({
    projectFolder,
    libraries: schema.dependencies.add.prod,
  })
  await addDependencies({
    projectFolder,
    libraries: schema.dependencies.add.dev,
    isDev: true
  })
}
