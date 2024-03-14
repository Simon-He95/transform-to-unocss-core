import { getFirstName, getVal, isCalc, isVar, transformImportant } from './utils'

export function max(key: string, val: string) {
  const [value, important] = transformImportant(val)

  const all = key.split('-')
  // https://github.com/Simon-He95/transformToUnoCSS/issues/25
  // calc value has '-'
  // getFirstName causes the value to be lost
  const attributeValue = (isCalc(value) || isVar(value)) ? getVal(value) : getVal(getFirstName(value))
  return `${all[0]}-${all[1][0]}${attributeValue}${important}`
}
