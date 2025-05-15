import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('appearance', () => {
  it('appearance: none;', () => {
    expect(toUnocss('appearance: none;')).toBe('appearance-none')
  })
  it('appearance: auto;', () => {
    expect(toUnocss('appearance: auto;')).toBe('appearance-auto')
  })
})
