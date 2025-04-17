import { getVal, joinWithUnderLine, transformImportant } from './utils'

export function rotate(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (value.includes(' '))
    return `rotate-[${joinWithUnderLine(value)}]${important}`
  return `rotate${getVal(value)}${important}`
}
