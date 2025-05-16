import { getFirstName, getVal, isCalc, isVar, transformImportant } from './utils'

const sizeMap = [
  'z-index',
  'width',
  'height',
]
export function size(key: string, val: string) {
  if (!sizeMap.includes(key))
    return
  let [value, important] = transformImportant(val)
  let prefix = ''
  if (value.startsWith('-')) {
    prefix = '-'
    value = value.slice(1)
  }
  if (isCalc(value) || isVar(value) || /\d/.test(value))
    return `${prefix}${key[0]}${getVal(value)}${important}`
  return `${key[0]}-${getFirstName(value)}${important}`
}
