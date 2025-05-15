import { getVal, joinWithLine, transformImportant } from './utils'

const perspectiveMap = [
  'perspective',
  'perspective-origin',
]
export function perspective(key: string, val: string) {
  if (!perspectiveMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}${getVal(value, joinWithLine)}${important}`
}
