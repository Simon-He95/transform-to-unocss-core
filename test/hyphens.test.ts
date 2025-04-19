import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('hyphens', () => {
  it('hyphens: none;', () => {
    expect(toUnocss('hyphens: none;')).toBe('hyphens-none')
  })

  it('hyphens: manual;', () => {
    expect(toUnocss('hyphens: manual;')).toBe('hyphens-manual')
  })

  it('hyphens: auto;', () => {
    expect(toUnocss('hyphens: auto;')).toBe('hyphens-auto')
  })
})
