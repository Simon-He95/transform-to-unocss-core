import {
  getFirstName,
  getLastName,
  joinWithLine,
  joinWithUnderLine,
  transformImportant,
} from './utils'

export function grid(key: string, val: string) {
  const [value, important] = transformImportant(val)

  if (key.startsWith('grid-template')) {
    const matcher = value.match(/repeat\s*\(\s*(\d+)/)
    if (matcher) {
      return `grid-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-${matcher[1]
      }${important}`
    }
    return `grid-${getLastName(key) === 'rows' ? 'rows' : 'cols'
    }-${value.includes(' ') ? `[${joinWithUnderLine(value)}]` : value}${important}`
  }
  if (key === 'grid-auto-flow') {
    return `grid-flow-${joinWithLine(value).replace(
      'column',
      'col',
    )}${important}`
  }
  if (key.startsWith('grid-auto')) {
    const matcher = value.match(/minmax\s*\(\s*0\s*,\s*1fr/)
    return `auto-${getLastName(key) === 'rows' ? 'rows' : 'cols'}-${matcher ? 'fr' : getFirstName(value)
    }${important}`
  }
  const matcher = value.match(/span\s+(\d)/)
  if (matcher) {
    return `${key.slice(5).replace('column', 'col')}-span-${matcher[1]
    }${important}`
  }
  if (value === '1/-1')
    return `${key.slice(5).replace('column', 'col')}-span-full${important}`
  return `${key.slice(5).replace('column', 'col')}-${value}${important}`
}
