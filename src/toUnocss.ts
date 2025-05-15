import { accent } from './accent'
import { align } from './align'
import { animation } from './animation'
import { appearance } from './appearance'
import { aspect } from './aspect'
import { backdrop } from './backdrop'
import { backface } from './backface'
import { background } from './background'
import { border } from './border'
import { box } from './box'
import { transformBreak } from './break'
import { caption } from './caption'
import { caret } from './caret'
import { clear } from './clear'
import { color } from './color'
import { column } from './column'
import { columns } from './columns'
import { content } from './content'
import { cursor } from './cursor'
import { display } from './display'
import { empty } from './empty'
import { fill } from './fill'
import { filter } from './filter'
import { flex } from './flex'
import { float } from './float'
import { font } from './font'
import { gap } from './gap'
import { grid } from './grid'
import { hyphens } from './hyphens'
import { inset } from './inset'
import { isolation } from './isolation'
import { justify } from './justify'
import { letter } from './letter'
import { line } from './line'
import { list } from './list'
import { transformMargin } from './margin'
import { mask } from './mask'
import { max } from './max'
import { mix } from './mix'
import { object } from './object'
import { opacity } from './opacity'
import { order } from './order'
import { outline } from './outline'
import { overflow } from './overflow.ts'
import { overscroll } from './overscroll'
import { perspective } from './perspective'
import { place } from './place'
import { pointer } from './pointer'
import { position } from './position'
import { resize } from './resize'
import { rotate } from './rotate'
import { row } from './row'
import { scroll } from './scroll'
import { size } from './size'
import { stroke } from './stroke'
import { table } from './table'
import { text } from './text'
import { top } from './top'
import { touch } from './touch'
import { transform } from './transform'
import { transition } from './transition'
import { user } from './user'
import { browserReg, getFirstName } from './utils'
import { vertical } from './vertical'
import { visibility } from './visibility'
import { white } from './white'
import { will } from './will'
import { word } from './word'
import { writing } from './writing'

const typeMap: any = {
  animation,
  aspect,
  backface,
  caption,
  column,
  columns,
  break: transformBreak,
  empty,
  box,
  writing,
  display,
  float,
  clear,
  isolation,
  object,
  overflow,
  overscroll,
  position,
  top,
  left: top,
  right: top,
  bottom: top,
  visibility,
  z: size,
  flex,
  order,
  grid,
  gap,
  justify,
  align,
  place,
  padding: transformMargin,
  perspective,
  margin: transformMargin,
  width: size,
  min: max,
  max,
  height: size,
  font,
  letter,
  line,
  list,
  text,
  mask,
  hyphens,
  vertical,
  white,
  word,
  content,
  background,
  rotate,
  border,
  outline,
  opacity,
  mix,
  filter,
  backdrop,
  table,
  transition,
  transform,
  accent,
  appearance,
  cursor,
  caret,
  pointer,
  resize,
  scroll,
  inset,
  touch,
  user,
  will,
  fill,
  stroke,
  color,
  row,
}
const splitReg = /([\w-]+)\s*:\s*([^;]+)/

export function toUnocss(css: string, isRem = false) {
  css = css.replace(browserReg, '')
  const match = css.match(splitReg)
  if (!match)
    return

  const [_, key, val] = match
  const first = getFirstName(key)
  const result = typeMap[first]?.(key, val)
  if (result && isRem) {
    return result.replace(
      /-([0-9.]+)px/g,
      (_: string, v: string) => `-${+v / 4}`,
    ).replace(/\[[^\]]+\]/g, (match: string) => match.replace(/([0-9.]+)px/g, (_: string, v: string) => `${+v / 16}rem`))
  }

  return result
}
