import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'
describe('background', () => {
  it('background:red !important', () => {
    expect(toUnocss('background:red !important')).toBe('bg="red!"')
  })

  it('background:red !important', () => {
    expect(toUnocss('background:red center url("./a.jpg") !important')).toBe(
      'bg="red center [url(./a.jpg)]!"',
    )
  })

  it('background:rgb(125, 188, 234)', () => {
    expect(toUnocss('background:rgb(125, 188, 234) center')).toBe(
      'bg="[rgb(125,188,234)] center"',
    )
  })

  it('background:red center no-repeat url("./xxx.jpg")', () => {
    expect(toUnocss('background:red center no-repeat url("./xxx.jpg")')).toBe(
      'bg="red center no-repeat [url(./xxx.jpg)]"',
    )
  })

  it('background-color:red', () => {
    expect(toUnocss('background-color:red')).toBe('bg-red')
  })

  it('background:#67c23a ', () => {
    expect(toUnocss('background-color:#67c23a ')).toBe('bg="[#67c23a]"')
  })

  it('background:auto', () => {
    expect(toUnocss('background:auto')).toBe('bg="auto"')
  })
  // size
  it('background-size:auto', () => {
    expect(toUnocss('background-size:auto')).toBe('bg-auto')
  })

  it('background-size:cover', () => {
    expect(toUnocss('background-size:cover')).toBe('bg-cover')
  })

  it('background-size:contain', () => {
    expect(toUnocss('background-size:contain')).toBe('bg-contain')
  })

  // attachments
  it('background-attachments:fixed', () => {
    expect(toUnocss('background-attachment:fixed')).toBe('bg-fixed')
  })

  // clip
  it('background-clip:border-box', () => {
    expect(toUnocss('background-clip:border-box')).toBe('bg-clip-border')
  })

  it('background-clip:border-box', () => {
    expect(toUnocss('background-clip:padding-box')).toBe('bg-clip-padding')
  })

  it('background-clip:test', () => {
    expect(toUnocss('background-clip:test')).toBe('bg-clip-test')
  })

  // position
  it('background-position:center', () => {
    expect(toUnocss('background-position:center')).toBe('bg-center')
  })

  it('background-position:center center', () => {
    expect(toUnocss('background-position:center center')).toBe(
      'bg-center-center',
    )
  })

  // repeats
  it('background-repeat:repeat', () => {
    expect(toUnocss('background-repeat:repeat')).toBe('bg-repeat')
  })

  it('background-repeat:no-repeat', () => {
    expect(toUnocss('background-repeat:no-repeat')).toBe('bg-no-repeat')
  })

  it('background-repeat:repeat-x', () => {
    expect(toUnocss('background-repeat:repeat-x')).toBe('bg-repeat-x')
  })

  it('background-repeat:inherit', () => {
    expect(toUnocss('background-repeat:inherit')).toBe('bg-repeat-inherit')
  })

  // origins
  it('background-origin:border-box', () => {
    expect(toUnocss('background-origin:border-box')).toBe('bg-origin-border')
  })

  it('background-origin:inherit', () => {
    expect(toUnocss('background-origin:inherit')).toBe('bg-origin-inherit')
  })

  // image
  it.only('background-image:none', () => {
    expect(toUnocss('background-image:none')).toBe('bg-none')
  })

  it('background-image:url(\'picture.png\')', () => {
    expect(toUnocss('background-image:url(\'picture.png\')')).toBe(
      'bg="[url(picture.png)]"',
    )
  })

  it('background: red', () => {
    expect(toUnocss('background: red')).toBe('bg="red"')
  })

  it('background: url("../aa.jpg")', () => {
    expect(toUnocss('background: url("../aa.jpg")')).toBe(
      'bg="[url(../aa.jpg)]"',
    )
  })

  it('background-blend-mode: normal;', () => {
    expect(toUnocss('background-blend-mode: normal;')).toBe('bg-blend-normal')
  })

  it('background: linear-gradient to top', () => {
    expect(
      toUnocss(
        'background: linear-gradient(to top, rgba(255, 255, 255), cyan);',
      ),
    ).toBe('bg-gradient-to-t from="[rgba(255,255,255)]" to="cyan"')
  })

  it('background: linear-gradient(to left top, black, cyan);', () => {
    expect(
      toUnocss('background: linear-gradient(to left top, black, cyan);'),
    ).toBe('bg-gradient-to-lt from="black" to="cyan"')
  })

  // unocss 支持 to-10% from-10%
  it('background: linear-gradient(to bottom, #00ffff 0%, #0066ff 100%);', () => {
    expect(
      toUnocss(
        'background: linear-gradient(to bottom, #00ffff 0%, #0066ff 100%);',
      ),
    ).toBe('bg-gradient-to-b from="#00ffff 0%" to="#0066ff 100%"')
  })

  it('background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 ,#0066ff 100%);', () => {
    expect(
      toUnocss(
        'background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 ,#0066ff 100%);',
      ),
    ).toBe('bg-gradient-to-b from="#00ffff 0" via="#0ea5e9" to="#0066ff 100%"')
  })

  it('background: linear-gradient(to bottom right, #00ffff 0, #0ea5e9 ,#0066ff 100%);', () => {
    expect(
      toUnocss(
        'background: linear-gradient(to bottom right, #00ffff 10 , #0ea5e9 20%,#0066ff 50%);',
      ),
    ).toBe(
      'bg-gradient-to-br from="#00ffff 10" via="#0ea5e9 20%" to="#0066ff 50%"',
    )
  })

  it('background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 ,#0066ff 100%);', () => {
    expect(
      toUnocss(
        'background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 30 ,#0066ff 100%);',
      ),
    ).toBe(
      'bg-gradient-to-b from="#00ffff 0" via="#0ea5e9 30" to="#0066ff 100%"',
    )
  })

  it('background: conic-gradient(#fff 0.25turn, #000 0.25turn 0.5turn, #fff 0.5turn 0.75turn);', () => {
    expect(
      toUnocss(
        'background: conic-gradient(#fff 0.25turn, #000 0.25turn 0.5turn, #fff 0.5turn 0.75turn);',
      ),
    ).toBe(
      'bg-gradient-conic from="#fff 0.25turn" via="#000 0.25turn" to="#fff 0.5turn"',
    )
  })
  it('background-image: linear-gradient;', () => {
    expect(
      toUnocss(
        'background-image: linear-gradient(180deg, rgba(48,206,64,0,12) 0%, rgba(48,206,64,0.00) 100%);',
      ),
    ).toBe(
      'bg-gradient-linear bg-gradient-[180deg,rgba(48,206,64,0,12)_0%,rgba(48,206,64,0.00)_100%]',
    )
  })

  it('background-color: var(--default, red);', () => {
    expect(
      toUnocss(
        'background-color: var(--default, red);',
      ),
    ).toBe(
      'bg="[var(--default,red)]"',
    )
  })
})
