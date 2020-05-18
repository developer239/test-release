import * as R from 'ramda'

// TODO: fix types
// @ts-ignore
export const orderBy = (property: string) => (object: any) => R.sort(R.descend(R.prop(property)), object)
