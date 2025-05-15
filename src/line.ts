import { getVal, transformImportant } from './utils'

const lineKey: Record<string, string> = {
  1: 'none',
  1.25: 'tight',
  1.375: 'snug',
  1.5: 'normal',
  1.625: 'relaxed',
  2: 'loose',
}
const lineMap = [
  'line-height',
]
export function line(key: string, val: string) {
  if (!lineMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (value in lineKey)
    return `lh-${lineKey[value]}${important}`
  return `lh${getVal(value, v => /\d$/.test(v) ? `[${v}]` : v)}${important}`
}
