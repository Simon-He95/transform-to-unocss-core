import { getLastName, transformImportant } from './utils'

const justifyMap = [
  'justify',
  'justify-content',
  'justify-items',
  'justify-self',
]
export function justify(key: string, val: string) {
  if (!justifyMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value.includes(' ')) {
    // 目前还不支持
    // return `${key}-${value.split(' ').reverse().map(getLastName).join('-')}${important}`
    return
  }
  if (key === 'justify-content')
    return `justify-${getLastName(value)}${important}`
  return `${key}-${getLastName(value)}${important}`
}
