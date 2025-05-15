import { getVal, transformImportant } from './utils'

const cursorMap = [
  'cursor',
]
export function cursor(key: string, val: string) {
  if (!cursorMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}${getVal(value)}${important}`
}
