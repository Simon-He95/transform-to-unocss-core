import { transformImportant } from './utils'

const displayMap = [
  'display',
]
export function display(key: string, val: string) {
  if (!displayMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value === 'none')
    return `hidden${important}`
  if (value === 'hidden')
    return `invisible${important}`
  return `${value}${important}`
}
