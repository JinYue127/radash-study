import { list } from './array'
// #region series
/**
 * 为一系列项目创建一个索引和操作方法的工具集。
 * @param items 一个待处理的项目数组。
 * @param toKey 一个函数，用于将项目转换为一个键（字符串或符号），默认为项目直接转换为字符串。
 * @returns 返回一个对象，包含多个方法来操作和访问数组项目，如查找最小值、最大值、第一个和最后一个项目，以及移动到下一个或上一个项目等。
 */
export const series = <T>(
  items: T[],
  toKey: (item: T) => string | symbol = item => `${item}`
) => {
  // 使用reduce方法构建项目索引和反向索引。
  const { indexesByKey, itemsByIndex } = items.reduce(
    (acc, item, idx) => ({
      indexesByKey: {
        ...acc.indexesByKey,
        [toKey(item)]: idx
      },
      itemsByIndex: {
        ...acc.itemsByIndex,
        [idx]: item
      }
    }),
    {
      indexesByKey: {} as Record<string | symbol, number>,
      itemsByIndex: {} as Record<number, T>
    }
  )

  // 查找数组中最小项目的函数。
  const min = (a: T, b: T): T => {
    return indexesByKey[toKey(a)] < indexesByKey[toKey(b)] ? a : b
  }

  // 查找数组中最大项目的函数。
  const max = (a: T, b: T): T => {
    return indexesByKey[toKey(a)] > indexesByKey[toKey(b)] ? a : b
  }

  // 获取数组中的第一个项目。
  const first = (): T => {
    return itemsByIndex[0]
  }

  // 获取数组中的最后一个项目。
  const last = (): T => {
    return itemsByIndex[items.length - 1]
  }

  // 获取指定项目之后的下一个项目。
  const next = (current: T, defaultValue?: T): T => {
    return (
      itemsByIndex[indexesByKey[toKey(current)] + 1] ?? defaultValue ?? first()
    )
  }

  // 获取指定项目之前的上一个项目。
  const previous = (current: T, defaultValue?: T): T => {
    return (
      itemsByIndex[indexesByKey[toKey(current)] - 1] ?? defaultValue ?? last()
    )
  }

  // 移动当前项目指定的数量，循环遍历数组。
  const spin = (current: T, num: number): T => {
    if (num === 0) return current
    const abs = Math.abs(num)
    const rel = abs > items.length ? abs % items.length : abs
    return list(0, rel - 1).reduce(
      acc => (num > 0 ? next(acc) : previous(acc)),
      current
    )
  }
  // 返回包含各种操作方法的对象。
  return {
    min,
    max,
    first,
    last,
    next,
    previous,
    spin
  }
}
// #endregion series
