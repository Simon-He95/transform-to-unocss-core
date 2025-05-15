import { transformImportant } from './utils'

const whiteMap = [
  'white-space',
]
export function white(key: string, val: string) {
  if (!whiteMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `whitespace-${value}${important}`
}
