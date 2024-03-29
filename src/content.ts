import { transformImportant } from './utils'

export function content(key: string, val: string) {
  const [value, important] = transformImportant(val)

  return (value === '" "' || value === '\' \'')
    ? `content-['_']${important}`
    : `content-[${value.replace(/"/g, '\'')}]${important}`
}
