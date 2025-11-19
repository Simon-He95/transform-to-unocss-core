import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
import { toUnocssClass } from '../src/toUnocssClass'

describe('text', () => {
  it('text-left', () => {
    expect(toUnocss('text-align:left')).toBe('text-left')
  })

  it('text-right', () => {
    expect(toUnocss('text-align:right')).toBe('text-right')
  })

  it('text-justify', () => {
    expect(toUnocss('text-align:justify')).toBe('text-justify')
  })

  it('text-center', () => {
    expect(toUnocss('text-align:center')).toBe('text-center')
  })

  it('text-align:inherit', () => {
    expect(toUnocss('text-align: inherit')).toBe('text-align-inherit')
  })

  it('text-align-last:inherit', () => {
    expect(toUnocss('text-align-last: inherit')).toBe('[text-align-last:inherit]')
  })

  it('text-wrap', () => {
    expect(toUnocss('text-wrap:wrap')).toBe('text-wrap')
  })

  it('text-ellipsis', () => {
    expect(toUnocss('text-overflow: ellipsis;')).toBe('text-ellipsis')
  })

  it('text-decoration-line: underline;', () => {
    expect(toUnocss('text-decoration-line: underline;')).toBe('underline')
  })

  it('text-decoration: underline;', () => {
    expect(toUnocss('text-decoration: underline;')).toBe('underline')
  })

  it('text-decoration: line-through;', () => {
    expect(toUnocss('text-decoration: line-through;')).toBe('line-through')
  })

  it('text-decoration: overline;', () => {
    expect(toUnocss('text-decoration: overline;')).toBe('overline')
  })

  it('text-decoration: underline overline;', () => {
    expect(toUnocss('text-decoration: underline overline;')).toBe('underline overline')
  })

  it('text-decoration-color: inherit;', () => {
    expect(toUnocss('text-decoration-color: inherit;')).toBe(
      'decoration-inherit',
    )
  })

  it('text-decoration-color: #000;', () => {
    expect(toUnocss('text-decoration-color: #000;')).toBe('decoration="[#000]"')
    expect(toUnocssClass('text-decoration-color: #000;')[0]).toBe('decoration-[#000]')
  })

  it('text-decoration-style: solid;', () => {
    expect(toUnocss('text-decoration-style: solid;')).toBe('decoration-solid')
  })

  it('text-decoration-thickness: 1px;', () => {
    expect(toUnocss('text-decoration-thickness: 1px;')).toBe('decoration-1px')
  })

  it('text-underline-offset: calc(<number>px * -1);', () => {
    expect(toUnocss('text-underline-offset: calc(<number>px * -1);')).toBe(
      'underline-offset="[calc(<number>px*-1)]"',
    )
  })

  it('text-underline-offset: auto;', () => {
    expect(toUnocss('text-underline-offset: auto;')).toBe(
      'underline-offset-auto',
    )
  })

  it('text-transform: uppercase;', () => {
    expect(toUnocss('text-transform: uppercase;')).toBe('uppercase')
  })

  it('text-indent: 0px;', () => {
    expect(toUnocss('text-indent: 0px;')).toBe('indent-0px')
  })

  it('text-indent:  calc(var(--spacing) * <number>);', () => {
    expect(toUnocss('text-indent:  calc(var(--spacing) * <number>);')).toBe('indent="[calc(var(--spacing)*<number>)]"')
  })
})
