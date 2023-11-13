import { transformStyleToUnocss } from './transformStyleToUnocss'

export function toUnocssClass(css: string, isRem = false) {
  const [transferred, noTransferred] = transformStyleToUnocss(css, isRem)

  return [
    transferred
      ? transferred.replace(/="([^"]+)"/g, (_: string, v: string) => `-${v}`)
      : transferred.replace(/="([^"]+)"/g, (_: string, v: string) => `-${v}`),
    noTransferred,
  ]
}
