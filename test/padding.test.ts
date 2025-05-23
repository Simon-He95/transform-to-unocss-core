import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('padding', () => {
  it('padding:50px', () => {
    expect(toUnocss('padding:50px')).toBe('p-50px')
  })
  it('padding:50px 30px', () => {
    expect(toUnocss('padding:50px 30px')).toBe('px-30px py-50px')
  })
  it('padding:50px 30px 20px', () => {
    expect(toUnocss('padding:50px 30px 20px')).toBe('px-30px pt-50px pb-20px')
  })
  it('padding:50px 30px 20px 40px', () => {
    expect(toUnocss('padding:50px 30px 20px 40px')).toBe(
      'pt-50px pb-20px pl-40px pr-30px',
    )
  })
})

describe('padding-left', () => {
  it('padding-left:50px', () => {
    expect(toUnocss('padding-left:50px')).toBe('pl-50px')
  })
})

describe('padding-right', () => {
  it('padding-right:50px', () => {
    expect(toUnocss('padding-right:50px')).toBe('pr-50px')
  })
})

describe('padding-top', () => {
  it('padding-top:50px', () => {
    expect(toUnocss('padding-top:50px')).toBe('pt-50px')
  })
})

describe('padding-bottom', () => {
  it('padding-bottom:50px', () => {
    expect(toUnocss('padding-bottom:50px')).toBe('pb-50px')
  })
  it('padding-bottom: constant(safe-area-inset-bottom)', () => {
    expect(toUnocss('padding-bottom: constant(safe-area-inset-bottom)')).toBe('pb="[constant(safe-area-inset-bottom)]"')
  })
  it('padding-bottom: env(safe-area-inset-bottom)', () => {
    expect(toUnocss('padding-bottom: env(safe-area-inset-bottom)')).toBe('pb="[env(safe-area-inset-bottom)]"')
  })
})

describe('padding-inline-start: 0px;', () => {
  it('padding-inline-start: 0px;', () => {
    expect(toUnocss('padding-inline-start: 0px;')).toBe('ps-0px')
  })
})

describe('padding-inline-end: 0px;', () => {
  it('padding-inline-end: 0px;', () => {
    expect(toUnocss('padding-inline-end: 0px;')).toBe('pe-0px')
  })
})
