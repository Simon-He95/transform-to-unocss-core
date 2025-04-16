import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('animation', () => {
  it('animation-delay: 2s;', () => {
    expect(toUnocss('animation-delay:2s;')).toBe('animate-delay-2s')
  })

  it('animation: revert;', () => {
    expect(toUnocss('animation: revert;')).toBe('animate-[revert]')
  })

  it('animation-play-state: paused;', () => {
    expect(toUnocss('animation-play-state: paused;')).toBe('animate-paused')
  })

  it('animation-direction: reverse;', () => {
    expect(toUnocss(' animation-direction: reverse;')).toBe('animate-direction-reverse')
  })

  it('animation-fill-mode: forwards;', () => {
    expect(toUnocss('animation-fill-mode: forwards;')).toBe('animate-fill-forwards')
  })

  it('animation: back-in-down 1s linear 1;', () => {
    expect(toUnocss('animation: back-in-down 1s linear 1;')).toBe(
      'animate-[back-in-down] animate-duration-1s animate-ease-[linear] animate-delay-1',
    )
  })

  it('animation: 0.3s fade-in linear;', () => {
    expect(toUnocss('animation: 0.3s fade-in linear;')).toBe(
      'animate-duration-0.3s animate-[fade-in] animate-ease-[linear]',
    )
  })

  it('animation: slide-in-from-top 0.4s 0.2s ease normal', () => {
    expect(toUnocss('animation: slide-in-from-top 0.4s 0.2s ease normal')).toBe(
      'animate-[slide-in-from-top] animate-duration-0.4s animate-delay-0.2s animate-ease-[ease] animate-direction-normal',
    )
  })

  it('animation-iteration-count: infinite', () => {
    expect(toUnocss('animation-iteration-count: infinite')).toBe(
      'animate-count-infinite',
    )
  })

  it('animation-iteration-count: 2', () => {
    expect(toUnocss('animation-iteration-count: 2')).toBe(
      'animate-count-2',
    )
  })
})
