import { getVal, joinWithUnderLine, transformImportant } from './utils'

const fontMap = [
  'font',
  'font-size',
  'font-weight',
  'font-family',
  'font-style',
  'font-variant-numeric',
]
export function font(key: string, val: string) {
  if (!fontMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'font-size') {
    if (['inherit', 'initial', 'revert', 'unset', 'revert-layer'].includes(value))
      return `font-size-${value}${important}`
    return `text-${value}${important}`
  }
  if (key === 'font-weight')
    return `font${getVal(value)}${important}`
  if (key === 'font-family') {
    const match = value.match(/ui-(sans-serif|serif|monospace)/)
    if (!match)
      return `font-[${joinWithUnderLine(val)}]${important}`

    const family = match[1] === 'sans-serif'
      ? 'sans'
      : match[1] === 'monospace'
        ? 'mono'
        : 'serif'
    return `font-${family}${important}`
  }
  if (key === 'font-style') {
    if (value === 'normal')
      return `font-not-italic${important}`
    return `font-${value}${important}`
  }
  if (key === 'font-variant-numeric') {
    if (value === 'normal')
      return `normal-nums${important}`
    return `${value}${important}`
  }

  return `font="${transformFont(value)}${important}"`
}

function transformFont(v: string) {
  return v
    .split(' ')
    .map(item => (/^\d/.test(item) ? `text-${item}` : item))
    .join(' ')
}
