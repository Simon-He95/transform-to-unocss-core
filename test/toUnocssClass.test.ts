import { describe, expect, it } from 'vitest'
import { toUnocssClass } from '../src/toUnocssClass'

describe('toUnocssClass', () => {
  it('toUnocssClass', () => {
    expect(
      toUnocssClass(
        'transform-origin: center;background:red;width:100%;height:30px',
      )[0],
    ).toBe('origin-center bg-red w-[100%] h-30px')

    expect(
      toUnocssClass(
        'transform-origin: center;background:rgba(1,2,3,.5);width:100%;height:30px',
      )[0],
    ).toBe('origin-center bg-[rgba(1,2,3,.5)] w-[100%] h-30px')

    expect(
      toUnocssClass(
        'height: 100%; transform: scale(1.5);',
      )[0],
    ).toBe('h-[100%] scale-150')
  })
})
