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
    return `animate-keyframes-${value}${important}`
  }

  // 处理 animation-timing-function
  if (key === 'animation-timing-function') {
    // 常见的 timing functions 可以直接使用命名格式
    return `animate-ease-[${value}]${important}`
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
    // 计算已经找到的时间值数量
    let timeValuesFound = 0
    // 分析各个部分并转换
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]

      // 判断部分的类型
      if (/^\d+(?:\.\d+)?s?$/.test(part)) {
        // 如果是第一个时间值，认为是 duration
        if (timeValuesFound === 0) {
          result.push(`animate-duration${getVal(part)}`)
        }
        // 如果是第二个时间值，认为是 delay
        else if (timeValuesFound === 1) {
          result.push(`animate-delay${getVal(part)}`)
        }
        // 如果有更多时间值（不常见，但可能发生），使用通用格式
        else {
          result.push(`animate-[${part}]`)
        }
        timeValuesFound++
      }
      else if (/^(?:linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(part)) {
        // 常见的时间函数
        result.push(`animate-ease-[${part}]`)
      }
      else if (part.startsWith('cubic-bezier') || part.startsWith('steps')) {
        // 自定义时间函数
        result.push(`animate-[${part}]`)
      }
      else if (['alternate', 'alternate-reverse', 'normal'].includes(part)) {
        // animation-direction
        result.push(`animate-${part}`)
      }
      else if (['forwards', 'backwards', 'both', 'none'].includes(part)) {
        // animation-fill-mode
        result.push(`animate-fill-${part}`)
      }
      else if (playStates[part]) {
        // animation-play-state
        result.push(`animate-${playStates[part]}`)
      }
      else if (part !== 'infinite' && part !== 'normal' && !(/^\d+$/.test(part))) {
        // 动画名称（排除关键字和纯数字）
        result.push(`animate-[${part}]`)
      }
      else {
        // 其他值（如 iteration count, direction, fill-mode 等）使用原始语法
        result.push(`animate-[${part}]`)
      }
    }

    return result.join(' ') + important
  }

  // 处理其他 animation 相关属性
  return `animate-${value}${important}`
}
