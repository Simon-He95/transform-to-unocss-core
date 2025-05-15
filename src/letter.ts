import { getVal, transformImportant } from './utils'

const letterMap = [
  'letter-spacing',
]
export function letter(key: string, val: string) {
  if (!letterMap.includes(key))
    return
  // letter-spacing
  const [value, important] = transformImportant(val)

  return `tracking${getVal(value)}${important}`
}
