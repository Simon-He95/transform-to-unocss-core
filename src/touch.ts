import { getFirstName, getVal, transformImportant } from './utils'

const touchMap = [
  'touch-action',
]
export function touch(key: string, val: string) {
  if (!touchMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  return `${getFirstName(key)}${getVal(value)}${important}`
}
