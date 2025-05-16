import { getFirstName, getVal, transformImportant } from './utils'

const outlineMap = [
  'outline-width',
  'outline-style',
  'outline-offset',
  'outline',
  'outline-color',
]
export function outline(key: string, val: string) {
  if (!outlineMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'outline-offset')
    return `${key}${getVal(value)}${important}`
  return `${getFirstName(key)}${getVal(value)}${important}`
}
