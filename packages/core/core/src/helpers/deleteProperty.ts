/* eslint-disable security/detect-object-injection,@typescript-eslint/no-dynamic-delete */
export const deleteProperty = (object: any, path: string[]) => {
  const last = path.pop() as string
  let currentObject = object

  for (const key of path) {
    currentObject = currentObject[key]

    if (!currentObject) {
      return
    }
  }
  delete currentObject[last]
}
