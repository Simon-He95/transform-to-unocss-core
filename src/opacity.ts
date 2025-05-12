import { isPercent, transformImportant } from './utils'

export function opacity(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (isPercent(val))
    return `op-${value.replace(/%/g, '')}${important}`

  return `op-${+value * 100}${important}`
}
