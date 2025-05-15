import { getFirstName, getVal, transformImportant } from './utils'

const strokeMap = [
  'stroke',
  'stroke-width',
]
export function stroke(key: string, val: string) {
  if (!strokeMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  return `${getFirstName(key)}${getVal(value)}${important}`
}
