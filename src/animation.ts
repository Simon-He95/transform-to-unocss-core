import { getVal, transformImportant } from './utils'

export function animation(key: string, val: string) {
  const [value, important] = transformImportant(val)

  // 处理 animation-delay
  if (key === 'animation-delay') {
    return `animate-delay${getVal(value)}${important}`
  }

  // 处理 animation-duration
  if (key === 'animation-duration') {
    return `animate-duration${getVal(value)}${important}`
  }

  if (key === 'animation-name') {
    // 处理 animation-name
    return `animate-name-[${value}]${important}`
  }

  // 处理 animation-timing-function
  if (key === 'animation-timing-function') {
    // 常见的 timing functions 可以直接使用命名格式
    return `animate-ease-[${value}]${important}`
  }

  if (key === 'animation-iteration-count') {
    return `animate-count${getVal(value)}${important}`
  }

  if (key === 'animation-direction') {
    return `animate-direction-${value}${important}`
  }

  if (key === 'animation-fill-mode') {
    return `animate-fill-${value}${important}`
  }

  const playStates: any = {
    running: 'running',
    paused: 'paused',
  }
  // 处理 animation-play-state
  if (key === 'animation-play-state') {
    if (value in playStates) {
      return `animate-${playStates[value]}${important}`
    }
    // 其他值使用原始语法
    return `animate-[${value}]${important}`
  }

  // 处理完整的 animation 属性
  if (key === 'animation') {
    // 拆分 animation 的各个部分
    const parts = value.split(' ')
    const result = []
    let timeValuesFound = 0

    // 分析各个部分并转换
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]

      // 判断部分的类型
      if (/^\d+(?:\.\d+)?s?$/.test(part)) {
        // 时间值
        if (timeValuesFound === 0) {
          // 第一个时间值对应 duration
          result.push(`animate-duration${getVal(part)}`)
        }
        else if (timeValuesFound === 1) {
          // 第二个时间值对应 delay
          result.push(`animate-delay${getVal(part)}`)
        }
        else {
          // 额外的时间值
          result.push(`animate-[${part}]`)
        }
        timeValuesFound++
      }
      // 处理 animation-timing-function
      else if (/^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(part)) {
        // 常见的时间函数，与 animation-timing-function 处理一致
        result.push(`animate-ease-[${part}]`)
      }
      else if (part.startsWith('cubic-bezier') || part.startsWith('steps')) {
        // 自定义时间函数，与 animation-timing-function 处理一致
        result.push(`animate-ease-[${part}]`)
      }
      // 处理 animation-direction
      else if (['alternate', 'alternate-reverse', 'normal', 'reverse'].includes(part)) {
        // 与 animation-direction 处理一致
        result.push(`animate-direction-${part}`)
      }
      // 处理 animation-fill-mode
      else if (['forwards', 'backwards', 'both', 'none'].includes(part)) {
        result.push(`animate-fill-${part}`)
      }
      // 处理 animation-play-state
      else if (playStates[part]) {
        // 与 animation-play-state 处理一致
        result.push(`animate-${playStates[part]}`)
      }
      // 处理 animation-iteration-count
      else if (part === 'infinite' || /^\d+$/.test(part)) {
        // 与 animation-iteration-count 处理一致
        result.push(`animate-count${getVal(part)}`)
      }
      // 处理 animation-name
      else if (part !== 'normal') {
        // 与 animation-name 处理一致
        result.push(`animate-[${part}]`)
      }
      else {
        // 未知值
        result.push(`animate-[${part}]`)
      }
    }

    return result.length > 0 ? result.join(' ') + important : ''
  }

  // 处理其他 animation 相关属性
  return `animate-[${value}]${important}`
}
