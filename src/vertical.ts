import { getVal, transformImportant } from './utils'

const verticalMap = [
  'vertical-align',
  'vertical-text-align',
  'vertical-text-align-last',
  'vertical-align-last',
  'vertical-justify',
  'vertical-justify-content',
  'vertical-justify-items',
  'vertical-justify-self',
]
export function vertical(key: string, val: string) {
  if (!verticalMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `v${getVal(value)}${important}`
}
