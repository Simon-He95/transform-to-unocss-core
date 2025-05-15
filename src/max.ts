import { getFirstName, getVal, isCalc, isVar, transformImportant } from './utils'

const maxMap = [
  'max-height',
  'max-width',
  'max-block-size',
  'max-inline-size',
  'min-height',
  'min-width',
  'min-block-size',
  'min-inline-size',
]
export function max(key: string, val: string) {
  if (!maxMap.includes(key))
    return
  const [value, important] = transformImportant(val)
  if (/(?:max|min)-(?:inline|block)-size/.test(key)) {
    const fixedKey = key.split('-').slice(0, 2).join('-')

    if (/\d/.test(value) || isVar(value) || isCalc(value))
      return `${fixedKey}${getVal(value)}${important}`
    return `${fixedKey}-${getFirstName(value)}${important}`
  }

  const all = key.split('-')
  // https://github.com/Simon-He95/transformToUnoCSS/issues/25
  // calc value has '-'
  // getFirstName causes the value to be lost
  const attributeValue = (isCalc(value) || isVar(value)) ? getVal(value) : getVal(getFirstName(value))
  return `${all[0]}-${all[1][0]}${attributeValue}${important}`
}
