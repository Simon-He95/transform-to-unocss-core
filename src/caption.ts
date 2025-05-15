import { getFirstName, getVal, transformImportant } from './utils'

const captionMap = [
  'caption-side',
]
export function caption(key: string, val: string) {
  if (!captionMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  return `${getFirstName(key)}${getVal(value)}${important}`
}
