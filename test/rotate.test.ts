import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('rotate', () => {
  it('rotate: x 50deg;', () => {
    expect(toUnocss('rotate: x 50deg;')).toBe('rotate-[x_50deg]')
  })

  it('rotate: 1 2 1 360deg;', () => {
    expect(toUnocss('rotate: 1 2 1 360deg;')).toBe('rotate-[1_2_1_360deg]')
  })

  it('rotate: 90deg;', () => {
    expect(toUnocss('rotate: -90deg;')).toBe('rotate--90deg')
  })

  it('rotate: x var;', () => {
    expect(toUnocss('rotate: x var(--x, 90deg);')).toBe('rotate-[x_var(--x,90deg)]')
  })

  it('rotate: var;', () => {
    expect(toUnocss('rotate: var(--x, 90deg);')).toBe('rotate="[var(--x,90deg)]"')
  })
})
