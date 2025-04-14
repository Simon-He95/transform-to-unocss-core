import { getVal, transformImportant } from './utils'

export function animation(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key === 'animation-delay')
    return `animate${getVal(value)}${important}`
  if (key === 'animation') {
    return value.split(' ').map((v) => {
      if (v.endsWith('s'))
        return `animate${getVal(v)}${important}`
      return `animate-${v}${important}`
    }).join(' ')
  }
  return `animate-${value}${important}`
}
