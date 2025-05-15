import { getVal, transformImportant } from './utils'

const topMap = [
  'top',
  'right',
  'bottom',
  'left',
]
export function top(key: string, val: string) {
  if (!topMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}${getVal(value)}${important}`
}
