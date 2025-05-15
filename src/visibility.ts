import { transformImportant } from './utils'

const visibilityMap = [
  'visibility',
]
export function visibility(key: string, val: string) {
  if (!visibilityMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value === 'none')
    return `hidden${important}`
  if (value === 'hidden')
    return `invisible${important}`
  return `${value}${important}`
}
