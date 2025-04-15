const transformer: Record<string, (v: Record<string, string>) => { transformedResult: string, deleteKeys: string[] }> = {
  'line-clamp-${number}': (v: Record<string, string>) => {
    const rule: any = {
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
    }

    // 单独处理 line-clamp 相关属性，只需一个匹配即可
    const lineClampRegex = /\d/
    const hasWebkitLineClamp = v['-webkit-line-clamp'] && lineClampRegex.test(v['-webkit-line-clamp'])
    const hasLineClamp = v['line-clamp'] && lineClampRegex.test(v['line-clamp'])

    if (!hasWebkitLineClamp && !hasLineClamp) {
      return {
        transformedResult: '',
        deleteKeys: [],
      }
    }

    // 使用匹配到的值，优先使用 line-clamp
    const lineClampValue = v['line-clamp'] || v['-webkit-line-clamp']

    // 检查其他规则
    const keys = [...Object.keys(rule), '-webkit-line-clamp', 'line-clamp']
    for (const key in rule) {
      if (rule[key] instanceof RegExp ? rule[key].test(v[key]) : v[key] === rule[key]) {
        delete rule[key]
      }
    }

    if (!Object.keys(rule).length) {
      // 其他规则全部匹配成功，line-clamp 至少有一个匹配成功
      return {
        transformedResult: `line-clamp-${lineClampValue}`,
        deleteKeys: keys,
      }
    }

    return {
      transformedResult: '',
      deleteKeys: [],
    }
  },
  'line-clamp-${prop}': (v: Record<string, string>) => {
    const rule: any = {
      'overflow': 'visible',
      'display': 'block',
      '-webkit-box-orient': 'horizontal',
    }

    // 单独处理 line-clamp 相关属性，只需一个匹配即可
    const lineClampRegex = /inherit|initial|revert|unset/
    const hasWebkitLineClamp = v['-webkit-line-clamp'] && lineClampRegex.test(v['-webkit-line-clamp'])
    const hasLineClamp = v['line-clamp'] && lineClampRegex.test(v['line-clamp'])

    if (!hasWebkitLineClamp && !hasLineClamp) {
      return {
        transformedResult: '',
        deleteKeys: [],
      }
    }

    // 使用匹配到的值，优先使用 line-clamp
    const lineClampValue = v['line-clamp'] || v['-webkit-line-clamp']

    // 检查其他规则
    const keys = [...Object.keys(rule), '-webkit-line-clamp', 'line-clamp']
    for (const key in rule) {
      if (rule[key] instanceof RegExp ? rule[key].test(v[key]) : v[key] === rule[key]) {
        delete rule[key]
      }
    }

    if (!Object.keys(rule).length) {
      // 其他规则全部匹配成功，line-clamp 至少有一个匹配成功
      return {
        transformedResult: `line-clamp-${lineClampValue}`,
        deleteKeys: keys,
      }
    }

    return {
      transformedResult: '',
      deleteKeys: [],
    }
  },

}
// 提前转换一些组合的预设，比如 line-clamp-xxx
export function transformStyleToUnocssPre(styles: string) {
  const preTransformedList = []
  // 需要一次性把所有的key和value都给transformer中处理，完全匹配返回新的结果，并且把使用到的属性从原来的结果中删除
  const styleToObj = styles.split(';').reduce((r: Record<string, string>, item) => {
    const [key, value] = item.split(':')
    // 导入规则函数去转换，如果没有转换成功就返回原来的值，并且从结果中删除
    if (key.trim() && value.trim()) {
      r[key.trim()] = value.trim()
    }
    return r
  }, {})

  for (const key in transformer) {
    const { transformedResult, deleteKeys } = transformer[key](styleToObj)
    if (transformedResult && deleteKeys.length) {
      preTransformedList.push(transformedResult)
      // 删除已经转换的属性
      deleteKeys.forEach((deleteKey) => {
        delete styleToObj[deleteKey]
      })
    }
  }

  return {
    transformedResult: preTransformedList.join(' '),
    newStyle: Object.entries(styleToObj)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; '),
  }
}
