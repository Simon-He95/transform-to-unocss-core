import { describe, expect, it } from 'vitest'
import { transformStyleToUnocssPre } from '../src/transformer'

describe('transformStyleToUnocss', () => {
  it('transformStyleToUnocssPre', () => {
    expect(transformStyleToUnocssPre('text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp: 2;-webkit-box-orient: vertical;display: -webkit-box;color: #666666;transition: all 0.3s ease;[&:hover]|color: var(--el-color-primary);[&:hover]|text-decoration: underline;[&:hover]|transition: all 0.3s ease')).toMatchInlineSnapshot(`
      {
        "newStyle": "text-overflow: ellipsis; color: #666666; transition: all 0.3s ease; [&:hover]|color: var(--el-color-primary); [&:hover]|text-decoration: underline; [&:hover]|transition: all 0.3s ease",
        "transformedResult": "line-clamp-2",
      }
    `)
  })
})
