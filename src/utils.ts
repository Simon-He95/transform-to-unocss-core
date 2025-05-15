export const flag = '.__unocss_transfer__'
export const cssMathFnRE = /^(?:calc|clamp|min|max)\s*\(.*\)/
export const numberWithUnitRE = /^-?[0-9.]+(px|rem|em|%|vw|vh|vmin|vmax|deg)$/

export function isNot(s: string) {
  return /\[&:not\(/.test(s)
}
export function isCalc(s: string) {
  return cssMathFnRE.test(s)
}

export function getFirstName(s: string) {
  return s.split('-')[0]
}

export function getLastName(s: string) {
  const all = s.split('-')
  return all[all.length - 1]
}

export function isUrl(s: string) {
  return s.startsWith('url(')
}

export function isPercent(s: string) {
  return s.endsWith('%') && !s.includes(' ')
}

export function isHex(hex: string) {
  return /^#[0-9A-F]{2,}$/i.test(hex)
}

export function isRgb(s: string) {
  return s.startsWith('rgb')
}

export function isHsl(s: string) {
  return s.startsWith('hsl')
}

export function isCubicBezier(s: string) {
  return s.startsWith('cubic-bezier')
}

export function isAttr(s: string) {
  return /^attr\(/i.test(s)
}

export function isRepeatingLinearGradient(s: string) {
  return /^repeating-linear-gradient\(/i.test(s)
}

export function isRepeatingRadialGradient(s: string) {
  return /^repeating-radial-gradient\(/i.test(s)
}

export function isConstant(s: string) {
  return /^constant\(/.test(s)
}

export function isEnv(s: string) {
  return /^env\(/.test(s)
}

export function getVal(val: string, transform?: (v: string) => string, inClass?: boolean, prefix = '') {
  let processedVal = val
  // 如果是calc，先把括号内的空格替换成_
  const _isCalc = isCalc(val)
  if (_isCalc) {
    processedVal = val.replace(/calc\(([^)]+)\)/g, (all, inner) => {
      return `calc(${inner.replace(/\s+/g, '_')})`
    })
  }
  if (
    _isCalc || isUrl(val) || isHex(val) || isRgb(val) || isHsl(val) || isPercent(val)
    || isVar(val) || isCubicBezier(val) || isConstant(val) || isAttr(val) || isEnv(val)
    || isRepeatingLinearGradient(val) || isRepeatingRadialGradient(val)
  ) {
    return inClass
      ? `-[${prefix}${trim(processedVal, 'all').replace(/['"]/g, '')}]`
      : `="[${prefix}${trim(processedVal, 'all').replace(/['"]/g, '')}]"`
  }
  return prefix
    ? `-[${prefix}${transform ? transform(val) : val}]`
    : `-${transform ? transform(val) : val}`
}

export function getHundred(n: string | number) {
  if (typeof n === 'string' && n.endsWith('%'))
    return +n.slice(0, -1)
  return +n * 100
}

export function joinWithLine(s: string) {
  return s.replace(/\s+/g, ' ').split(/\s/g).join('-')
}

export function joinWithUnderLine(s: string) {
  return s.replace(/\s+/g, ' ').split(/\s/g).join('_')
}

export const positionMap = ['top', 'right', 'bottom', 'left', 'center']

export type TrimType = 'all' | 'pre' | 'around' | 'post'

/**
 * 删除空格
 * @param { string } s 字符串
 * @param { TrimType } type 所有 ｜ 前置 ｜ 前后 ｜ 后置 'all' | 'pre' | 'around' | 'post'
 * @returns string
 */
export function trim(s: string, type: TrimType = 'around'): string {
  if (type === 'pre')
    return s.replace(/(^\s*)/g, '')
  if (type === 'post')
    return s.replace(/(\s*$)/g, '')
  if (type === 'all')
    return s.replace(/\s+/g, '')
  if (type === 'around')
    return s.replace(/(^\s*)|(\s*$)/g, '')
  return s
}

// 当 trimSpace 是 false 时, 保留 v 的空格
export function transformImportant(v: string, trimSpace = true) {
  if (trimSpace) {
    v = v.replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*\/\s*/g, '/')
  }
  if (/rgb/.test(v)) {
    v = v.replace(/rgba?\(([^)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(k, _k.map((i: string, index: number) => i.endsWith(',') ? i : i + ((_k.length - 1 === index) ? '' : ',')).join(''))
    })
  }

  if (/hsl/.test(v)) {
    v = v.replace(/hsla?\(([^)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(k, _k.map((i: string, index: number) => i.endsWith(',') ? i : i + ((_k.length - 1 === index) ? '' : ',')).join(''))
    })
  }

  if (/var\([^)]+\)/.test(v)) {
    v = v.replace(/var\(([^)]+)\)/g, (all, k) => {
      return all.replace(k, k.replace(/\s/g, '_'))
      const _k = k.trim().split(' ')
      return all.replace(k, _k.map((i: string, index: number) => i.endsWith(',') ? i : i + ((_k.length - 1 === index) ? '' : ',')).join(''))
    })
  }

  if (v.endsWith('!important'))
    return [v.replace(/\s*!important/, '').trim(), '!']
  return [v.trim(), '']
}

export function diffTemplateStyle(before: string, after: string) {
  const s1 = before.match(/<style scoped>.*<\/style>/s)!
  const s2 = after.match(/<style scoped>.*<\/style>/s)!

  return s1[0] === s2[0]
}

export function isEmptyStyle(code: string) {
  return /<style scoped>\s*<\/style>/.test(code)
}

export function getStyleScoped(code: string) {
  const match = code.match(/<style scoped>(.*)<\/style>/s)
  if (!match)
    return ''
  return match[1]
}

export function joinEmpty(str: string) {
  return str
    .replace(/\(\s*/g, '(')
    .replace(/\s*\)/g, ')')
    .replace(/\s*,\s*/g, ',')
}

export function isVar(s: string) {
  return s.startsWith('var(--')
}

export function isSize(s: string) {
  return cssMathFnRE.test(s) || numberWithUnitRE.test(s) || positionMap.includes(s)
}

export function isColor(s: string) {
  return isHex(s) || isRgb(s) || isHsl(s)
}

export const browserReg = /-webkit-|-moz-|-ms-|-o-/g
export const linearGradientReg
  = /linear-gradient\(\s*to([\w\s]+),?([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/

export const linearGradientReg1
  = /linear-gradient\(\s*([^,]*),?([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/

export const otherGradientReg
  = /(radial|conic)-gradient\(([\-\w()#%\s.]+)?,([\-\w()#%\s.]+)?,?([\-\w#%\s.]+)?\)$/
export const commaReplacer = '__comma__'

export function getGradient(s: string) {
  return s.startsWith('linear-gradient')
    ? 'linear'
    : s.startsWith('radial-gradient')
      ? 'radial'
      : s.startsWith('conic-gradient')
        ? 'conic'
        : ''
}
