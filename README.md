## transform-to-unocss-core
从[transform-to-unocss](https://github.com/Simon-He95/transformToUnocss)中抽离出核心代码，方便直接在浏览器中调用

## Api
- toUnocss
  - 用于行内属性
  - 使用：toUnocss('width:100px', isRem) isRem 为true时，会将px转换为rem
- transformStyleToUnocss
  - 用于行内属性
  - 使用：transformStyleToUnocss("width:100px;height:100px;") isRem 为true时，会将px转换为rem[100px]"
- toUnocssClass
  - 用于类名
  - 使用：toUnocssClass('width:100px', isRem) isRem 为true时，isRem 为true时，会将px转换为rem

## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

<span><div align="center">![sponsors](https://www.hejian.club/images/sponsors.jpg)</div></span>
