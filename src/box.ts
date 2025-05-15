import { getFirstName, transformImportant } from './utils'

const boxMap = [
  'box-sizing',
  'box-decoration-break',
  'box-shadow',
]
export function box(key: string, val: string) {
  if (!boxMap.includes(key))
    return
  // box-shadow
  // box-decoration-break
  // box-sizing
  const [value, important] = transformImportant(val)

  if (key.startsWith('box-decoration-break'))
    return `box-decoration-${value}${important}`
  if (key === 'box-sizing')
    return `box-${getFirstName(value)}${important}`
  if (key === 'box-shadow') {
    return `shadow="[${value
      .split(' ')
      .join('_')}]${important}"`
  }
}
