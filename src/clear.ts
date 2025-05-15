import { transformImportant } from './utils'

const clearMap = [
  'clear',
]
export function clear(key: string, val: string) {
  if (!clearMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}-${value}${important}`
}
