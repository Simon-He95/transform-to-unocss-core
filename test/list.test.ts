import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('list', () => {
  it('list-style-type: unset;', () => {
    expect(toUnocss('list-style-type: unset;')).toMatchInlineSnapshot(
      '"list-unset"',
    )
  })

  it('list-style-type: var;', () => {
    expect(toUnocss('list-style-type: var(--style,xxx);')).toMatchInlineSnapshot(
      '"list=\\"[var(--style,xxx)]\\""',
    )
  })

  it('list-style-position: outside;', () => {
    expect(toUnocss('list-style-position: outside;')).toMatchInlineSnapshot(
      '"list-outside"',
    )
  })

  it('list-style-image', () => {
    expect(toUnocss('list-style-image: var(--image)')).toMatchInlineSnapshot(
      '"list=\\"[var(--image)]\\""',
    )

    expect(toUnocss('list-style-image: none')).toMatchInlineSnapshot(
      '"list-none"',
    )
  })
})
