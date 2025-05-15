import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('accent', () => {
  it('accent-color: inherit;', () => {
    expect(toUnocss('accent-color: inherit !important;')).toBe(
      'accent-[inherit]!',
    )
  })

  it('accent-color: hsl(228 4% 24%);', () => {
    expect(toUnocss('accent-color: hsl(228 4% 24%);')).toBe(
      'accent="[hsl(228,4%,24%)]"',
    )
  })

  it('accent-color: #fff;', () => {
    expect(toUnocss('accent-color: #fff;')).toBe('accent="[#fff]"')
  })

  it('align-self: center;', () => {
    expect(toUnocss('align-self: center;')).toBe('self-center')
  })

  it('align-self: flex-start;', () => {
    expect(toUnocss('align-self: flex-start;')).toBe('self-start')
  })
})
