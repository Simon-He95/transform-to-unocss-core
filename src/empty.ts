import { transformImportant } from './utils'

const emptyKey: Record<string, string> = {
  show: 'visible',
  hide: 'hidden',
}
const emptyMap = [
  'empty-cells',
]
export function empty(key: string, val: string) {
  if (!emptyMap.includes(key))
    return
  // empty-cells
  const [value, important] = transformImportant(val)

  if (emptyKey[value])
    return `table-empty-cells-${emptyKey[value]}${important}`
}
