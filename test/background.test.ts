import { describe, expect, it } from 'vitest'
import { toUnocss } from '../src/toUnocss'

describe('background', () => {
  it('background:red !important', () => {
    expect(toUnocss('background:red !important')).toBe('bg-red!')
  })

  it('background with multiple', () => {
    expect(toUnocss('background:red center url("./a.jpg") !important')).toBe(
      'bg-red! bg-[position:center]! bg="[url(./a.jpg)]!"',
    )
  })

  it('background:rgb(125, 188, 234)', () => {
    expect(toUnocss('background:rgb(125, 188, 234) center center')).toBe(
      'bg="[rgb(125,188,234)]" bg-[position:center_center]',
    )
  })

  it('background:red center no-repeat url("./xxx.jpg")', () => {
    expect(toUnocss('background:red center no-repeat url("./xxx.jpg")')).toBe(
      'bg-red bg-[position:center] bg-no-repeat bg="[url(./xxx.jpg)]"',
    )
  })

  it('background-color:red', () => {
    expect(toUnocss('background-color:red')).toBe('bg-red')
  })

  it('background:#67c23a ', () => {
    expect(toUnocss('background-color:#67c23a ')).toBe('bg="[#67c23a]"')
  })

  it('background:auto', () => {
    expect(toUnocss('background:auto')).toBe('bg-auto')
  })
  // size
  it('background-size:auto', () => {
    expect(toUnocss('background-size:auto')).toBe('bg-[length:auto]')
  })

  it('background-size:28rpx 28rpx', () => {
    expect(toUnocss('background-size:28rpx 28rpx')).toBe('bg-[length:28rpx_28rpx]')
  })

  it('background-size:100% auto', () => {
    expect(toUnocss('background-size:100% auto')).toBe('bg-[length:100%_auto]')
  })

  it('background-size:100% 100%', () => {
    expect(toUnocss('background-size:100% 100%')).toBe('bg-[length:100%_100%]')
  })

  it('background-size:cover', () => {
    expect(toUnocss('background-size:cover')).toBe('bg-[length:cover]')
  })

  it('background-size:contain', () => {
    expect(toUnocss('background-size:contain')).toBe('bg-[length:contain]')
  })

  it('background-size:50%', () => {
    expect(toUnocss('background-size:50%')).toBe('bg="[length:50%]"')
  })

  it('background-size with var', () => {
    expect(toUnocss('background-size: var(--size, 50%)')).toBe('bg="[length:var(--size,50%)]"')
  })

  // attachments
  it('background-attachments:fixed', () => {
    expect(toUnocss('background-attachment:fixed')).toBe('bg-fixed')
  })

  // clip
  it('background-clip:border-box', () => {
    expect(toUnocss('background-clip:border-box')).toBe('bg-clip-border')
  })

  it('background-clip:padding-box', () => {
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

  it('background-position: 0 0, 5px 5px', () => {
    expect(toUnocss('background-position: 0 0, 5px var(--xxxx, 5px)')).toBe(
      'bg-[position:0_0,5px_var(--xxxx,5px)]',
    )
  })

  it('background: left 5% / 15% 60% repeat-x url("/shared-assets/images/examples/star.png");', () => {
    expect(toUnocss('background: left 5% / 15% 60% repeat-x   url("/shared-assets/images/examples/star.png");')).toBe(
      'bg-[position:left_5%] bg-[length:15%_60%] bg-repeat-x bg="[url(/shared-assets/images/examples/star.png)]"',
    )
  })

  it('background: 0 0, 5px 5px', () => {
    expect(toUnocss('background: 0 0, 5px 5px url("/shared-assets/images/examples/star.png") no-repeat')).toBe(
      'bg-[position:0_0,5px_5px] bg="[url(/shared-assets/images/examples/star.png)]" bg-no-repeat',
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
  it('background-image:none', () => {
    expect(toUnocss('background-image:none')).toBe('bg-none')
  })

  it('background-image: linear-gradient(to top, var(--tw-gradient-stops));', () => {
    expect(toUnocss('background-image: linear-gradient(to top, var(--tw-gradient-stops));')).toBe(
      'bg-gradient-to-t to="[var(--tw-gradient-stops)]"',
    )
  })

  it('background: red', () => {
    expect(toUnocss('background: red')).toBe('bg-red')
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

  it('background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)', () => {
    expect(
      toUnocss(
        'background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)',
      ),
    ).toBe(
      'bg="[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%)]"',
    )
  })

  it('background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%) no-repeat', () => {
    expect(
      toUnocss(
        'background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%) no-repeat',
      ),
    ).toBe(
      'bg="[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_100%)_no-repeat]"',
    )
  })

  it('background: linear-gradient(to bottom, #00ffff 0, #0ea5e9 30 ,#0066ff 100%);', () => {
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
    expect(
      toUnocss(
        'background-image: linear-gradient(90deg, rgba(39, 175, 106, 0.20) 0%, rgba(102, 216, 77, 0.20) 100%), linear-gradient(0deg, rgba(102, 215, 77, 0.16) 0%, rgba(255, 255, 255, 0.00) 100%)',
      ),
    ).toBe(
      'bg="[linear-gradient(90deg,rgba(39,175,106,0.20)_0%,rgba(102,216,77,0.20)_100%),linear-gradient(0deg,rgba(102,215,77,0.16)_0%,rgba(255,255,255,0.00)_100%)]"',
    )
    expect(
      toUnocss(
        'background-image: linear-gradient(#00a47c1a, #00a47c1a)',
      ),
    ).toBe(
      'bg-gradient-linear bg-gradient-[#00a47c1a,#00a47c1a]',
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
  it('background: var(--default, red);', () => {
    expect(
      toUnocss(
        'background: var(--default, red);',
      ),
    ).toBe(
      'bg="[var(--default,red)]"',
    )
  })
  it('background: var(--sim-col, linear-gradient(90deg, #25AE6A 0%, #68D94B 100%));', () => {
    expect(
      toUnocss(
        'background: var(--sim-col, linear-gradient(90deg, #25AE6A 0%, #68D94B 100%));',
      ),
    ).toBe(
      'bg="[var(--sim-col,linear-gradient(90deg,#25AE6A_0%,#68D94B_100%))]"',
    )
  })
  it('background: url(\'@/assets/images/guide/line.png\') no-repeat 8px 25px;', () => {
    expect(
      toUnocss(
        'background: url(\'@/assets/images/guide/line.png\') no-repeat 8px 25px;',
      ),
    ).toBe(
      'bg="[url(@/assets/images/guide/line.png)]" bg-no-repeat bg-[position:8px_25px]',
    )
    expect(
      toUnocss(
        'background: url(\'@/assets/images/guide/line.png\') 8px 25px no-repeat;',
      ),
    ).toBe(
      'bg="[url(@/assets/images/guide/line.png)]" bg-no-repeat bg-[position:8px_25px]',
    )

    expect(
      toUnocss(
        'background: url(https://p9-semi-sign.byteimg.com/tos-cn-i-acvclvrq33/58555135a82b413da78fca29c1e857f9.PNG?rk3s=521bdb00&x-expires=1744871326&x-signature=Z92x16k%2FRqWT5yU%2Fxj2poYUMZyI%3D)',
      ),
    ).toBe(
      'bg="[url(https://p9-semi-sign.byteimg.com/tos-cn-i-acvclvrq33/58555135a82b413da78fca29c1e857f9.PNG?rk3s=521bdb00&x-expires=1744871326&x-signature=Z92x16k%2FRqWT5yU%2Fxj2poYUMZyI%3D)]"',
    )
  })
})
