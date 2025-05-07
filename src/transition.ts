import { getVal, transformImportant } from './utils'

const times = ['transition-delay', 'transition-duration']

export function transition(key: string, val: string) {
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
  if (times.includes(key))
    return `${key.split('-')[1]}-${value.slice(0, -2)}${important}`
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
        return 'colors'
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
