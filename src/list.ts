import { getFirstName, getVal, transformImportant } from './utils'

const listMap = [
  'list-style',
  'list-style-type',
  'list-style-position',
  'list-style-image',
]
export function list(key: string, val: string) {
  if (!listMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key === 'list-style-image') {
    if (value === 'none') {
      return `${getFirstName(key)}-none${important}`
    }
    return `${getFirstName(key)}${getVal(value)}${important}`
  }
  return `${getFirstName(key)}${getVal(value)}${important}`
}
