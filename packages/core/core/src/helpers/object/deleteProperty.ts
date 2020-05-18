export type IObject = any

export const deleteProperty = (object: IObject, path: string[]) => {
  let currentObject = object
  const last = path.pop() as string

  for (const key of path) {
    currentObject = currentObject[key]

    if (!currentObject) {
      return
    }
  }

  delete currentObject[last]

  return currentObject
}
