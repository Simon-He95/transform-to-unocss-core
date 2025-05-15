import { getFirstName, getVal, transformImportant } from './utils'

const caretMap = [
  'caret-color',
]
export function caret(key: string, val: string) {
  if (!caretMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  return `${getFirstName(key)}${getVal(value)}${important}`
}
