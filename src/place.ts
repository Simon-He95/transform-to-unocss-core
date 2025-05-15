import { getLastName, transformImportant } from './utils'

const placeMap = [
  'place-content',
  'place-items',
  'place-self',
]
export function place(key: string, val: string) {
  if (!placeMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value.includes(' ')) {
    // 暂不支持
    // return `${key}-${value.split(' ').reverse().map(getLastName).join('-')}${important}`
    return
  }

  return `${key}-${getLastName(value)}${important}`
}
