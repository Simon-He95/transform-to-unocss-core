import { transformImportant } from './utils'

export function writing(key: string, val: string) {
  const [value, important] = transformImportant(val)
  if (val === 'horizontal-tb')
    return `write-normal${important}`
  return `write-${value.replace('-rl', '-right').replace('-lr', '-left')}${important}`
}
