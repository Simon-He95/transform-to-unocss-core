import { getHundred, getVal, transformImportant } from './utils'

const opacityMap = [
  'opacity',
]
export function opacity(key: string, val: string) {
  if (!opacityMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  const hundred = getHundred(value)
  if (Number.isNaN(hundred))
    return `${key}${getVal(value)}${important}`

  return `op-${hundred}${important}`
}
