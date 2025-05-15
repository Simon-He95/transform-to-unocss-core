import {
  getHundred,
  getVal,
  isCalc,
  isVar,
  joinEmpty,
  joinWithLine,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const transformMap = [
  'transform',
  'transform-origin',
  'transform-style',
]
export function transform(key: string, val: string) {
  if (!transformMap.includes(key))
    return
  const [v, important] = transformImportant(val)
  if (key === 'transform-origin') {
    if (isVar(v) || isCalc(v))
      return `origin${getVal(v)}${important}`
    return `origin-${/\d/.test(v) && v.includes(' ') ? `[${joinWithUnderLine(v)}]` : joinWithLine(v)}${important}`
  }
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
        // value 要排除掉括号比如 var() 、calc()，先用占位符号替换掉
        let values = value.replace(
          /,(?![^()]*\))/g,
          ' ',
        ).split(' ')
        if (values.length > 1) {
          if (namePrefix === 'translate')
            return `${namePrefix}="[${values.join(',')}]"`

          // 如果是 calc() 或者 var() 但是没有结尾), 存在嵌套使用的场景，直接把后面的作为一个整体
          if (values.some(v => (isCalc(v) || isVar(v)) && !v.endsWith(')')))
            values = [value]
          return `${namePrefix}="${values.map((v) => {
            const _v = isVar(v) || isCalc(v)
              ? `[${v}]`
              : namePrefix === 'scale'
                ? getHundred(v)
                : transformVal(v)
            return _v
          },

          ).join(' ')}${important}"`
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
