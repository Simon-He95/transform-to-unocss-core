import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('grid', () => {
  it('grid-column: auto;', () => {
    expect(toUnocss('grid-column: auto;')).toBe('col-auto')
  })

  it('grid-column: span 2 / span 2;', () => {
    expect(toUnocss('grid-column: span 2 / span 2;')).toBe('col-span-2')
  })

  it('grid-column: span var(--xxx) / span var(--xxx);', () => {
    expect(toUnocss('grid-column: span var(--xxx) / span var(--xxx);')).toBe('col-span="[var(--xxx)]"')
  })

  it('grid-column: span 2 / span 3;', () => {
    expect(toUnocss('grid-column: span 2 / span 3;')).toBeUndefined()
  })

  it('grid-column: 1 / -1;', () => {
    expect(toUnocss('grid-column: 1 / -1;')).toBe('col-span-full')
  })

  it('grid-column-start: 1;', () => {
    expect(toUnocss('grid-column-start: 1;')).toBe('col-start-1')
  })

  it('grid-column-end: auto;', () => {
    expect(toUnocss('grid-column-end: auto;')).toBe('col-end-auto')
  })

  it('grid-template-rows: repeat(1, minmax(0, 1fr));', () => {
    expect(toUnocss('grid-template-rows: repeat(1, minmax(0, 1fr));')).toBe(
      'grid-rows-1',
    )
  })

  it('grid-template-rows: repeat(var(--xxx), minmax(0, 1fr));', () => {
    expect(toUnocss('grid-template-rows: repeat(var(--xxx), minmax(0, 1fr));')).toBeUndefined()
  })

  it('grid-template-rows: var;', () => {
    expect(toUnocss('grid-template-rows: var(--grid, repeat(1, minmax(0, 1fr));')).toBe(
      'grid-rows="[var(--grid,repeat(1,minmax(0,1fr))]"',
    )
  })

  it('grid-template-rows: none;', () => {
    expect(toUnocss('grid-template-rows: none;')).toBe('grid-rows-none')
  })

  it('grid-row: auto;', () => {
    expect(toUnocss('grid-row: auto;')).toBe('row-auto')
  })

  it('grid-row: span 1 / span 1;', () => {
    expect(toUnocss('grid-row: span 1 / span 1;')).toBe('row-span-1')
  })

  it('grid-row: 1 / -1;', () => {
    expect(toUnocss('grid-row: 1 / -1;')).toBe('row-span-full')
  })

  it('grid-row-start: 1;', () => {
    expect(toUnocss('grid-row-start: 1;')).toBe('row-start-1')
  })

  it('grid-auto-flow: row;', () => {
    expect(toUnocss('grid-auto-flow: row;')).toBe('grid-flow-row')
  })

  it('grid-auto-flow: column;', () => {
    expect(toUnocss('grid-auto-flow: column;')).toBe('grid-flow-col')
  })

  it('grid-auto-flow: column dense;', () => {
    expect(toUnocss('grid-auto-flow: column dense;')).toBe(
      'grid-flow-col-dense',
    )
  })

  it('grid-auto-flow: row dense;', () => {
    expect(toUnocss('grid-auto-flow: row dense;')).toBe('grid-flow-row-dense')
  })

  it('grid-auto-columns: auto;', () => {
    expect(toUnocss('grid-auto-columns: auto;')).toBe('auto-cols-auto')
  })

  it('grid-auto-columns: min-content;', () => {
    expect(toUnocss('grid-auto-columns: min-content;')).toBe('auto-cols-min')
  })

  it('grid-auto-columns: minmax(0, 1fr);', () => {
    expect(toUnocss('grid-auto-columns: minmax(0, 1fr);')).toBe('auto-cols-[minmax(0,1fr)]')
  })

  it('grid-auto-rows: auto;', () => {
    expect(toUnocss('grid-auto-rows: auto;')).toBe('auto-rows-auto')
  })

  it('grid-auto-rows: min-content;', () => {
    expect(toUnocss('grid-auto-rows: min-content;')).toBe('auto-rows-min')
  })

  it('grid-auto-rows: minmax(0, 1fr);', () => {
    expect(toUnocss('grid-auto-rows: minmax(0, 1fr);')).toBe('auto-rows-[minmax(0,1fr)]')
  })

  it('grid-template-columns: 60px 60px;', () => {
    expect(toUnocss('grid-template-columns: 60px 60px;')).toBe('grid-cols-[60px_60px]')
  })

  it('grid-template-rows: 60px 60px;', () => {
    expect(toUnocss('grid-template-rows: 60px 60px;')).toBe('grid-rows-[60px_60px]')
  })

  it('grid-template-columns:120px auto;', () => {
    expect(toUnocss('grid-template-columns:120px auto;')).toBe('grid-cols-[120px_auto]')
  })

  it('grid-column-start: auto;', () => {
    expect(toUnocss('grid-column-start: auto;')).toBe('col-start-auto')
  })

  it('grid-column-start: calc(<number> * -1);', () => {
    expect(toUnocss('grid-column-start: calc(<number> * -1);')).toBe('col-start="[calc(<number>*-1)]"')
  })

  it('grid-row-end: calc(<number> * -1);', () => {
    expect(toUnocss('grid-row-end: calc(<number> * -1);')).toBe('row-end="[calc(<number>*-1)]"')
  })
})
