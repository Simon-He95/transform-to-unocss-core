import { getVal, joinWithUnderLine, transformImportant } from './utils'

const rotateMap = [
  'rotate',
]
export function rotate(key: string, val: string) {
  if (!rotateMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (value.includes(' '))
    return `rotate-[${joinWithUnderLine(value)}]${important}`
  return `rotate${getVal(value)}${important}`
}
