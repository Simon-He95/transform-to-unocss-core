import { getVal, isRgb, isSize, transformImportant } from './utils'

const backgroundMap = [
  'background-color',
  'background-attachment',
  'background-position',
]
const linearGradientReg
  = /linear-gradient\(\s*to([\w\s]+),?([\w()#%\s.]+)?,([\w()#%\s.]+)?,?([\w#%\s.]+)?\)$/

const linearGradientReg1
  = /linear-gradient\(\s*([^,]*),?([\w()#%\s.]+)?,([\w()#%\s.]+)?,?([\w#%\s.]+)?\)$/

const otherGradientReg
  = /(radial|conic)-gradient\(([\w()#%\s.]+)?,([\w()#%\s.]+)?,?([\w#%\s.]+)?\)$/
const commaReplacer = '__comma__'

export function background(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (key === 'background-size')
    return `bg${getVal(value, transformSpaceToLine, false, 'length:')}${important}`

  if (backgroundMap.includes(key))
    return `bg${getVal(value, transformSpaceToLine)}${important}`

  if (['background', 'background-image'].includes(key)) {
    if (isSize(value))
      return `bg${getVal(value, transformSpaceToLine, false, 'position:')}${important}`

    const temp = value.replace(/rgba?\([^)]+\)/g, 'temp')
    if (/\)\s*,/.test(temp))
      return `bg="[${matchMultipleBgAttrs(value)}]"`
    if (value.startsWith('linear-gradient')) {
      // 区分rgba中的,和linear-gradient中的
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) =>
        all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)))

      const matcher = newValue.match(linearGradientReg)
      if (matcher) {
        let [direction, from, via, to] = matcher.slice(1)

        direction = direction
          .split(' ')
          .map(item => item[0])
          .join('')

        return direction
          ? `bg-gradient-to-${direction}${getLinearGradientPosition(
            from,
            via,
            to,
          )}`
          : getLinearGradientPosition(from, via, to)
      }
      const matcher1 = newValue.match(linearGradientReg1)
      if (!matcher1)
        return

      return `bg-gradient-linear bg-gradient-[${matcher1[1]},${matcher1[2].replace(/\s+/, '_').replaceAll(commaReplacer, ',')},${matcher1[3].replace(/\s+/, '_').replaceAll(commaReplacer, ',')}]`
    }
    else if (/^(?:radial|conic)-gradient/.test(value)) {
      // 区分rgba中的,和linear-gradient中的,
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) =>
        all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)))

      const matcher = newValue.match(otherGradientReg)
      if (!matcher)
        return

      const name = matcher[1]
      // eslint-ignore @typescript-eslint/no-non-null-assertion
      const [from, via, to] = matcher.slice(2)

      return `bg-gradient-${name}${getLinearGradientPosition(from, via, to)}`
    }
    const match = value.match(/^rgba?\([^)]+\)$/)
    if (match) {
      const rgb = match[0]
      return `bg="${value.replace(rgb, `[${rgb}]`)}${important}"`
    }
    const urlMatch = value.match(/^url\(["'\s.\-\w/@]*\)$/)
    if (urlMatch) {
      return `bg="${value.replace(
        urlMatch[0],
        `[${urlMatch[0].replace(/['"]/g, '')}]${important}`,
      )}"`
    }
    if (value.includes(' ')) {
      let r: string = value.split(' ').map(v => background(key, `${v}${important ? ' !important' : ''}`)).join(' ')
      // 如果 r 中包含多个bg-[position:xx], 需要合并用_分隔
      const bgPositionReg = /bg-\[position:([^\]]*)\]/g
      const bgPosition = r.match(bgPositionReg)
      if (bgPosition && bgPosition.length > 1) {
        const t = `bg-[position:${bgPosition.map(item => item.replace(bgPositionReg, '$1')).join('_')}]`
        r = `${r.replace(bgPositionReg, '').replace(/\s+/g, ' ').split(' ').filter(Boolean).concat([t]).join(' ')}`
      }

      return r
    }
    return `bg${getVal(value, transformSpaceToLine)}${important}`
  }

  if (key === 'background-blend-mode')
    return `bg-blend-${value}${important}`

  return `${replaceBackground(key, value)}-${transformBox(value)}${important}`
}

function replaceBackground(s: string, val: string) {
  if (val.endsWith('repeat'))
    return 'bg'
  return s.replace('background', 'bg')
}

function transformBox(s: string) {
  const reg = /border|content|padding-box/
  if (reg.test(s))
    return s.replace('-box', '')
  if (s.startsWith('repeat-'))
    return s.replace('repeat-', '')
  return transformSpaceToLine(s)
}

function transformSpaceToLine(s: string) {
  return s.replace(/\s+/, ' ').replace(' ', '-')
}

function getLinearGradientPosition(from: string, via: string, to: string) {
  let result = ''
  if (via && !to) {
    to = via
    via = ''
  }
  if (from) {
    from = from.replaceAll(commaReplacer, ',')
    const [fromColor, fromPosition] = from
      .split(' ')
    if (fromPosition) {
      result += ` from="${isRgb(fromColor) ? `[${fromColor}]` : fromColor
      } ${fromPosition}"`
    }
    else if (fromColor) {
      result += ` from="${isRgb(fromColor) ? `[${fromColor}]` : fromColor}"`
    }
  }

  if (via) {
    via = via.replaceAll(commaReplacer, ',')
    const [viaColor, viaPosition] = via
      .split(' ')
    if (viaPosition) {
      result += ` via="${isRgb(viaColor) ? `[${viaColor}]` : viaColor
      } ${viaPosition}"`
    }
    else if (viaColor) {
      result += ` via="${isRgb(viaColor) ? `[${viaColor}]` : viaColor}"`
    }
  }

  if (to) {
    to = to.replaceAll(commaReplacer, ',')
    const [toColor, toPosition] = to
      .split(' ')
    if (toPosition) {
      result += ` to="${isRgb(toColor) ? `[${toColor}]` : toColor
      } ${toPosition}"`
    }
    else if (toColor) {
      result += ` to="${isRgb(toColor) ? `[${toColor}]` : toColor}"`
    }
  }
  return result
}

const CONSTANTFLAG = '__transform_to_unocss__'

function matchMultipleBgAttrs(value: string) {
  const map: any = {}
  let i = 0
  value = value.replace(/(rgba?|hsla?|lab|lch|hwb|color)\(\)*\)/, (_) => {
    map[i++] = _
    return `${CONSTANTFLAG}${i}}`
  })
  value = value.split(/\)\s*,/).map(item =>
    `${item.replace(/\s*,\s*/g, ',').replace(/\s+/g, '_')}`,
  ).join('),')
  Object.keys(map).forEach((key) => {
    value = value.replace(`${CONSTANTFLAG}${key}}`, map[key])
  })
  return value
}
