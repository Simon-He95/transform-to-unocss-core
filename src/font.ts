import { joinWithUnderLine, transformImportant } from './utils'

export function font(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'font-size')
    return `text-${value}${important}`
  if (key === 'font-weight')
    return `font-${value}${important}`
  if (key === 'font-family') {
    const match = value.match(/ui-(\w{0,4})/)!
    if (!match)
      return `font-[${joinWithUnderLine(val)}]${important}`

    const [_, family] = match
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
