import { getVal, transformImportant } from './utils'

const rowMap = [
  'row-gap',
]
export function row(key: string, val: string) {
  if (!rowMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `gap-y${getVal(value)}${important}`
}
