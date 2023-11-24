import { getFirstName, transformImportant } from './utils'
export function box(key: string, val: string) {
  // eslint-disable-next-line prefer-const
  let [value, important] = transformImportant(val)

  if (key.startsWith('box-decoration'))
    return `box-decoration-${value}${important}`
  if (key === 'box-sizing')
    return `box-${getFirstName(value)}${important}`

  return `shadow="[${value
    .split(' ')
    .join('_')}]${important}"`
}
