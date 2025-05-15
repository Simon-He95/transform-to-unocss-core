import { getFirstName, getVal, transformImportant } from './utils'

const tableMap = [
  'table-layout',
]
export function table(key: string, val: string) {
  if (!tableMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  return `${getFirstName(key)}${getVal(value)}${important}`
}
