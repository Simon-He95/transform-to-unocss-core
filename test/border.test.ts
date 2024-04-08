import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
import { toUnocssClass } from '../src/toUnocssClass'
describe('border', () => {
  it('red;', () => {
    expect(toUnocss('border-color:red;')).toBe('border-red')
    expect(toUnocss('border-color:red green;')).toBe(
      'border-y-red border-x-green',
    )
    expect(toUnocss('border-color:red green yellow;')).toBe(
      'border-t-red border-b-yellow border-x-green',
    )
    expect(toUnocss('border-color:red green yellow black;')).toBe(
      'border-t-red border-b-yellow border-r-green border-l-black',
    )
    expect(toUnocss('border-color:hsla(46, 100%, 50%, 1) #eee rgba(1, 2, 3, .5) #FFC300FF')).toBe(
      'border-t-[hsla(46,100%,50%,1)] border-b-[rgba(1,2,3,.5)] border-r-[#eee] border-l-[#FFC300FF]',
    )
  })

  it('border;', () => {
    expect(toUnocss('border: 2px solid rgba(255, 62, 0, 0);')).toBe(
      'border-2px border-solid border="[rgba(255,62,0,0)]"',
    )
  })

  it('border;', () => {
    expect(toUnocssClass('border: 2px solid rgba(255, 62, 0, 0);')[0]).toBe(
      'border-2px border-solid border-[rgba(255,62,0,0)]',
    )
  })

  it('radius', () => {
    expect(toUnocss('border-radius: 0.25rem;')).toBe('border-rd-0.25rem')
  })

  it('border-width', () => {
    expect(toUnocss('border-width: 2px;')).toBe('border-2px')
  })

  it('radius-calc', () => {
    expect(toUnocss('border-radius: calc(100% - 20px)')).toBe(
      'border-rd="[calc(100%-20px)]"',
    )
  })

  it('border-radius: 10px 20px 30px 40px', () => {
    expect(toUnocss('border-radius: 10px 20px 30px 40px;')).toBe(
      'border-rd="[10px_20px_30px_40px]"',
    )
  })

  it('style', () => {
    expect(toUnocss('border-style: inset;')).toBe('border-inset')
  })

  it('collapse', () => {
    expect(toUnocss('border-collapse: collapse;')).toBe('border-collapse')
  })

  it('spacing', () => {
    expect(toUnocss('border-spacing: 0px 0px;')).toBe(
      'border-spacing="[0px_0px]"',
    )
  })

  it('border-bottom-width: 1px;', () => {
    expect(toUnocss('border-bottom-width: 1px;')).toBe('border-b-1px')
  })

  it('border-bottom-style: dashed;', () => {
    expect(toUnocss('border-bottom-style: dashed;')).toBe('border-b-dashed')
  })

  it('border-left-color: #333;', () => {
    expect(toUnocss('border-left-color: #333;')).toBe('border-l="[#333]"')
  })

  it('border-inline-start-width: 0px;', () => {
    expect(toUnocss('border-inline-start-width: 0px;')).toBe('border-s-0px')
  })

  it('border-inline-end-width: 0px;', () => {
    expect(toUnocss('border-inline-end-width: 0px;')).toBe('border-e-0px')
  })

  it('border: 1px solid var(--magenta-3, #FFADD2)', () => {
    expect(toUnocss('border: 1px solid var(--magenta-3, #FFADD2)')).toBe('border-1px border-solid border="[var(--magenta-3,#FFADD2)]"')
  })

  it('border: 1px solid var(--magenta-3, #FFADD2)', () => {
    expect(toUnocss('border: 1px solid hsl(1 2 3)')).toBe('border-1px border-solid border="[hsl(1,2,3)]"')
  })

  it('border-bottom: 1px solid var(--magenta-3, #FFADD2)', () => {
    expect(toUnocss('border-bottom: 1px solid var(--magenta-3, #FFADD2)')).toBe('border-b-1px border-b-solid border-b="[var(--magenta-3,#FFADD2)]"')
    expect(toUnocssClass('border-bottom: 1px solid var(--magenta-3, #FFADD2)')[0]).toBe('border-b-1px border-b-solid border-b-[var(--magenta-3,#FFADD2)]')
  })
  it('border-width: 0 0 50px var(--xxx,10px)', () => {
    expect(toUnocss('border-width: 0 0 50px var(--xxx,10px)')).toBe('border-t-0 border-r-0 border-b-50px border-l="[var(--xxx,10px)]"')
    expect(toUnocssClass('border-width: 0 0 50px var(--xxx,10px)')[0]).toBe('border-t-0 border-r-0 border-b-50px border-l-[var(--xxx,10px)]')
  })
})
