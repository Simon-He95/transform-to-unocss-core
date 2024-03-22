import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('line-height', () => {
  it('rem;', () => {
    expect(toUnocss('line-height: 0.25rem;')).toBe('lh-0.25rem')
  })

  it('px', () => {
    expect(toUnocss('line-height: 20px;')).toBe('lh-20px')
  })

  it('em', () => {
    expect(toUnocss('line-height: 20em;')).toBe('lh-20em')
  })

  it('line-height: 1', () => {
    expect(toUnocss('line-height: 1;')).toBe('lh-none')
  })

  it('line-height: 1.25', () => {
    expect(toUnocss('line-height: 1.25;')).toBe('lh-tight')
  })

  it('line-height: 1.375', () => {
    expect(toUnocss('line-height: 1.375;')).toBe('lh-snug')
  })

  it('line-height: 1.5', () => {
    expect(toUnocss('line-height: 1.5;')).toBe('lh-normal')
  })

  it('line-height: 1.625', () => {
    expect(toUnocss('line-height: 1.625;')).toBe('lh-relaxed')
  })

  it('calc', () => {
    expect(toUnocss('line-height: calc(100% - 20px);')).toBe(
      'lh="[calc(100%-20px)]"',
    )
  })
})
