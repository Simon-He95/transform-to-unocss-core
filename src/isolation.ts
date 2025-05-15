import { transformImportant } from './utils'

const isolationMap = [
  'isolation',
]
export function isolation(key: string, val: string) {
  if (!isolationMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (val === 'isolate')
    return `${value}${important}`
  return `${key}-${value}${important}`
}
