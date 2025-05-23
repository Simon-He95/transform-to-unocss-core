import { toUnocss } from './toUnocss'
import { transformStyleToUnocssPre } from './transformer'
import { browserReg } from './utils'

export function transformStyleToUnocss(
  styles: string,
  isRem?: boolean,
): [string, string[]] {
  // 如果存在未能被转换的style应该返回并保持部分的style
  const noTransfer: string[] = []
  const cache = new Set()
  const { newStyle, transformedResult } = transformStyleToUnocssPre(styles)
  if (transformedResult) {
    return [
      [transformedResult, newStyle.split(';')
        .filter(Boolean)
        .reduce((result, cur) => {
          const key = cur.replaceAll(browserReg, '').trim()
          if (cache.has(key))
            return result
          cache.add(key)
          const val = toUnocss(cur, isRem) || ''
          if (!val)
            noTransfer.push(cur)
          return (result += `${val} `)
        }, '')
        .trim()
        .replace(/\s+/g, ' ')].filter(Boolean).join(' '),
      noTransfer,
    ]
  }
  return [
    styles
      .split(';')
      .filter(Boolean)
      .reduce((result, cur) => {
        const key = cur.replaceAll(browserReg, '').trim()
        if (cache.has(key))
          return result
        cache.add(key)
        const val = toUnocss(key, isRem) || ''
        if (!val)
          noTransfer.push(cur)
        return (result += `${val} `)
      }, '')
      .trim()
      .replace(/\s+/g, ' '),
    noTransfer,
  ]
}
