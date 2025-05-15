import { getLastName, transformImportant } from './utils'

const pointerMap = [
  'pointer-events',
]
export function pointer(key: string, val: string) {
  if (!pointerMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `${key}-${getLastName(value)}${important}`
}
