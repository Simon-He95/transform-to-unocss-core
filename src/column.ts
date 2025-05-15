import { transformImportant } from './utils'

const columnMap = [
  // 'column-count',
  // 'column-fill',
  'column-gap',
  // 'column-rule',
]
export function column(key: string, val: string) {
  if (!columnMap.includes(key))
    return
  // column-count
  const [value, important] = transformImportant(val)

  if (key === 'column-gap')
    return `gap-x-${value}${important}`
  // return `${key}-${value}${important}`
}
