import { getFirstName, getVal, transformImportant } from './utils'

const sizeMap = [
  'z-index',
  'width',
  'height',
]
export function size(key: string, val: string) {
  if (!sizeMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (value.startsWith('-')) {
    return `-${key[0]}${getVal(value.slice(1), getFirstName)}${important}`
  }
  return `${key[0]}${getVal(value, getFirstName)}${important}`
}
