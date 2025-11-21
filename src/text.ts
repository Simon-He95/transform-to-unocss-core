import { getVal, transformImportant } from './utils'

const textMap = [
  'text-align',
  'text-align-last',
  'text-decoration-line',
  'text-decoration',
  'text-decoration-style',
  'text-decoration-color',
  'text-decoration-thickness',
  'text-indent',
  'text-underline-offset',
  'text-transform',
  'text-wrap',
  'text-overflow',
  'text-justify',
  'text-shadow',
]
export function text(key: string, val: string) {
  if (!textMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (key === 'text-decoration-line') {
    if (value === 'none')
      return `no-underline${important}`
    return `${value}${important}`
  }

  if (key === 'text-transform') {
    if (value === 'none')
      return `normal-case${important}`
    return `${value}${important}`
  }
  if (key === 'text-decoration') {
    return value.split(' ').map(v => v ? `${important}${v}` : '').join(' ')
  }

  if (key.startsWith('text-decoration') || key === 'text-indent')
    return `${key.split('-')[1]}${getVal(value)}${important}`

  if (key === 'text-underline-offset')
    return `underline-offset${getVal(value)}${important}`

  if (key === 'text-align-last')
    return `${important}[${key}:${value}]`

  if (['inherit', 'initial', 'revert', 'unset', 'revert-layer'].includes(value))
    return `${important}text-align-${value}`

  return `text${getVal(value)}${important}`
}
