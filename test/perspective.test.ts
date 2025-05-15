import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('perspective', () => {
  it('px;', () => {
    expect(toUnocss('perspective: 300px')).toBe('perspective-300px')
  })

  it('rem', () => {
    expect(toUnocss('perspective: 10rem')).toBe('perspective-10rem')
  })

  it('important', () => {
    expect(toUnocss('perspective: 2em !important')).toBe('perspective-2em!')
  })

  it('perspective-origin: top right;', () => {
    expect(toUnocss('perspective-origin: top right;')).toBe('perspective-origin-top-right')
  })

  it('perspective-origin: var(--origin, top right);', () => {
    expect(toUnocss('perspective-origin: var(--origin, top right);')).toBe('perspective-origin="[var(--origin,top_right)]"')
  })
})
