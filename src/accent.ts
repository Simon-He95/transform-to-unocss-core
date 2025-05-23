import { joinWithUnderLine, transformImportant } from './utils'

const accentMap = [
  'accent-color',
]
export function accent(key: string, val: string) {
  if (!accentMap.includes(key))
    return
  // accent-color
  const [value, important] = transformImportant(val)
  return `accent-[${joinWithUnderLine(value)}]${important}`
}
