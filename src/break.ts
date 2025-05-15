import { transformImportant } from './utils'

const breakMap = [
  'break-inside',
  'break-before',
  'break-after',
]
export function transformBreak(key: string, val: string) {
  if (!breakMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}-${value}${important}`
}
