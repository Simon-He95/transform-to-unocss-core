import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('justify', () => {
  it('justify-content: flex-start;', () => {
    expect(toUnocss('justify-content: flex-start;')).toBe('justify-start')
  })

  it('justify-items: start;', () => {
    expect(toUnocss('justify-items: start;')).toBe('justify-items-start')
  })

  it('justify-self: auto;', () => {
    expect(toUnocss('justify-self: auto;')).toBe('justify-self-auto')
  })

  it('justify-items: safe end;', () => {
    // 目前还不支持
    // expect(toUnocss('justify-items: safe flex-end;')).toBe('justify-items-end-safe')
    expect(toUnocss('justify-items: safe flex-end;')).toBeUndefined()
  })
})
