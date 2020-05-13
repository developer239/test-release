/* eslint-disable security/detect-object-injection, guard-for-in */
export interface IItem {
  [key: string]: string | string[] | object
}

export const deepMerge = (target: IItem, ...sources: IItem[]): any => {
  for (const source of sources) {
    for (const key in source) {
      const valueSource = source[key]
      const valueTarget = target[key]

      if (Array.isArray(valueSource) && Array.isArray(valueTarget)) {
        target[key] = [...valueSource, ...valueTarget]
        continue
      }

      if (Object(valueSource) === valueSource && Object(valueTarget) === valueTarget) {
        target[key] = deepMerge(Object(valueSource), Object(valueTarget))
        continue
      }

      target[key] = source[key]
    }
  }
  return target
}
