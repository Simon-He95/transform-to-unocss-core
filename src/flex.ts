import {
  getFirstName,
  getLastName,
  getVal,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const lastMaps = ['flex-basis', 'flex-grow', 'flex-shrink']
const flexMap = [
  'flex',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'flex-wrap',
  'flex-direction',
]
export function flex(key: string, val: string) {
  if (!flexMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (lastMaps.includes(key))
    return `${getLastName(key)}${getVal(value)}${important}`
  if (value === '1')
    return `flex-1${important}`
  if (/^\d+$/.test(value))
    return `flex-[${value}]${important}`
  const firstVal = value[0]
  if (key === 'flex' && (firstVal === '0' || firstVal === '1'))
    return `flex="[${joinWithUnderLine(value)}]${important}"`

  return `${getFirstName(key)}-${value.replace('column', 'col')}${important}`
}
