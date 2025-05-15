import { transformImportant } from './utils'

const map: any = {
  vertical: 'y',
  horizontal: 'x',
}
const resizeMap = [
  'resize',
]
export function resize(key: string, val: string) {
  if (!resizeMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value === 'both')
    return `${key}${important}`
  return `${key}-${map[value] || value}${important}`
}
