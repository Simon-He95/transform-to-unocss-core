import { transformImportant } from './utils'

const columnsMap = [
  'columns',
]
export function columns(key: string, val: string) {
  if (!columnsMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}-${value}${important}`
}
