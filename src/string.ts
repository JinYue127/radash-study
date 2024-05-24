// #region capitalize
/**
 * 将给定字符串的第一个字符转换为大写，其余字符保持小写。
 * @param str 待转换的字符串。
 * @returns 转换后的字符串。如果输入为空字符串或不存在，则返回空字符串。
 */
export const capitalize = (str: string): string => {
  // 如果字符串为空或长度为0，直接返回空字符串
  if (!str || str.length === 0) return ''
  // 将整个字符串转换为小写，以便后续操作
  const lower = str.toLowerCase()
  // 将小写字符串的第一个字符转换为大写，并与剩余的小写字符串拼接
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}
// #endregion capitalize

// #region camel
/**
 * 将给定字符串转换为驼峰命名法。
 * @param str 需要转换的字符串。可以包含大写字母、小写字母、数字、点、短横线、下划线和空格。
 * @returns 转换后的驼峰命名法字符串。如果输入为空或只包含非字母字符，则返回空字符串。
 */
export const camel = (str: string): string => {
  // 将字符串根据大写字母、点、短横线、下划线或空格分割成多个部分，并将每个部分转换为小写
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize) // 将连续的大写字母转换为小写，并在它们之间插入一个空格
      ?.split(/(?=[A-Z])|[.\-\s_]/) // 根据正则表达式分割字符串
      .map(x => x.toLowerCase()) ?? [] // 将每个部分转换为小写，如果转换后为空则返回一个空数组
  if (parts.length === 0) return '' // 如果没有有效的部分，则返回空字符串
  if (parts.length === 1) return parts[0] // 如果只有一个部分，则直接返回该部分

  // 将数组的每个部分首字母大写，并连接为一个驼峰命名法字符串
  return parts.reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}
// #endregion camel

// #region snake
/**
 * 将给定字符串转换为蛇形命名法格式。
 * @param str 要转换的字符串。
 * @param options 可选配置对象。
 * @param options.splitOnNumber 是否在数字处分割字符串，默认为 true。
 * @returns 转换后的蛇形命名法字符串。
 */
export const snake = (
  str: string,
  options?: {
    splitOnNumber?: boolean
  }
): string => {
  // 替换大写字母，分割字符串，并转换为小写。
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      .split(/(?=[A-Z])|[.\-\s_]/)
      .map(x => x.toLowerCase()) ?? []
  // 如果没有分割部分，返回空字符串。
  if (parts.length === 0) return ''
  // 如果只有一部分，直接返回该部分。
  if (parts.length === 1) return parts[0]
  // 将分割后的部分组合为蛇形命名法格式。
  const result = parts.reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`
  })
  // 根据是否在数字处分割选项，返回相应的结果。
  return options?.splitOnNumber === false
    ? result
    : result.replace(/([A-Za-z][0-9])/, val => `${val[0]!}_${val[1]!}`)
}
// #endregion snake

// #region dash
/**
 * 将给定字符串转换为连字符分隔的格式。
 * 该函数首先将字符串中的大写字母转换为小写字母，并在大写字母之前插入连字符，
 * 允许的分隔符还包括点号、短划线、下划线和空格。注意，连续的分隔符会被忽略。
 *
 * @param str 需要转换的字符串。
 * @returns 转换后的字符串，如果输入为空则返回空字符串。
 */
export const dash = (str: string): string => {
  // 将字符串分割并转换为小写，准备组合
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize) // 将大写字母转换为小写并插入连字符
      ?.split(/(?=[A-Z])|[.\-\s_]/) // 根据大写字母、点号、短划线、下划线和空格分割字符串
      .map(x => x.toLowerCase()) ?? [] // 全部转换为小写字母
  if (parts.length === 0) return '' // 如果没有分割部分，则返回空字符串
  if (parts.length === 1) return parts[0] // 如果只有一部分，则直接返回该部分
  // 如果有多部分，则通过reduce方法将它们组合成带有连字符的字符串
  return parts.reduce((acc, part) => {
    return `${acc}-${part.toLowerCase()}`
  })
}
// #endregion dash

// #region pascal
/**
 * 将给定字符串转换为 PascalCase 格式。
 * @param str 需要转换的字符串。可以包含点号、连字符、下划线或空格，这些都会被当作分隔符。
 * @returns 转换后的PascalCase字符串。如果输入为空或仅包含分隔符，则返回空字符串。
 */
export const pascal = (str: string): string => {
  // 使用正则表达式分割字符串，并转换为小写。忽略空字符串。
  const parts = str?.split(/[.\-\s_]/).map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) return ''
  // 将每个部分的首字母大写，然后连接所有部分。
  return parts.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join('')
}
// #endregion pascal

// #region title
/**
 * 根据给定的字符串生成一个标题格式的字符串。
 * - 分割字符串到单词，并对单词进行处理。
 * - 删除空字符串或只包含空格的字符串。
 * - 将每个单词的首字母大写。
 * - 用空格连接所有单词。
 *
 * @param str 输入的字符串，可以是null或undefined。
 * @returns 处理后的标题字符串。如果输入为空，返回空字符串。
 */
export const title = (str: string | null | undefined): string => {
  if (!str) return '' // 如果输入为空，直接返回空字符串

  // 使用正则表达式分割字符串，处理分隔符为大写字母前、点号、短划线、下划线或空格的情况
  return str
    .split(/(?=[A-Z])|[.\-\s_]/)
    .map(s => s.trim()) // 去除每个单词的前后空格
    .filter(s => !!s) // 删除空字符串或只包含空格的字符串
    .map(s => capitalize(s.toLowerCase())) // 将每个单词转为小写并首字母大写
    .join(' ') // 用空格连接所有单词
}
// #endregion title

// #region template
/**
 * 根据提供的数据和模板字符串，将模板字符串中的占位符替换为数据值。
 * @param str 模板字符串，其中包含以双大括号包裹的占位符。
 * @param data 一个记录了占位符名称及其对应数据值的对象。
 * @param regex 可选参数，用于匹配占位符的正则表达式，默认为 /\{\{(.+?)}}/g。
 * @returns 替换占位符后的字符串。
 */
export const template = (
  str: string,
  data: Record<string, any>,
  regex = /\{\{(.+?)}}/g
) => {
  // 使用正则表达式匹配模板字符串中的所有占位符，然后依次用数据值进行替换
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    // 替换匹配到的占位符为对应的数据值
    return acc.replace(match[0], data[match[1]])
  }, str)
}
// #endregion template

// #region trim
/**
 * 去除字符串两端指定的字符。
 * @param str 需要处理的字符串，可以是 null 或 undefined。
 * @param charsToTrim 需要去除的字符，默认为空格。这个参数中的特殊字符会被转义。
 * @returns 处理后的字符串，如果输入为 null 或 undefined，则返回空字符串。
 */
export const trim = (
  str: string | null | undefined,
  charsToTrim: string = ' '
) => {
  // 如果输入字符串为空，直接返回空字符串
  if (!str) return ''
  // 将 charsToTrim 中的特殊字符转义，用于构造正则表达式
  const toTrim = charsToTrim.replace(/\W/g, '\\$&')
  // 构造正则表达式，用于匹配并去除字符串两端的指定字符
  const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, 'g')
  // 使用正则表达式去除字符串两端的指定字符，然后返回处理后的字符串
  return str.replace(regex, '')
}
// #endregion trim
