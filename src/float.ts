import { getLastName, transformImportant } from './utils'

const floatMap = [
  'float',
]
export function float(key: string, val: string) {
  if (!floatMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}-${getLastName(value)}${important}`
}
