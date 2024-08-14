import {
  getVal,
  isCalc,
  isHex,
  isHsl,
  isRgb,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const borderSize = [
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
]
export function border(key: string, val: string) {
  // eslint-disable-next-line prefer-const
  let [value, important] = transformImportant(val)

  if (key === 'border-spacing')
    return `${key}="[${joinWithUnderLine(value)}]${important}"`
  if (key === 'border-color') {
    if (value.includes(' ')) {
      const len = value.split(' ').length
      const vs = value.split(' ').map(s => (isHex(s) || isRgb(s) || isHsl(s)) ? `-[${s}]` : `-${s}`)
      const [top, right, bottom, left] = vs
      switch (len) {
        case 2:
          return `border-y${top}${important} border-x${right}${important}`
        case 3:
          return `border-t${top}${important} border-b${bottom}${important} border-x${right}${important}`
        case 4:
          return `border-t${top}${important} border-b${bottom}${important} border-r${right}${important} border-l${left}${important}`
      }
    }
    return `border${getVal(value)}${important}`
  }

  if (key === 'border-radius') {
    return isCalc(value) || !value.includes(' ')
      ? `border-rd${getVal(value)}${important}`
      : `border-rd="[${joinWithUnderLine(value)}]${important}"`
  }

  if (borderSize.some(b => key.startsWith(b)))
    return value.split(' ').map(v => `border-${key.split('-')[1][0]}${getVal(v)}${important}`).join(' ')
  if (key === 'border-inline-end-width')
    return `border-e${getVal(value)}${important}`
  if (key === 'border-inline-start-width')
    return `border-s${getVal(value)}${important}`
  if (key.startsWith('border-image'))
    return ''
  // fix: https://github.com/Simon-He95/unot/issues/18
  if (key === 'border-width' && value.includes(' '))
    return value.split(' ').map((v, i) => `border-${borderSize[i].split('-')[1][0]}${getVal(v)}${important}`).join(' ')

  if (/^\d[%|(px)rem]$/.test(value) || key === 'border-collapse')
    return `border-${value}${important}`
  if (key === 'border-width' || key === 'border-style')
    return `border${getVal(value)}${important}`
  if (key === 'border-color') {
    if (value === 'currentColor')
      return `border-current${important}`
    return `border${getVal(value)}${important}`
  }

  return value.split(' ').map((v) => {
    if (value === 'currentColor')
      return `border-current${important}`
    return `border${getVal(v)}${important}`
  }).join(' ')
}
