import { transformImportant } from './utils'
import { word } from './word'

export function overflow(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'overflow-wrap')
    return word(key, val)
  return `${key}-${value}${important}`
}
