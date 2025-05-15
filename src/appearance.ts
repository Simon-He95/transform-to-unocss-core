import { getVal, transformImportant } from './utils'

const appearanceMap = [
  'appearance',
]
export function appearance(key: string, val: string) {
  if (!appearanceMap.includes(key))
    return
  // appearance
  const [value, important] = transformImportant(val)
  return `appearance${getVal(value)}${important}`
}
