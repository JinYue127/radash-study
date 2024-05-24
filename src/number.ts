// #region inRange
export function inRange(number: number, end: number): boolean
export function inRange(number: number, start: number, end: number): boolean
/**
 * 检查一个数字是否在一个指定范围内。
 * @param number 需要检查的数字。
 * @param start 范围的起始值。如果指定了 end 参数，此参数被视为起始值；否则，此参数被视为结束值，而起始值默认为 0。
 * @param end （可选）范围的结束值。如果未指定此参数，则结束值默认为 start，起始值默认为 0。
 * @returns 返回一个布尔值，如果 number 在指定的范围内（包括起始值，不包括结束值），则为 true；否则为 false。
 */
export function inRange(number: number, start: number, end?: number): boolean {
  // 检查是否进行了类型安全的调用
  const isTypeSafe =
     typeof number === 'number' &&
    typeof start === 'number' &&
    (typeof end === 'undefined' || typeof end === 'number')

  if (!isTypeSafe) {
    return false
  }

  // 当未指定结束值时，将结束值设置为起始值，起始值设置为 0
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }

  // 检查 number 是否在指定的范围内
  return number >= Math.min(start, end) && number < Math.max(start, end)
}
// #endregion inRange

// #region toFloat
/**
 * 将给定的值转换为浮点数。
 * @param value 任意类型的值，将尝试被转换为浮点数。
 * @param defaultValue 当value为null或undefined时返回的默认值，默认为0.0。
 * @returns 如果value能够成功转换为浮点数，则返回该浮点数；如果转换失败或value为null|undefined，则返回defaultValue。
 */
export const toFloat = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  // 确定默认值，默认为0.0
  const def = defaultValue === undefined ? 0.0 : defaultValue
  // 当value为null或undefined时，直接返回默认值
  if (value === null || value === undefined) {
    return def
  }
  // 尝试将value转换为浮点数
  const result = parseFloat(value)
  // 如果转换结果为NaN（非数字），则返回默认值，否则返回转换结果
  return isNaN(result) ? def : result
}
// #endregion toFloat

// #region toInt
/**
 * 将给定的值转换为整数。
 * @param value 任意类型的值，将尝试被转换为整数。
 * @param defaultValue 当value为null或undefined时返回的默认值，默认为0。
 * @returns 若value能成功转换为整数，则返回该整数值；若转换失败或value为null|undefined，则返回defaultValue。
 */
export const toInt = <T extends number | null = number>(
  value: any,
  defaultValue?: T
): number | T => {
  // 设置默认值为0，如果defaultValue未定义
  const def = defaultValue === undefined ? 0 : defaultValue
  // 当value为null或undefined时，直接返回默认值
  if (value === null || value === undefined) {
    return def
  }
  // 尝试将value转换为整数
  const result = parseInt(value)
  // 如果转换结果为NaN（非数字），则返回默认值，否则返回转换结果
  return isNaN(result) ? def : result
}
// #endregion toInt
