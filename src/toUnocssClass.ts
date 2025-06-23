import { transformStyleToUnocss } from './transformStyleToUnocss'

export function toUnocssClass(css: string, isRem = false, debug?: boolean): [string, string[]] {
  const [transferred, noTransferred] = transformStyleToUnocss(css, isRem, debug)

  return [
    transferred
      ? transferred.replace(/([^\s=]+)="([^"]+)"/g, (_, v1, v2) => v2.split(' ').map((v: string) => `${v1}-${v}`).join(' '))
      : '',
    noTransferred,
  ]
}
