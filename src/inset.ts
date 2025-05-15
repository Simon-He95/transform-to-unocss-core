import { getVal, transformImportant } from './utils'

const insetMap = [
  'inset-inline-start',
  'inset-inline-end',
]
export function inset(key: string, val: string) {
  if (!insetMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key === 'inset-inline-start')
    return `start${getVal(value)}${important}`
  if (key === 'inset-inline-end')
    return `end${getVal(value)}${important}`
}
