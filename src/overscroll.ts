import { transformImportant } from './utils'

const overscrollMap = [
  'overscroll-behavior',
  'overscroll-behavior-x',
  'overscroll-behavior-y',
]
export function overscroll(key: string, val: string) {
  if (!overscrollMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  const [prefix, _, suffix] = key.split('-')
  if (suffix)
    return `${prefix}-${suffix}-${value}${important}`
  return `${prefix}-${value}${important}`
}
