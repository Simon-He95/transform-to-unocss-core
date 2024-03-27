export const flag = '.__unocss_transfer__'
export const cssMathFnRE = /^(?:calc|clamp|min|max)\s*\(.*\)/
export const numberWithUnitRE = /^[0-9]+(px|rem|em|%|vw|vh|vmin|vmax|deg)$/

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
  return s.endsWith('%')
}

export function isHex(hex: string) {
  return /^#[0-9A-Fa-f]{2,}$/.test(hex)
}

export function isRgb(s: string) {
  return s.startsWith('rgb')
}

export function isHsl(s: string) {
  return s.startsWith('hsl')
}

export function getVal(val: string, transform?: Function, inClass?: boolean, prefix = '') {
  if (isCalc(val) || isUrl(val) || isHex(val) || isRgb(val) || isHsl(val) || isPercent(val) || isVar(val)) {
    return inClass
      ? `-[${prefix}${trim(val, 'all').replace(/['"]/g, '')}]`
      : `="[${prefix}${trim(val, 'all').replace(/['"]/g, '')}]"`
  }
  return prefix
    ? `-[${prefix}${transform ? transform(val) : val}]`
    : `-${transform ? transform(val) : val}`
}

export function getHundred(n: string | number) {
  if (typeof n === 'string' && n.endsWith('%'))
    return n.slice(0, -1)
  return +n * 100
}

export function joinWithLine(s: string) {
  return s.replace(/\s+/, ' ').split(' ').join('-')
}

export function joinWithUnderLine(s: string) {
  return s.replace(/\s+/, ' ').split(' ').join('_')
}

export type TrimType = 'all' | 'pre' | 'around' | 'post'

/**
 * 删除空格
 * @param { string } s 字符串
 * @param { TrimType } type 所有 ｜ 前置 ｜ 前后 ｜ 后置 'all' | 'pre' | 'around' | 'post'
 * @returns
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

export function transformImportant(v: string) {
  v = v.replace(/\s+/, ' ')
    .replace(/\s*,\s*/g, ',')
    .replace(/\s*\/\s*/, '/')
  if (/rgb/.test(v)) {
    v = v.replace(/rgba?\(([^\)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(k, _k.map((i: string, index: number) => i.endsWith(',') ? i : i + ((_k.length - 1 === index) ? '' : ',')).join(''))
    },
    )
  }

  if (/hsl/.test(v)) {
    v = v.replace(/hsla?\(([^\)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(k, _k.map((i: string, index: number) => i.endsWith(',') ? i : i + ((_k.length - 1 === index) ? '' : ',')).join(''))
    },
    )
  }

  if (/var\([^\)]+\)/.test(v)) {
    v = v.replace(/var\(([^\)]+)\)/g, (all, k) => {
      const _k = k.trim().split(' ')
      return all.replace(k, _k.map((i: string, index: number) => i.endsWith(',') ? i : i + ((_k.length - 1 === index) ? '' : ',')).join(''))
    },
    )
  }

  if (v.endsWith('!important'))
    return [v.replace(/\s*\!important/, '').trim(), '!']
  return [v.trim(), '']
}

export function diffTemplateStyle(before: string, after: string) {
  const s1 = before.match(/<style scoped>.*<\/style>/s)!
  const s2 = after.match(/<style scoped>.*<\/style>/s)!

  return s1[0] === s2[0]
}

export function isEmptyStyle(code: string) {
  return /<style scoped>[\n\s]*<\/style>/.test(code)
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
  return cssMathFnRE.test(s) || numberWithUnitRE.test(s)
}

export function isColor(s: string) {
  return isHex(s) || isRgb(s) || isHsl(s)
}
