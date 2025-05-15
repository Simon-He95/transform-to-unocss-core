import { getVal, transformImportant } from './utils'

const orderMap = [
  'order',
]
export function order(key: string, val: string) {
  if (!orderMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}${getVal(value)}${important}`
}
