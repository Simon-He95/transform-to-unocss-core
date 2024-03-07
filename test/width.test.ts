import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('width', () => {
  it('px', () => {
    expect(toUnocss('width:10px')).toBe('w-10px')
  })
  it('%', () => {
    expect(toUnocss('width: 100%')).toBe('w="[100%]"')
  })
  it('em', () => {
    expect(toUnocss('width:10em')).toBe('w-10em')
  })
  it('rem', () => {
    expect(toUnocss('width:10rem')).toBe('w-10rem')
  })
  it('max-content', () => {
    expect(toUnocss('width: max-content')).toBe('w-max')
  })
  it('min-content', () => {
    expect(toUnocss('width: min-content')).toBe('w-min')
  })
  it('fit-content', () => {
    expect(toUnocss('width:fit-content')).toBe('w-fit')
  })
  it('auto', () => {
    expect(toUnocss('width:auto')).toBe('w-auto')
  })
  it('calc', () => {
    expect(toUnocss('width:calc(100% - 50px)')).toBe('w="[calc(100%-50px)]"')
  })
  it('calc not space', () => {
    expect(toUnocss('width:calc(100%-50px)')).toBe('w="[calc(100%-50px)]"')
  })

  it('calc space', () => {
    expect(toUnocss('width:calc(100%  -  50px)')).toBe('w="[calc(100%-50px)]"')
  })

  it('min-width: 0px;', () => {
    expect(toUnocss('min-width: 0px;')).toBe('min-w-0px')
  })

  it('min-width: 0px;', () => {
    expect(toUnocss('min-width: 100%;')).toBe('min-w="[100%]"')
  })
  it('min-width calc', () => {
    expect(toUnocss('min-width:calc(100% - 50px)')).toBe('min-w="[calc(100%-50px)]"')
  })
  it('min-width calc not space', () => {
    expect(toUnocss('min-width:calc(100%-50px)')).toBe('min-w="[calc(100%-50px)]"')
  })

  it('min-width calc space', () => {
    expect(toUnocss('min-width:calc(100%  -  50px)')).toBe('min-w="[calc(100%-50px)]"')
  })

  it('max-width: 0px;', () => {
    expect(toUnocss('max-width: 0px;')).toBe('max-w-0px')
  })
  it('max-width: 0px;', () => {
    expect(toUnocss('max-width: max-content;')).toBe('max-w-max')
  })

  it('max-width calc', () => {
    expect(toUnocss('max-width:calc(100% - 50px)')).toBe('max-w="[calc(100%-50px)]"')
  })
  it('max-width calc not space', () => {
    expect(toUnocss('max-width:calc(100%-50px)')).toBe('max-w="[calc(100%-50px)]"')
  })

  it('max-width calc space', () => {
    expect(toUnocss('max-width:calc(100%  -  50px)')).toBe('max-w="[calc(100%-50px)]"')
  })
})
