import { getFirstName, transformImportant } from './utils'

const aspectMap = [
  'aspect-ratio',
]
export function aspect(key: string, val: string) {
  if (!aspectMap.includes(key))
    return
  // aspect-ratio
  const [value, important] = transformImportant(val)

  if (value === 'auto')
    return `${getFirstName(key)}-${value}${important}`
  return `${getFirstName(key)}="[${value}]${important}"`
}
