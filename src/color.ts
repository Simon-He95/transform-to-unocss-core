import { getVal, transformImportant } from './utils'

const colorMap = [
  'color',
]
export function color(key: string, val: string) {
  if (!colorMap.includes(key))
    return
  // color
  const [value, important] = transformImportant(val)

  return `text${getVal(value)}${important}`
}
