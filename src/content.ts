import { transformImportant } from './utils'

const contentMap = [
  'content',
  'content-visibility',
]
export function content(key: string, val: string) {
  if (!contentMap.includes(key))
    return
  // content
  // content-visibility
  const [value, important] = transformImportant(val, false)

  if (key === 'content-visibility') {
    return `content-visibility-${value}${important}`
  }
  // "\s*", '\s*'
  const match = value.match(/^(["'])(.*?)\1$/)
  if (match) {
    return `content-['${match[2].replace(/\s/g, '_')}']${important}`
  }
  return `content-[${value}]${important}`
}
