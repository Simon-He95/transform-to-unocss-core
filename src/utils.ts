export const flag = '.__unocss_transfer__'

export function isNot(s: string) {
  return /\[&:not\(/.test(s)
}
export function isCalc(s: string) {
  return s.startsWith('calc(')
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

export function getVal(val: string, transform?: Function, inClass?: boolean) {
  if (isCalc(val) || isUrl(val) || isHex(val) || isRgb(val) || isPercent(val) || isVar(val)) {
    return inClass
      ? `-[${trim(val, 'all').replace(/['"]/g, '')}]`
      : `="[${trim(val, 'all').replace(/['"]/g, '')}]"`
  }
  return `-${transform ? transform(val) : val}`
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
  if (/rgb/.test(v)) {
    v = v.replace(/rgb[a](\([^\)]+\))/g, (all, k) =>
      all.replace(k, trim(k, 'all')),
    )
  }

  if (/hsl/.test(v)) {
    v = v.replace(/hsl[a](\([^\)]+\))/g, (all, k) =>
      all.replace(k, trim(k, 'all')),
    )
  }

  if (/var\([^\)]+\)/.test(v)) {
    v = v.replace(/var(\([^\)]+\))/g, (all, k) =>
      all.replace(k, trim(k, 'all')))
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
