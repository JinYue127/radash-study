// #region isFunction
/**
 * 检查一个值是否为函数。
 * @param value 任意类型的值，需要被检查是否为函数。
 * @returns 返回一个布尔值，如果 value 是函数，则返回 true，否则返回 false。
 */
export const isFunction = (value: any): value is (i: number) => any => {
  // 通过检查 value 是否拥有 constructor、call 和 apply 属性来确定它是否为函数
  return !!(value && value.constructor && value.call && value.apply)
}
// #endregion isFunction

// #region isArray
/**
 * 检查一个值是否为数组。
 * @param value 需要检查的任意值。
 * @returns 返回一个布尔值，如果 value 是数组，则返回 true，否则返回 false。
 */
export const isArray = Array.isArray
// #endregion isArray

// #region isPromise
/**
 * 检查一个值是否为Promise对象。
 * @param value 任意类型的值，需要检查是否为Promise对象。
 * @returns 返回一个布尔值，如果该值是Promise对象，则为true；否则为false。
 */
export const isPromise = (value: any): value is Promise<any> => {
  // 当值为false或undefined等非对象类型时，直接返回false
  if (!value) return false
  // 如果值没有then方法，那么它肯定不是Promise
  if (!value.then) return false
  // 判断value的then方法是否为函数，若是，则认定为Promise对象
  return isFunction(value.then);
}
// #endregion isPromise

// #region isSymbol
/**
 * 检查一个值是否为Symbol类型。
 * @param value 任意类型的值，需要检查是否为Symbol类型。
 * @returns 返回一个布尔值，如果该值是Symbol类型，则为true；否则为false。
 */
export const isSymbol = (value: any): value is symbol => {
  // 检查value是否存在且其构造函数为Symbol
  return !!value && value.constructor === Symbol
}
// #endregion isSymbol

// #region isObject
/**
 * 检查一个值是否为对象类型。
 * @param value 任意类型的值，需要被检查是否为对象类型。
 * @returns 返回一个布尔值，如果该值是对象类型，则为true；否则为false。
 */
export const isObject = (value: any): value is object => {
  // 通过判断值是否存在以及其构造函数是否为Object来确定是否为对象类型
  return !!value && value.constructor === Object
}
// #endregion isObject

// #region isPrimitive
/**
 * 判断给定的值是否为原始值。
 * 原始值包括：undefined、null、以及不是对象或函数的其他类型（如字符串、数字等）。
 * @param value 任意类型的值，用于判断是否为原始值。
 * @returns 返回一个布尔值，表示给定的值是否为原始值。若是原始值，则返回true；否则返回false。
 */
export const isPrimitive = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    // 判断value既不是对象也不是函数
    (typeof value !== 'object' && typeof value !== 'function')
  )
}
// #endregion isPrimitive

// #region isString
/**
 * 检查一个值是否为字符串类型。
 * @param value 任意类型的值，需要检查是否为字符串。
 * @returns 返回一个布尔值，如果该值是字符串类型，则为true；否则为false。
 */
export const isString = (value: any): value is string => {
  // 检查value是否为字符串类型或String对象的实例
  return typeof value === 'string' || value instanceof String
}
// #endregion isString

// #region isInt
/**
 * 检查一个值是否为整数。
 * @param value 任意类型的值，需要检查是否为整数。
 * @returns 返回一个布尔值，如果该值是整数，则为true；否则为false。
 */
export const isInt = (value: any): value is number => {
  // 先检查是否为数字，然后再判断是否为整数
  return isNumber(value) && value % 1 === 0
}
// #endregion isInt

// #region isFloat
/**
 * 检查一个值是否为浮点数。
 * @param value 任意类型的值，需要检查是否为浮点数。
 * @returns 返回一个布尔值，如果该值是浮点数，则为true；否则为false。
 */
export const isFloat = (value: any): value is number => {
  // 先检查是否为数字，然后再判断是否不是整数，从而确定是否为浮点数
  return isNumber(value) && value % 1 !== 0
}
// #endregion isFloat

// #region isNumber
/**
 * 检查一个值是否为数字。
 * @param value 任意类型的值，需要被检查是否为数字。
 * @returns 返回一个布尔值，如果该值为数字则为true，否则为false。
 */
export const isNumber = (value: any): value is number => {
  try {
    // 尝试将值转换为数字，并检查转换后的值是否与原值相等
    return Number(value) === value
  } catch {
    // 如果在转换过程中发生异常，则返回false
    return false
  }
}
// #endregion isNumber

// #region isDate
/**
 * 检查一个值是否为Date对象。
 * @param value 任意类型的值，需要检查是否为Date对象。
 * @returns 返回一个布尔值，如果该值是Date对象，则为true；否则为false。
 */
export const isDate = (value: any): value is Date => {
  // 使用Object.prototype.toString.call方法检查value的类型是否为[object Date]
  return Object.prototype.toString.call(value) === '[object Date]'
}
// #endregion isDate

// #region isEmpty
/**
 * 检查提供的值是否为空。
 * @param value 任意类型的值，将被检查是否为空。
 * @returns 返回一个布尔值，指示传入的值是否为空。对于布尔值、null、undefined、数字0、空日期对象，
 * 以及空数组或对象，均视为为空。
 */
export const isEmpty = (value: any) => {
  // 检查布尔值、null、undefined
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  // 检查数字，包括0
  if (isNumber(value)) return value === 0
  // 检查日期对象，空日期对象被认为是空
  if (isDate(value)) return isNaN(value.getTime())
  // 函数不为空
  if (isFunction(value)) return false
  // 符号不为空
  if (isSymbol(value)) return false
  // 检查长度属性，如数组或字符串的长度
  const length = (value as any).length
  if (isNumber(length)) return length === 0
  // 检查大小属性，如Map或Set的大小
  const size = (value as any).size
  if (isNumber(size)) return size === 0
  // 检查对象的键的数量
  const keys = Object.keys(value).length
  return keys === 0
}
// #endregion isEmpty

// #region isEqual
/**
 * 比较两个值是否相等。
 * @param x 第一个要比较的值。
 * @param y 第二个要比较的值。
 * @returns 如果两个值相等，则返回true；否则返回false。
 *
 * 该函数通过多种方式来判断两个值是否相等：
 * 1. 使用`Object.is`方法比较两个值；
 * 2. 如果两个值都是Date对象，比较它们的时间戳；
 * 3. 如果两个值都是RegExp对象，比较它们的字符串表示；
 * 4. 如果两个值都是对象，比较它们的键和值；
 * 5. 如果两个值都不是对象或其中一个为null，直接比较它们的严格相等性。
 */
export const isEqual = <TType>(x: TType, y: TType): boolean => {
  if (Object.is(x, y)) return true // 使用Object.is标准方法比较两个值

  // 比较两个Date对象的时间戳
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime()
  }

  // 比较两个RegExp对象的字符串表示
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString()
  }

  // 如果x或y不是对象或其中一个为null，判定为不相等
  if (
    typeof x !== 'object' ||
    x === null ||
    typeof y !== 'object' ||
    y === null
  ) {
    return false
  }

  // 比较两个对象的键和值
  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[]
  const keysY = Reflect.ownKeys(y as unknown as object)
  if (keysX.length !== keysY.length) return false // 如果键的数量不相等，判定为不相等

  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i])) return false // 如果y缺少x中存在的键，判定为不相等
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false // 递归比较每个键对应的值
  }
  return true
}
// #endregion isEqual
