import { transformStyleToUnocss } from './transformStyleToUnocss'

export function toUnocssClass(css: string, isRem = false): [string, string[]] {
  const [transferred, noTransferred] = transformStyleToUnocss(css, isRem)

  return [
    transferred
      ? transferred.replace(/="([^"]+)"/g, (_: string, v: string) => `-${v}`)
      : '',
    noTransferred,
  ]
}
