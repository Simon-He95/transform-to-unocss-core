import { getFirstName, getVal, transformImportant } from './utils'

const backfaceMap = [
  'backface-visibility',
]
export function backface(key: string, val: string) {
  if (!backfaceMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  return `${getFirstName(key)}${getVal(value)}${important}`
}
