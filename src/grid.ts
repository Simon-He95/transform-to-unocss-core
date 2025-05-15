import {
  getFirstName,
  getLastName,
  getVal,
  joinWithLine,
  joinWithUnderLine,
  transformImportant,
} from './utils'

const gridMap = [
  'grid',
  'grid-row',
  'grid-column',
  'grid-template-columns',
  'grid-template-rows',
  'grid-auto-flow',
  'grid-auto-columns',
  'grid-auto-rows',
  'grid-column-start',
  'grid-column-end',
  'grid-row-start',
  'grid-row-end',
]
export function grid(key: string, val: string) {
  if (!gridMap.includes(key))
    return
  const [value, important] = transformImportant(val)

  if (key.startsWith('grid-template')) {
    const matcher = value.match(/^repeat\s*\(\s*(\d+)/)
    if (matcher) {
      return `grid-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-${matcher[1]
      }${important}`
    }
    if (value.startsWith('repeat(')) {
      // 存在无法处理的情况
      return
    }
    return `grid-${getLastName(key) === 'rows' ? 'rows' : 'cols'
    }${value.includes(' ') ? `-[${joinWithUnderLine(value)}]` : getVal(value)}${important}`
  }
  if (key === 'grid-auto-flow') {
    return `grid-flow-${joinWithLine(value).replace(
      'column',
      'col',
    )}${important}`
  }
  if (key.startsWith('grid-auto')) {
    if (/\d/.test(value))
      return `auto-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-[${joinWithUnderLine(value)}]${important}`
    return `auto-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-${getFirstName(value)}${important}`
  }
  const matcher = value.match(/span\s+([^/]+)\/\s*span\s+(.*)/)
  if (matcher) {
    if (matcher[1] !== matcher[2]) {
      // 存在无法处理的情况
      return
    }
    return `${key.slice(5).replace('column', 'col')}-span${getVal(matcher[1])
    }${important}`
  }
  if (value === '1/-1')
    return `${key.slice(5).replace('column', 'col')}-span-full${important}`
  return `${key.slice(5).replace('column', 'col')}${getVal(value)}${important}`
}
