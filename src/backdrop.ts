import { filter } from './filter'
import { transformImportant } from './utils'

const backdropMap = [
  'backdrop-filter',
]
export function backdrop(key: string, val: string) {
  if (!backdropMap.includes(key))
    return
  // backdrop-filter
  const [value, important] = transformImportant(val)

  if (value.startsWith('var')) {
    // 目前还不支持这种形式
    // return `backdrop${getVal(value)}${important}`
    return
  }

  return `backdrop-${filter(key, value)}${important}`
}
