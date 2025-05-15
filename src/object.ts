import { getFirstName, getVal, isVar, joinWithLine, transformImportant } from './utils'

const objectMap = [
  'object-fit',
  'object-position',
]
export function object(key: string, val: string) {
  if (!objectMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'object-position') {
    if (isVar(value))
      return `${getFirstName(key)}${getVal(value)}${important}`
    return `${getFirstName(key)}-${joinWithLine(value)}${important}`
  }
  return `${getFirstName(key)}-${value}${important}`
}
