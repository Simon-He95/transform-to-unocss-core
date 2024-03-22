import { getVal, transformImportant } from './utils'

const lineMap: Record<string, string> = {
  1: 'none',
  1.25: 'tight',
  1.375: 'snug',
  1.5: 'normal',
  1.625: 'relaxed',
  2: 'loose',
}
export function line(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (value in lineMap)
    return `lh-${lineMap[value]}${important}`
  return `lh${getVal(value)}${important}`
}
