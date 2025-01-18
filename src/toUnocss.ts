import { align } from './align'
import { animation } from './animation'
import { aspect } from './aspect'
import { backdrop } from './backdrop'
import { background } from './background'
import { border } from './border'
import { box } from './box'
import { color } from './color'
import { column } from './column'
import { content } from './content'
import { cursor } from './cursor'
import { display } from './display'
import { empty } from './empty'
import { filter } from './filter'
import { flex } from './flex'
import { float } from './float'
import { font } from './font'
import { grid } from './grid'
import { inset } from './inset'
import { isolation } from './isolation'
import { justify } from './justify'
import { letter } from './letter'
import { line } from './line'
import { list } from './list'
import { transformMargin } from './margin'
import { max } from './max'
import { mix } from './mix'
import { object } from './object'
import { opacity } from './opacity'
import { outline } from './outline'
import { overscroll } from './overscroll'
import { place } from './place'
import { resize } from './resize'
import { row } from './row'
import { scroll } from './scroll'
import { size } from './size'
import { text } from './text'
import { top } from './top'
import { transform } from './transform'
import { transition } from './transition'
import { user } from './user'
import { browserReg, getFirstName } from './utils'
import { vertical } from './vertical'
import { white } from './white'
import { will } from './will'
import { word } from './word'
import { writing } from './writing'

const typeMap: any = {
  animation,
  aspect,
  backface: list,
  caption: list,
  column,
  columns: float,
  break: float,
  empty,
  box,
  writing,
  display,
  float,
  clear: float,
  isolation,
  object,
  overflow: float,
  overscroll,
  position: display,
  top,
  left: top,
  right: top,
  bottom: top,
  visibility: display,
  z: size,
  flex,
  order: float,
  grid,
  gap: top,
  justify,
  align,
  place,
  padding: transformMargin,
  perspective: float,
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
  vertical,
  white,
  word,
  content,
  background,
  border,
  outline,
  opacity,
  mix,
  filter,
  backdrop,
  table: list,
  transition,
  transform,
  accent: list,
  appearance: list,
  cursor,
  caret: list,
  pointer: float,
  resize,
  scroll,
  inset,
  touch: list,
  user,
  will,
  fill: float,
  stroke: list,
  color,
  row,
}
const splitReg = /([\w-]+)\s*:\s*([.\w()-\s%+'",#/!@]+)/

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
      /-([0-9.]+)px/,
      (_: string, v: string) => `-${+v / 4}`,
    ).replace(/\[[^\]]+\]/g, (match: string) => match.replace(/([0-9.]+)px/g, (_: string, v: string) => `${+v / 16}rem`))
  }

  return result
}
