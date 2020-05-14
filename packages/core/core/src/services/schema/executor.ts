/* eslint-disable no-await-in-loop */
import * as R from 'ramda'
import { deleteProperty } from '../../helpers/deleteProperty'
import { ISchema } from '../../types'
import { addDependencies, moveToDevDependencies, removeDependencies, removeFiles } from '../exec'
import { generateTemplate } from '../generator/generate'
import { updatePackageJson } from '../package-json'
import { shell } from '../shell'

export const execute = async (
  schema: ISchema,
  projectFolder: string,
) => {
  //
  // Execute commands
  //

  const commands = R.sort(R.descend(R.prop('priority')), schema.commands)
  for (const command of commands) {
    await shell.execWithSpinner(
      command.command,
      command.successMessage,
    )
  }

  //
  // Remove unnecessary project files
  //

  await removeFiles({
    projectFolder,
    message: 'all',
    files: schema.files.remove,
    recursive: true,
  })

  //
  // Add new project files
  //

  for (const template of schema.files.add) {
    await generateTemplate({
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
        R.assocPath(property.path, property.value)(packageJson)
      }

      return packageJson
    },
  )

  //
  // Uninstall dependencies
  //

  await removeDependencies({
    name: 'all',
    projectFolder,
    libraries: schema.dependencies.remove,
  })

  //
  // Move dependencies to dev dependencies
  //

  await moveToDevDependencies({
    name: 'all',
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
