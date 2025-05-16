import {
  getVal,
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

const widthMatchMap: Record<string, string> = {
  'inline': 'x',
  'block': 'y',
  'inline-start': 's',
  'inline-end': 'e',
  'top': 't',
  'right': 'r',
  'bottom': 'b',
  'left': 'l',
}
const radiusMatchMap: Record<string, string> = {
  top: 't',
  right: 'r',
  bottom: 'b',
  left: 'l',
  end: 'e',
  start: 's',
}

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

  const radiusMatch = key.match(/border(-start|-end|-top|-bottom)?(-start|-end|-left|-right)?-radius/)
  if (radiusMatch) {
    const [_, start, end] = radiusMatch
    if (start && end) {
      return `${important}rounded-${radiusMatchMap[start.slice(1)]}${radiusMatchMap[end.slice(1)]}${getVal(value, joinWithUnderLine)}`
    }
    if (start || end) {
      return `${important}rounded-${radiusMatchMap[start?.slice(1) || end?.slice(1)]}${getVal(value, joinWithUnderLine)}`
    }
    return `${important}rounded${getVal(value, joinWithUnderLine, false, '', true)}`
  }

  const widthMatch = key.match(/border(-inline|-block|-inline-start|-inline-end|-top|-right|-bottom|-left)?-(width|color)/)
  if (widthMatch) {
    if (widthMatch[1]) {
      const widthType = widthMatchMap[widthMatch[1].slice(1)]
      return `${important}border-${widthType}${getVal(value, joinWithUnderLine, false, 'length:')}`
    }
    return `${important}border${getVal(value, joinWithUnderLine, false, 'length:')}`
  }

  if (borderSize.some(b => key.startsWith(b))) {
    const keys = key.split('-')
    if (keys.slice(-1)[0] === 'radius')
      return value.split(' ').map(v => `border-rd-${keys.slice(1, -1).map(s => s[0]).join('')}${getVal(v)}${important}`).join(' ')

    return value.split(' ').map(v => `border-${key.split('-')[1][0]}${getVal(v)}${important}`).join(' ')
  }

  if (key.startsWith('border-image'))
    return ''
  // fix: https://github.com/Simon-He95/unot/issues/18
  if (key === 'border-width' && value.includes(' '))
    return value.split(' ').map((v, i) => `border-${borderSize[i].split('-')[1][0]}${getVal(v)}${important}`).join(' ')

  if (/^\d[%|(px)rem]$/.test(value) || key === 'border-collapse')
    return `border-${value}${important}`
  if (key === 'border-width')
    return `border${getVal(value)}${important}`
  if (key === 'border-color') {
    if (value === 'currentColor')
      return `border-current${important}`
    return `border${getVal(value)}${important}`
  }

  if (key === 'border-style') {
    const styles = value.split(' ')
    if (styles.length === 4) {
      return `border-t-${styles[0]} border-r-${styles[1]} border-b-${styles[2]} border-l-${styles[3]}`
    }
    if (styles.length === 3) {
      return `border-t-${styles[0]} border-x-${styles[1]} border-b-${styles[2]}`
    }
    if (styles.length === 2) {
      return `border-y-${styles[0]} border-x-${styles[1]}`
    }
    return `border${getVal(value)}${important}`
  }

  return value.split(' ').map((v) => {
    if (value === 'currentColor')
      return `border-current${important}`
    return `border${getVal(v)}${important}`
  }).join(' ')
}
