import { transformImportant } from './utils'

const fillMap = [
  'fill',
]
export function fill(key: string, val: string) {
  if (!fillMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}-${value}${important}`
}
