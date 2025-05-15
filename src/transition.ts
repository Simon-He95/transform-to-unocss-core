import { getLastName, getVal, transformImportant } from './utils'

const times = ['transition-delay', 'transition-duration']

const transitionMap = [
  'transition',
  'transition-property',
  'transition-duration',
  'transition-delay',
  'transition-timing-function',
  'transition-behavior',
]
export function transition(key: string, val: string) {
  if (!transitionMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key === 'transition-timing-function') {
    if (value === 'linear')
      return `ease-${value}${important}`
    return `ease="[${value}]${important}"`
  }
  if (key === 'transition')
    return `transition="${transformTransition(value, important)}"`

  if (key === 'transition-property') {
    if (value.includes('color'))
      return `transition-color${important}`
    if (value === 'box-shadow')
      return `transition-shadow${important}`
    return `transition-${value}${important}`
  }
  if (key === 'transition-behavior')
    return `transition-${getLastName(value)}${important}`
  const _val = getVal(value)

  if (_val === `-${value}` && times.includes(key)) {
    let num = value.trim()
    if (num.endsWith('ms')) {
      num = num.replace(/ms$/, '')
    }
    else if (num.endsWith('s')) {
      num = (Number.parseFloat(num.replace(/s$/, '')) * 1000).toString()
    }
    return `${key.split('-')[1]}-${num}${important}`
  }
  return `${key.split('-')[1]}${_val}${important}`
}

function transformTransition(v: string, important: string) {
  let hasDuration = false
  return v
    .split(' ')
    .map((item) => {
      if (/^\d/.test(item) || /^\.\d/.test(item)) {
        if (hasDuration)
          return `delay${getVal(item, undefined, true)}${important}`
        hasDuration = true
        return `duration${getVal(item, undefined, true)}${important}`
      }
      if (item === 'background-color')
        return `colors${important}`
      if (/^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(item)) {
        // 常见的时间函数，与 animation-timing-function 处理一致
        return `ease-[${item}]${important}`
      }
      else if (item.startsWith('cubic-bezier') || item.startsWith('steps')) {
        // 自定义时间函数，与 animation-timing-function 处理一致
        return `ease-[${item}]${important}`
      }
      return `${item}${important}`
    })
    .join(' ')
}
