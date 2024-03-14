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
})
