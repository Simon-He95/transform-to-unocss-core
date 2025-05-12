import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('transition', () => {
  it('transition: background-color 0.5s ease;', () => {
    expect(toUnocss('transition: background-color 0.5s 1.5s ease;')).toBe(
      'transition="colors duration-0.5s delay-1.5s ease-[ease]"',
    )
  })

  it('transition: transform 0.15s linear;', () => {
    expect(toUnocss('transition: transform 0.15s linear;')).toBe(
      'transition="transform duration-0.15s ease-[linear]"',
    )
  })

  it('transition: none;', () => {
    expect(toUnocss('transition: none;')).toBe('transition="none"')
  })

  it('transition-property: all;', () => {
    expect(toUnocss('transition-property: all;')).toBe('transition-all')
  })

  it('transition-property: box-shadow;', () => {
    expect(toUnocss('transition-property: box-shadow;')).toBe(
      'transition-shadow',
    )
  })

  it('transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;', () => {
    expect(
      toUnocss(
        'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;',
      ),
    ).toBe('transition-color')
  })

  it('transition-duration: 75ms;', () => {
    expect(toUnocss('transition-duration: 75ms;')).toBe('duration-75')
  })

  it('transition-duration: 0.3s;', () => {
    expect(toUnocss('transition-duration: 0.3s;')).toBe('duration-300')
  })

  it('transition-duration: var(--xxx, 0.3s);', () => {
    expect(toUnocss('transition-duration: var(--xxx, 0.3s);')).toBe('duration="[var(--xxx,0.3s)]"')
  })

  it('transition-delay: 75ms;', () => {
    expect(toUnocss('transition-delay: 75ms;')).toBe('delay-75')
  })

  it('transition-timing-function: linear', () => {
    expect(toUnocss('transition-timing-function: linear')).toBe('ease-linear')
  })

  it('transition-timing-function: cubic-bezier(0.4, 0, 1, 1);', () => {
    expect(
      toUnocss('transition-timing-function: cubic-bezier(0.4, 0, 1, 1);'),
    ).toBe('ease="[cubic-bezier(0.4,0,1,1)]"')
  })

  it('transition: margin-left .28s;', () => {
    expect(toUnocss('transition: margin-left .28s;')).toBe(
      'transition="margin-left duration-.28s"',
    )
  })
})
