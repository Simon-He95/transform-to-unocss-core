import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('vertical', () => {
  it('v-text-bottom', () => {
    expect(toUnocss('vertical-align: text-bottom;')).toBe('v-text-bottom')
  })
  it('vertical-align: var(<custom-property>)', () => {
    expect(toUnocss('vertical-align: var(--property);')).toBe('v="[var(--property)]"')
  })
})
