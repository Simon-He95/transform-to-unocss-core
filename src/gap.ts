import { getVal, transformImportant } from './utils'

const gapMap = [
  'gap',
  'gap-x',
  'gap-y',
]
export function gap(key: string, val: string) {
  if (!gapMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key.startsWith('column'))
    return `gap-x${getVal(value)}${important}`
  if (key.startsWith('row'))
    return `gap-y${getVal(value)}${important}`
  return `gap${getVal(value)}${important}`
}
