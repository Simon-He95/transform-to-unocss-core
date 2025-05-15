import { transformImportant } from './utils'

const positionMap = [
  'position',
]
export function position(key: string, val: string) {
  if (!positionMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value === 'none')
    return `hidden${important}`
  if (value === 'hidden')
    return `invisible${important}`
  return `${value}${important}`
}
