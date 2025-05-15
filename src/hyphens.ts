import { getVal, transformImportant } from './utils'

const hyphensMap = [
  'hyphens',
]
export function hyphens(key: string, val: string) {
  if (!hyphensMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}${getVal(value)}${important}`
}
