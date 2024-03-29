import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('content', () => {
  it('content: none;', () => {
    expect(toUnocss('content: none;')).toBe('content-[none]')
  })

  it('content: "aa";', () => {
    expect(toUnocss('content: "aa";')).toBe('content-[\'aa\']')
  })

  it('content: " ";', () => {
    expect(toUnocss('content: " ";')).toBe('content-[\'_\']')
  })
  it('content: \' \'', () => {
    expect(toUnocss('content: \' \';')).toBe('content-[\'_\']')
  })
  it('content: ""', () => {
    expect(toUnocss('content: "";')).toBe('content-[\'\']')
  })
})
