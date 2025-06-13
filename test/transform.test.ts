import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('transform', () => {
  it('transform-origin:center', () => {
    expect(toUnocss('transform-origin: center;')).toBe('origin-center')
  })

  it('transform-style: preserve-3d;', () => {
    expect(toUnocss('transform-style: preserve-3d;')).toBe('transform-preserve-3d')
  })

  it('transform:none', () => {
    expect(toUnocss('transform:none;')).toBe('transform-none')
  })

  it('transform-origin: top right;', () => {
    expect(toUnocss('transform-origin: top right;')).toBe('origin-top-right')
  })

  it('transform-origin: 0 0;', () => {
    expect(toUnocss('transform-origin: 0 0;')).toBe('origin-[0_0]')
  })

  it('transform-origin: transform-origin: var;', () => {
    expect(toUnocss('transform-origin: var(--custom-property, 0 0);')).toBe('origin="[var(--custom-property,0_0)]"')
  })

  it('transform-origin: 50% 50%;', () => {
    expect(toUnocss('transform-origin: 50% 50%;')).toBe('origin-[50%_50%]')
  })

  it('transform: scale(0);', () => {
    expect(toUnocss('transform: scale(.5);')).toBe('scale="50"')
  })

  it('transform: scaleX(0);', () => {
    expect(toUnocss('transform: scaleX( 0.5 );')).toBe('scale="x-50"')
  })

  it('transform: rotate(0deg);', () => {
    expect(toUnocss('transform: rotate( 0deg );')).toBe('rotate="0"')
  })

  it('transform: rotate(-180deg);', () => {
    expect(toUnocss('transform: rotate( -180deg );')).toBe('rotate="-180"')
  })

  it('transform: translateY(1px);', () => {
    expect(toUnocss('transform: translateY(1px);')).toBe('translate="y-1px"')
  })

  it('transform: translateX(1px);', () => {
    expect(toUnocss('transform: translateX(1px);')).toBe('translate="x-1px"')
  })

  it('transform: translateX(10%);', () => {
    expect(toUnocss('transform: translateX(10%);')).toBe('translate="x-10%"')
  })
  it('transform: ranslate(10%, 20%);', () => {
    expect(toUnocss('transform: translate(10%, 20%);')).toBe(
      'translate="[10%,20%]"',
    )
  })

  it('transform: skewX(2deg);', () => {
    expect(toUnocss('transform: skewX(2deg);')).toBe('skew="x-2"')
  })

  it('transform: skew(50deg)', () => {
    expect(toUnocss('transform: skew(50deg);')).toBe('skew="50"')
  })

  it('transform: scale(0.6)', () => {
    expect(toUnocss('transform: scale(0.6);')).toBe('scale="60"')
  })

  it('transform: scale(0.8, 0.9)', () => {
    expect(toUnocss('transform: scale(0.8, 0.9)')).toBe('scale="80 90"')
  })

  it('transform: translate(-26px, 16px) skew(50deg) scaleY(0.6);', () => {
    expect(
      toUnocss('transform: translate(-26px, 16px) skew(50deg) scaleY(0.6)'),
    ).toBe('translate="[-26px,16px]" skew="50" scale="y-60"')
  })

  it('transform: translate(-26px, var(--translatey)) skew(var(--skew,60)) scaleY(var(--scale, calc(--xxx, 20)));', () => {
    expect(
      toUnocss('transform: translate(-26px, var(--translatey,20px)) skew(var(--skew,60)) scale(var(--scale, calc(--x * 30%)))'),
    ).toBe('translate="[-26px,var(--translatey,20px)]" skew="[var(--skew,60)]" scale="[var(--scale,calc(--x*30%))]"')
  })
  it('transform: translate3d(-50%, -50%, 0);', () => {
    expect(
      toUnocss('transform: translate3d(-50%, -50%, 0)'),
    ).toBe('translate="[-50%,-50%,0]"')
  })

  it('transform: scale(1.5);', () => {
    expect(
      toUnocss('transform: scale(1.15)'),
    ).toBe('scale="115"')
  })
})
