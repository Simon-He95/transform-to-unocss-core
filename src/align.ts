import { getLastName, transformImportant } from './utils'

const alignMap = [
  'align-content',
  'align-items',
  'align-self',
]
export function align(key: string, val: string) {
  if (!alignMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  // align-conten, align-items, align-self
  return `${getLastName(key)}-${value.split(' ').reverse().map(getLastName).join('-')}${important}`
}
