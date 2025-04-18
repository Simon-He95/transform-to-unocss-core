import { getLastName, getVal, transformImportant } from './utils'

export function word(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key.startsWith('word-spacing'))
    return `word-spacing${getVal(val)}`
  if (value === 'keep-all')
    return `break-keep${important}`
  if (value === 'break-word')
    return `break-words${important}`
  return `break-${getLastName(value)}${important}`
}
