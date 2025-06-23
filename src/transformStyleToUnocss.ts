import { toUnocss } from './toUnocss'
import { transformStyleToUnocssPre } from './transformer'
import { browserReg } from './utils'

export function transformStyleToUnocss(
  styles: string,
  isRem?: boolean,
  debug?: boolean,
): [string, string[]] {
  if (debug) {
    console.log('🚀 [transformStyleToUnocss] Input styles:', styles)
    console.log('🚀 [transformStyleToUnocss] isRem:', isRem)
  }

  // 如果存在未能被转换的style应该返回并保持部分的style
  const noTransfer: string[] = []
  const cache = new Set()
  const { newStyle, transformedResult } = transformStyleToUnocssPre(styles)

  if (debug) {
    console.log('🔄 [transformStyleToUnocss] Pre-transformed:', { newStyle, transformedResult })
  }
  if (transformedResult) {
    const result = [transformedResult, newStyle.split(';')
      .filter(Boolean)
      .reduce((result, cur) => {
        const key = cur.replaceAll(browserReg, '').trim()

        if (debug) {
          console.log('🔍 [transformStyleToUnocss] Processing style:', cur, '-> key:', key)
        }

        if (cache.has(key)) {
          if (debug) {
            console.log('⏭️  [transformStyleToUnocss] Skipping cached key:', key)
          }
          return result
        }

        cache.add(key)
        const val = toUnocss(cur, isRem) || ''

        if (debug) {
          console.log('🎯 [transformStyleToUnocss] Converted:', cur, '->', val || 'FAILED')
        }

        if (!val) {
          noTransfer.push(cur)
          if (debug) {
            console.log('❌ [transformStyleToUnocss] Failed to convert:', cur)
          }
        }
        return (result += `${val} `)
      }, '')
      .trim()
      .replace(/\s+/g, ' ')].filter(Boolean).join(' ')

    if (debug) {
      console.log('✅ [transformStyleToUnocss] Final result (with pre-transform):', result)
      console.log('❌ [transformStyleToUnocss] Failed conversions:', noTransfer)
    }

    return [result, noTransfer]
  }
  const result = styles
    .split(';')
    .filter(Boolean)
    .reduce((result, cur) => {
      const key = cur.replaceAll(browserReg, '').trim()

      if (debug) {
        console.log('🔍 [transformStyleToUnocss] Processing style (no pre-transform):', cur, '-> key:', key)
      }

      if (cache.has(key)) {
        if (debug) {
          console.log('⏭️  [transformStyleToUnocss] Skipping cached key:', key)
        }
        return result
      }

      cache.add(key)
      const val = toUnocss(key, isRem) || ''

      if (debug) {
        console.log('🎯 [transformStyleToUnocss] Converted:', key, '->', val || 'FAILED')
      }

      if (!val) {
        noTransfer.push(cur)
        if (debug) {
          console.log('❌ [transformStyleToUnocss] Failed to convert:', cur)
        }
      }
      return (result += `${val} `)
    }, '')
    .trim()
    .replace(/\s+/g, ' ')

  if (debug) {
    console.log('✅ [transformStyleToUnocss] Final result (no pre-transform):', result)
    console.log('❌ [transformStyleToUnocss] Failed conversions:', noTransfer)
  }

  return [result, noTransfer]
}
