import { getLastName, getVal, transformImportant } from './utils'

const wordMap = [
  'word-break',
  'word-spacing',
  'word-wrap',
  'overflow-wrap',
]
export function word(key: string, val: string) {
  if (!wordMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key.startsWith('word-spacing'))
    return `word-spacing${getVal(val)}${important}`
  if (value === 'keep-all')
    return `break-keep${important}`
  if (value === 'break-word')
    return `break-words${important}`
  return `break-${getLastName(value)}${important}`
}
