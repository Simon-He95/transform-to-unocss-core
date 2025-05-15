import { transformImportant } from './utils'
import { word } from './word'

const overflowMap = [
  'overflow',
  'overflow-x',
  'overflow-y',
  'overflow-wrap',
]
export function overflow(key: string, val: string) {
  if (!overflowMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key === 'overflow-wrap')
    return word(key, val)
  return `${key}-${value}${important}`
}
