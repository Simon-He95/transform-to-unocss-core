import { transformImportant } from './utils'

const mixMap = [
  'mix-blend-mode',
]
export function mix(key: string, val: string) {
  if (!mixMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  return `mix-blend-${value}${important}`
}
