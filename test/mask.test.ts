import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('maks', () => {
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

  it('mask-position: 50% -12rpx;', () => {
    expect(toUnocss('mask-position: 50% -12rpx;')).toBe('[mask-position:50%_-12rpx]')
  })

  it('mask-position: top;', () => {
    expect(toUnocss('mask-position: top;')).toBe('mask-top')
  })

  it('mask-position: var(--position);', () => {
    expect(toUnocss('mask-position: var(--position);')).toBe('mask-position="[var(--position)]"')
  })

  it('mask-size: 40rpx 100%;', () => {
    expect(toUnocss('mask-size: 40rpx 100%')).toBe('[mask-size:40rpx_100%]')
  })

  it('mask-image: radial-gradient(circle at 50% 10rpx, transparent 10rpx, red 12rpx)', () => {
    expect(toUnocss('mask-image: radial-gradient(circle at 50% 10rpx, transparent 10rpx, red 12rpx)')).toBe('[mask-image:radial-gradient(circle_at_50%_10rpx,transparent_10rpx,red_12rpx)]')
  })
})
