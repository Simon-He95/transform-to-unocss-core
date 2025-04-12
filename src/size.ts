import { getFirstName, getVal, transformImportant } from './utils'

export function size(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (value.startsWith('-')) {
    return `-${key[0]}${getVal(value.slice(1), getFirstName)}${important}`
  }
  return `${key[0]}${getVal(value, getFirstName)}${important}`
}
