import { describe, expect, it } from 'vitest'
import { transformStyleToUnocss } from '../src/transformStyleToUnocss'

describe('transformStyleToUnocss', () => {
  it('transformStyleToUnocss', () => {
    expect(
      transformStyleToUnocss(
        'transform-origin: center;background:red;width:100%;height:30px',
      )[0],
    ).toBe('origin-center bg-red w="[100%]" h-30px')

    expect(
      transformStyleToUnocss(
        'transform-origin: center;background:rgba(1,2,3,.5);width:100%;height:30px',
      )[0],
    ).toBe('origin-center bg="[rgba(1,2,3,.5)]" w="[100%]" h-30px')
  })
  it('--webkit-transition', () => {
    expect(transformStyleToUnocss(`-webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);`)[0]).toBe(
      'transition="all duration-0.3s cubic-bezier(0.645,0.045,0.355,1)"',
    )
  })
  it('--webkit-transition', () => {
    expect(transformStyleToUnocss(`color: #fff;
    font-size: 16px;`)[0]).toBe(
      'text="[#fff]" text-16px',
    )
  })
})
