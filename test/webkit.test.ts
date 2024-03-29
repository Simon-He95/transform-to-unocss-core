import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('-webkit', () => {
  it('-webkit', () => {
    expect(toUnocss('-webkit-box-flex:1')).toMatchInlineSnapshot('undefined')
  })
})
