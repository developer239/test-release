/* eslint-disable max-lines-per-function */
import { orderBy } from '../../helpers/array/orderBy'
import { addProperty } from '../../helpers/object/addProperty'
import { deleteProperty } from '../../helpers/object/deleteProperty'
import { ISchema, ISchemaCommand } from '../../types'
import { createFilesFromFolder } from '../files/createFromFolder'
import { updatePackageJson } from '../packageJson'
import {
  addDependencies,
  moveToDevDependencies,
  removeDependencies,
} from '../shell/dependencies'
import { execWithSpinner } from '../shell/exec'
import { execInProjectWithSpinner } from '../shell/execProject'
import { removeProjectFiles } from '../shell/files'

export const execute = async (schema: ISchema, projectFolder: string) => {
  //
  // Execute commands
  //

  const commands = orderBy<ISchemaCommand>('priority')(schema.commands)
  for (const command of commands) {
    if (command.shouldRunInProject) {
      await execInProjectWithSpinner(projectFolder)(
        command.command,
        command.successMessage
      )
    } else {
      await execWithSpinner(command.command, command.successMessage)
    }
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

  const packagePropertiesAdd = schema.packageProperties.add.filter(
    (prop) => !prop.file || prop.file === 'package.json'
  )
  await updatePackageJson(
    {
      projectFolder,
      message: '[json] cleaning package.json',
      messageSuccess: '[json] clean package.json',
    },
    (packageJson) => {
      let updatedFile = packageJson

      for (const propertyPath of schema.packageProperties.remove) {
        updatedFile = deleteProperty(packageJson, propertyPath)
      }

      for (const property of packagePropertiesAdd) {
        updatedFile = addProperty(property.path, property.value)(packageJson)
      }

      return updatedFile
    }
  )

  const tsconfigPropertiesAdd = schema.packageProperties.add.filter(
    (prop) => prop.file === 'tsconfig.json'
  )

  if (tsconfigPropertiesAdd.length) {
    await updatePackageJson(
      {
        projectFolder,
        fileName: 'tsconfig.json',
        message: '[json] cleaning tsconfig.json',
        messageSuccess: '[json] clean tsconfig.json',
      },
      (tsconfigJson) => {
        let updatedFile = tsconfigJson

        for (const property of tsconfigPropertiesAdd) {
          updatedFile = addProperty(property.path, property.value)(updatedFile)
        }

        return updatedFile
      }
    )
  }

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
    isDev: true,
  })
}
