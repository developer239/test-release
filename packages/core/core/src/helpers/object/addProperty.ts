import * as R from 'ramda'

export const addProperty = (path: string[], value: any) => (packageJson: any) => R.assocPath(path, value)(packageJson)
