import { getHundred, getVal, transformImportant } from './utils'

const percent = ['grayscale', 'invert', 'sepia']
const filterMap = [
  'filter',
  'backdrop-filter',
]
export function filter(key: string, val: string) {
  if (!filterMap.includes(key))
    return
  const [v, important] = transformImportant(val)

  const [_, name, value] = v.match(/([\w-]+)\((.*)\)/)!

  if (['contrast', 'brightness', 'saturate'].includes(name)) {
    const hundred = getHundred(value)
    if (Number.isNaN(hundred))
      return `${name}${getVal(value)}${important}`
    return `${name}-${hundred}${important}`
  }

  if (name === 'drop-shadow')
    return `drop-${dropShadow(value, important)}`
  if (percent.includes(name)) {
    if (value.endsWith('%'))
      return `${name}-${value.slice(0, -1)}${important}`
    const hundred = getHundred(value)
    if (Number.isNaN(hundred))
      return `${name}${getVal(value)}${important}`
    return `${name}-${hundred}${important}`
  }
  if (name === 'hue-rotate') {
    if (value.endsWith('deg'))
      return `${name}-${value.slice(0, -3)}${important}`
    return `${name}${getVal(value)}${important}`
  }

  return `${name}-${value}${important}`
}

function dropShadow(val: string, important = '') {
  const [value] = transformImportant(val)
  return `shadow="[${value
    .split(' ')
    .join('_')}]${important}"`
}
