import {
  getHundred,
  isVar,
  joinEmpty,
  joinWithLine,
  joinWithUnderLine,
  transformImportant,
} from './utils'

export function transform(key: string, val: string) {
  const [v, important] = transformImportant(val)
  if (key === 'transform-origin')
    return `origin-${/\d/.test(v) && v.includes(' ') ? `[${joinWithUnderLine(v)}]` : joinWithLine(v)}${important}`
  if (key === 'transform-style')
    return `transform-${v}${important}`
  if (val === 'none')
    return `${key}-none${important}`

  return joinEmpty(v)
    .split(' ')
    .map((v) => {
      const matcher = v.match(/([a-z]+)(3d)?([A-Z])?\((.*)\)/)

      if (!matcher)
        return undefined

      const [_, namePrefix, is3d, nameSuffix, value] = matcher
      if (nameSuffix) {
        const values = value.replace(
          /,(?![^()]*\))/g,
          ' ',
        ).split(' ')
        if (values.length > 1) {
          return `${namePrefix}-${nameSuffix.toLowerCase()}="${values.map(v => isVar(v)
            ? `[${v}]`
            : namePrefix === 'scale'
              ? getHundred(v)
              : transformVal(v)).join(' ')}${important}"`
        }
        return `${namePrefix}="${nameSuffix.toLowerCase()}-${isVar(values[0])
          ? `[${values[0]}]`
          : namePrefix === 'scale'
            ? getHundred(values[0])
            : transformVal(values[0])}${important}"`
      }
      else {
        const values = value.replace(
          /,(?![^()]*\))/g,
          ' ',
        ).split(' ')
        if (values.length > 1) {
          if (namePrefix === 'translate')
            return `${namePrefix}="[${values.join(',')}]"`

          return `${namePrefix}="${values.map(v => isVar(v)
            ? `[${v}]`
            : namePrefix === 'scale'
              ? getHundred(v)
              : transformVal(v)).join(' ')}${important}"`
        }
        return `${namePrefix}="${isVar(values[0])
          ? `[${values[0]}]`
          : namePrefix === 'scale'
            ? getHundred(values[0])
            : transformVal(values[0])}${important}"`
      }
    })
    .filter(Boolean)
    .join(' ')
}

function transformVal(val: string) {
  if (val.endsWith('deg'))
    return val.slice(0, -3)
  return val
}
