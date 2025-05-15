import { getVal, transformImportant } from './utils'

const scrollMap = [
  'scroll-snap-type',
  'scroll-snap-stop',
  'scroll-snap-align',
  'scroll-padding',
  'scroll-padding-inline',
  'scroll-padding-block',
  'scroll-padding-inline-start',
  'scroll-padding-inline-end',
  'scroll-padding-block-start',
  'scroll-padding-block-end',
  'scroll-padding-top',
  'scroll-padding-right',
  'scroll-padding-bottom',
  'scroll-padding-left',
  'scroll-margin',
  'scroll-margin-inline',
  'scroll-margin-block',
  'scroll-margin-inline-start',
  'scroll-margin-inline-end',
  'scroll-margin-block-start',
  'scroll-margin-block-end',
  'scroll-margin-top',
  'scroll-margin-right',
  'scroll-margin-bottom',
  'scroll-margin-left',
  'scroll-behavior',
]
export function scroll(key: string, val: string) {
  if (!scrollMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key.startsWith('scroll-snap')) {
    if (value.includes(' ')) {
      const [pre, after] = value.split(' ')
      return `snap-${pre}${getVal(after)}${important}`
    }
    return `snap-${value}${important}`
  }
  if (key === 'scroll-behavior')
    return `scroll-${value}${important}`
  // margin padding

  const [_, prefix, suffix, way] = key.match(
    /scroll-(margin|padding)-?(\w+)?-?(\w+)?/,
  )!
  if (suffix === 'inline' && way)
    return `scroll-${prefix[0]}${way[0]}${getVal(value)}${important}`
  if (suffix)
    return `scroll-${prefix[0]}${suffix[0]}${getVal(value)}${important}`
  return `scroll-${prefix[0]}${getVal(value)}${important}`
}
