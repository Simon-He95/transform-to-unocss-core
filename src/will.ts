import { joinWithUnderLine, transformImportant } from './utils'

const willMap = [
  'will-change',
]
const willChangeKeys: Record<string, string> = {
  'auto': 'auto',
  'scroll-position': 'scroll',
  'contents': 'contents',
  'transform': 'transform',
}
export function will(key: string, val: string) {
  if (!willMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (value in willChangeKeys) {
    return `will-change-${willChangeKeys[value]}${important}`
  }
  return `${key}-[${joinWithUnderLine(value)}]${important}`
}
