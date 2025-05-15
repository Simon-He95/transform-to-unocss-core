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
    expect(toUnocss('content: "   ";')).toBe('content-[\'___\']')
  })

  it('content: \' \'', () => {
    expect(toUnocss('content: \'   \';')).toBe('content-[\'___\']')
  })

  it('content: ""', () => {
    expect(toUnocss('content: "";')).toBe('content-[\'\']')
  })

  it('content: "\/"', () => {
    expect(toUnocss('content: "/";')).toBe('content-[\'/\']')
  })

  it('content: "\'""\'"', () => {
    expect(toUnocss('content: "\'""\'";')).toBe('content-[\'\'""\'\']')
  })

  it('content-visibility', () => {
    expect(toUnocss('content-visibility: revert-layer;')).toBe('content-visibility-revert-layer')
  })
})
