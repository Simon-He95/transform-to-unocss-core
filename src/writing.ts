import { transformImportant } from './utils'

const whiteMap = [
  'writing-mode'
]
export function writing(key: string, val: string) {
  if (!whiteMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (val === 'horizontal-tb')
    return `write-normal${important}`
  return `write-${value.replace('-rl', '-right').replace('-lr', '-left')}${important}`
}
