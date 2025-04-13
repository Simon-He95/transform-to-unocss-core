import {
  getFirstName,
  getLastName,
  getVal,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const lastMaps = ['flex-basis', 'flex-grow', 'flex-shrink']
export function flex(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (lastMaps.includes(key))
    return `${getLastName(key)}${getVal(value)}${important}`
  if (value === '1')
    return `flex-1${important}`
  const firstVal = value[0]
  if (key === 'flex' && (firstVal === '0' || firstVal === '1'))
    return `flex="[${joinWithUnderLine(value)}]${important}"`

  return `${getFirstName(key)}-${value.replace('column', 'col')}${important}`
}
