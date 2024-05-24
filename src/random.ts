import { iterate } from './array'
// #region random
/**
 * 生成一个指定范围内的随机整数。
 * @param min - 随机数范围的最小值（包含）。
 * @param max - 随机数范围的最大值（包含）。
 * @returns 在[min, max]范围内的随机整数。
 */
export const random = (min: number, max: number) => {
  // 生成一个介于min和max（含）之间的随机整数
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// #endregion random

// #region draw
/**
 * 从数组中随机抽取一个元素。
 * @param array 一个只读数组，从中抽取元素。
 * @returns 抽取到的元素；如果数组为空，则返回 null。
 */
export const draw = <T>(array: readonly T[]): T | null => {
  const max = array.length  // 获取数组长度

  // 判断数组是否为空
  if (max === 0) {
    return null
  }

  // 生成一个随机索引，用于从数组中抽取元素
  const index = random(0, max - 1)

  // 根据随机索引返回对应的元素
  return array[index]
}
// #endregion draw

// #region shuffle
/**
 * 对给定的数组进行随机打乱操作。
 * @param array 输入的只读数组。
 * @returns 返回打乱后的数组。
 */
export const shuffle = <T>(array: readonly T[]): T[] => {
  // 首先，将数组的每个元素与一个随机数搭配，以创建一个新的中间数组
  return array
    .map(a => ({ rand: Math.random(), value: a }))
    // 然后，根据随机数对中间数组进行排序，从而实现元素的随机打乱
    .sort((a, b) => a.rand - b.rand)
    // 最后，只保留元素值，丢弃随机数，形成打乱后的数组
    .map(a => a.value)
}
// #endregion shuffle

// #region uid
/**
 * 生成指定长度的唯一标识符UID。
 * @param length 标识符的长度。
 * @param specials 可选，指定生成UID时可以包含的特殊字符，默认为空字符串。
 * @returns 返回一个指定长度的唯一标识符。
 */
export const uid = (length: number, specials: string = '') => {
  // 定义可用字符集，包括大写字母、小写字母、数字以及额外的特殊字符
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + specials
  // 生成指定长度的UID
  return iterate(
    length,
    acc => {
      // 从字符集中随机选择一个字符，并将其添加到累积结果中
      return acc + characters.charAt(random(0, characters.length - 1))
    },
    ''
  )
}
// #endregion uid
