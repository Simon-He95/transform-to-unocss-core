import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('filter', () => {
  it('blur 0', () => {
    expect(toUnocss('filter: blur(0);')).toBe('blur-0')
  })

  it('blur px', () => {
    expect(toUnocss('filter: blur(10px);')).toBe('blur-10px')
  })

  it('brightness', () => {
    expect(toUnocss('filter: brightness(.5);')).toBe('brightness-50')
  })

  it('brightness percent', () => {
    expect(toUnocss('filter: brightness(50%);')).toBe('brightness-50')
  })

  it('contrast', () => {
    expect(toUnocss('filter: contrast(.5);')).toBe('contrast-50')
  })

  it('drop-shadow', () => {
    expect(
      toUnocss('filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));'),
    ).toBe('drop-shadow="[0_1px_1px_rgba(0,0,0,0.05)]"')
  })

  it('drop-shadow with rem', () => {
    expect(
      toUnocss('filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.05));', true),
    ).toBe('drop-shadow="[0_0.625rem_0.625rem_rgba(0,0,0,0.05)]"')
  })

  it('grayscale 0.1', () => {
    expect(toUnocss('filter: grayscale(0.1);')).toBe('grayscale-10')
  })

  it('grayscale %', () => {
    expect(toUnocss('filter: grayscale(10%);')).toBe('grayscale-10')
  })

  it('hue', () => {
    expect(toUnocss('filter: hue-rotate(0deg);')).toBe('hue-rotate-0')
    expect(toUnocss('filter: hue-rotate(calc(<number>deg * -1))')).toBe('hue-rotate="[calc(<number>deg*-1)]"')
  })

  it('invert', () => {
    expect(toUnocss('filter: invert(0.1);')).toBe('invert-10')
  })

  it('saturate', () => {
    expect(toUnocss('filter: saturate(0);')).toBe('saturate-0')
    expect(toUnocss('filter: saturate(var(--saturate));')).toBe('saturate="[var(--saturate)]"')
  })

  it('sepia', () => {
    expect(toUnocss('filter: sepia(0);')).toBe('sepia-0')
    expect(toUnocss('filter: sepia(calc(<number>deg * -1))')).toBe('sepia="[calc(<number>deg*-1)]"')
  })
})
