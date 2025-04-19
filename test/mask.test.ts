import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('position', () => {
  it('mask-clip: border-box;', () => {
    expect(toUnocss('mask-clip: border-box;')).toBe('mask-clip-border')
  })

  it('mask-composite: add;', () => {
    expect(toUnocss('mask-composite: add;')).toBe('mask-add')
  })

  it('mask-image: none;', () => {
    expect(toUnocss('mask-image: none;')).toBe('mask-none')
  })

  it('mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent 0.1);', () => {
    expect(toUnocss('mask-image: linear-gradient(to right, black var(--tw-mask-right-from), transparent 0.1);')).toBe('mask-r-from="black var(--tw-mask-right-from)" mask-r-to="transparent 0.1"')
  })

  it('mask-mode: alpha;', () => {
    expect(toUnocss('mask-mode: alpha;')).toBe('mask-alpha')
  })

  it('mask-origin: border-box;', () => {
    expect(toUnocss('mask-origin: border-box;')).toBe('mask-origin-border')
  })

  it('mask-position: top left;', () => {
    expect(toUnocss('mask-position: top left;')).toBe('mask-top-left')
  })

  it('mask-position: top;', () => {
    expect(toUnocss('mask-position: top;')).toBe('mask-top')
  })

  it('mask-position: var(--position);', () => {
    expect(toUnocss('mask-position: var(--position);')).toBe('mask-position="[var(--position)]"')
  })
})
