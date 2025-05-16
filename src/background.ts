import { commaReplacer, getVal, isRgb, isSize, isVar, joinWithLine, joinWithUnderLine, linearGradientReg, linearGradientReg1, otherGradientReg, transformImportant } from './utils'

const backgroundMap = [
  'background',
  'background-attachment',
  'background-blend-mode',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-repeat',
  'background-size',
]

const lengthRe = '\\d*\\.?\\d+(?:px|em|rem|%|vw|vh)?'
const positionPair = `(${lengthRe})\\s+(${lengthRe})`
const optimizedReg = new RegExp(`${positionPair}\\s*,\\s*${positionPair}`)
export function background(key: string, val: string): string | undefined {
  if (!backgroundMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'background-size')
    return `bg${getVal(value, /\d/.test(value) ? joinWithUnderLine : joinWithLine, false, 'length:')}${important}`

  if ([
    'background-color',
    'background-attachment',
  ].includes(key)) {
    return `bg${getVal(value, joinWithLine)}${important}`
  }
  if (key === 'background-position') {
    if (/\d/.test(value))
      return `bg${getVal(value, joinWithUnderLine, false, 'position:')}${important}`
    return `bg${getVal(value, joinWithLine)}${important}`
  }

  if (['background', 'background-image'].includes(key)) {
    if (isSize(value))
      return `bg${getVal(value, joinWithUnderLine, false, 'position:')}${important}`

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
      if (!matcher1) {
        // 直接使用-[处理]
        return `bg="[${matchMultipleBgAttrs(value)}]"`
      }

      return `bg-gradient-linear bg-gradient-[${matcher1[1]}${matcher1[2] ? `,${matcher1[2].replace(/\s+/, '_').replaceAll(commaReplacer, ',')}` : ''},${matcher1[3].replace(/\s+/, '_').replaceAll(commaReplacer, ',')}]`
    }
    else if (/^(?:radial|conic)-gradient/.test(value)) {
      // 区分rgba中的,和linear-gradient中的,
      const newValue = value.replace(/rgba?\(([^)]+)\)/g, (all, v) =>
        all.replace(v, v.replace(/\s*,\s*/g, commaReplacer)))

      const matcher = newValue.match(otherGradientReg)
      if (!matcher)
        return `${important}[${key}:${joinWithUnderLine(value)}]`

      const name = matcher[1]
      // eslint-ignore @typescript-eslint/no-non-null-assertion
      const [from, via, to] = matcher.slice(2)

      return `bg-gradient-${name}${getLinearGradientPosition(from, via, to)}${important}`
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

    const safeValueMap = new Map()
    // 先替换 url(...) 和 rgba(...),避免误 split
    let i = 0
    const safeValue = value
      .replace(/url\([^)]+\)/g, (m) => {
        const key = `__URL__${i++}`
        safeValueMap.set(key, m)
        return key
      })
      .replace(/rgba?\([^)]+\)/g, (m) => {
        const key = `__RGBA__${i++}`
        safeValueMap.set(key, m)
        return key
      })

    // 检查 position/size 语法
    if (safeValue.includes('/')) {
      // 用 safeValue 分割,避免 url/rgba 中的 /
      const [positionRawSafe, afterSlashRawSafe] = safeValue.split('/').map(v => v.trim())
      // 还原原始 value 的对应部分
      // 用 safeValue 分割后再用原始 afterSlashRaw 处理
      const afterSlashPartsSafe = afterSlashRawSafe.split(/\s+/)
      const sizeParts = afterSlashPartsSafe.slice(0, 2)
      const others = afterSlashPartsSafe.slice(2).map((v) => {
        const m = v.match(/__URL__(\d+)/)
        if (m) {
          return safeValueMap.get(`__URL__${m[1]}`)
        }
        const m1 = v.match(/__RGBA__(\d+)/)
        if (m1) {
          return safeValueMap.get(`__RGBA__${m1[1]}`)
        }
        return v
      })
      const size = sizeParts.join(' ')
      const posStr = background('background-position', `${positionRawSafe}${important ? ' !important' : ''}`)
      const sizeStr = size ? background('background-size', `${size}${important ? ' !important' : ''}`) : ''
      let othersStr = ''
      if (others.length) {
        othersStr = others.map(v => background(key, `${v}${important ? ' !important' : ''}`)).join(' ')
      }
      return [posStr, sizeStr, othersStr].filter(Boolean).join(' ')
    }
    // 检查空格分隔()同样用 safeValue 判断)
    else if (safeValue.includes(' ')) {
      // 先按逗号分割多背景
      const m = safeValue.match(optimizedReg)
      if (m) {
        // 前面都被处理为 position
        const others = safeValue.replace(m[0], '').trim().split(' ').map((v) => {
          const m = v.match(/__URL__(\d+)/)
          if (m) {
            return safeValueMap.get(`__URL__${m[1]}`)
          }
          const m1 = v.match(/__RGBA__(\d+)/)
          if (m1) {
            return safeValueMap.get(`__RGBA__${m1[1]}`)
          }
          return v
        })
        let othersStr = ''
        if (others.length) {
          othersStr = others.map(v => background(key, `${v}${important ? ' !important' : ''}`)).join(' ')
        }
        const posStr: string | undefined = background('background-position', `${m[0]}${important ? ' !important' : ''}`)

        return [posStr, othersStr].filter(Boolean).join(' ')
      }
      // 处理 rgba(...) 和 url(...),避免误 split
      const parts = safeValue.split(/\s+/).map((v) => {
        const m = v.match(/__URL__(\d+)/)
        if (m) {
          return safeValueMap.get(`__URL__${m[1]}`)
        }
        const m1 = v.match(/__RGBA__(\d+)/)
        if (m1) {
          return safeValueMap.get(`__RGBA__${m1[1]}`)
        }
        return v
      })
      let r: string = parts.map(v => background(key, `${v}${important ? ' !important' : ''}`)).join(' ')
      // 如果 r 中包含多个bg-[position:xx], 需要合并用_分隔
      const bgPositionReg = /bg-\[position:([^\]]*)\]/g
      const bgPosition = r.match(bgPositionReg)
      if (bgPosition && bgPosition.length > 1) {
        const t = `bg-[position:${bgPosition.map(item => item.replace(bgPositionReg, '$1')).join('_')}]`
        r = `${r.replace(bgPositionReg, '').replace(/\s+/g, ' ').split(' ').filter(Boolean).concat([t]).join(' ')}`
      }

      return r
    }
    return `bg${getVal(value, joinWithLine)}${important}`
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
  return joinWithLine(s)
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
      result += ` from="${isRgb(fromColor) || isVar(fromColor) ? `[${fromColor}]` : fromColor
      } ${fromPosition}"`
    }
    else if (fromColor) {
      result += ` from="${isRgb(fromColor) || isVar(fromColor) ? `[${fromColor}]` : fromColor}"`
    }
  }

  if (via) {
    via = via.replaceAll(commaReplacer, ',')
    const [viaColor, viaPosition] = via
      .split(' ')
    if (viaPosition) {
      result += ` via="${isRgb(viaColor) || isVar(viaColor) ? `[${viaColor}]` : viaColor
      } ${viaPosition}"`
    }
    else if (viaColor) {
      result += ` via="${isRgb(viaColor) || isVar(viaColor) ? `[${viaColor}]` : viaColor}"`
    }
  }

  if (to) {
    to = to.replaceAll(commaReplacer, ',')
    const [toColor, toPosition] = to
      .split(' ')
    if (toPosition) {
      result += ` to="${isRgb(toColor) || isVar(toColor) ? `[${toColor}]` : toColor
      } ${toPosition}"`
    }
    else if (toColor) {
      result += ` to="${isRgb(toColor) || isVar(toColor) ? `[${toColor}]` : toColor}"`
    }
  }
  return result
}

const CONSTANTFLAG = '__transform_to_unocss__'

function matchMultipleBgAttrs(value: string) {
  const map: any = {}
  let i = 0
  value = value.replace(/(rgba?|hsla?|lab|lch|hwb|color)\(\)*\)/g, (_) => {
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
