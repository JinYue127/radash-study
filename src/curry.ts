// #region chain
export function chain<T1 extends any[], T2, T3>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3
): (...arg: T1) => T3
export function chain<T1 extends any[], T2, T3, T4>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4
): (...arg: T1) => T4
export function chain<T1 extends any[], T2, T3, T4, T5>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5
): (...arg: T1) => T5
export function chain<T1 extends any[], T2, T3, T4, T5, T6>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6
): (...arg: T1) => T6
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7
): (...arg: T1) => T7
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8
): (...arg: T1) => T8
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9
): (...arg: T1) => T9
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
  f9: (arg: T3) => T10
): (...arg: T1) => T10
export function chain<
  T1 extends any[],
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11
>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
  f9: (arg: T3) => T10,
  f10: (arg: T3) => T11
): (...arg: T1) => T11
/**
 * 将多个函数链接在一起形成一个组合函数，依次应用输入参数到每个函数。
 * @param funcs 要链接在一起的函数数组。每个函数接收前一个函数的返回值作为参数。
 * @returns 返回一个组合函数，该函数接收初始参数，依次传递给每个函数，并返回最终结果。
 */
export function chain(...funcs: ((...args: any[]) => any)[]) {
  return (...args: any[]) => {
    // 从第二个函数开始，依次应用到前一个函数的返回值上
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
  }
}
// #endregion chain

// #region compose
export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => LastResult
  ) => (...args: F1Args) => F1Result,
  last: (...args: F1NextArgs) => LastResult
): (...args: F1Args) => F1Result

/**
 * compose函数用于将多个函数组合起来，形成一个新的函数。这个新的函数依次调用原先的函数，将最后一个函数的返回值作为整个组合函数的返回值。
 * @param f1 第一个函数，它接受一个函数作为参数并返回一个新的函数。
 * @param f2 第二个函数，它接受一个函数作为参数并返回一个新的函数。
 * @param last 最后一个函数，它接受一系列参数并返回最终的结果。
 * @returns 返回一个组合后的函数，该函数接受f1的参数，返回f1的结果。
 */
export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2Result,
  F2NextArgs extends any[],
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => LastResult
  ) => (...args: F1NextArgs) => F2Result,
  last: (...args: F2NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => LastResult
  ) => (...args: F2NextArgs) => F3Result,
  last: (...args: F3NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => LastResult
  ) => (...args: F3NextArgs) => F4Result,
  last: (...args: F4NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => LastResult
  ) => (...args: F4NextArgs) => F5Result,
  last: (...args: F5NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => LastResult
  ) => (...args: F5NextArgs) => F6Result,
  last: (...args: F6NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult
  ) => (...args: F6NextArgs) => F7Result,
  last: (...args: F7NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  F8NextArgs extends any[],
  F8Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult
  ) => (...args: F6NextArgs) => F7Result,
  f8: (
    next: (...args: F8NextArgs) => LastResult
  ) => (...args: F7NextArgs) => F8Result,
  last: (...args: F8NextArgs) => LastResult
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  F8NextArgs extends any[],
  F8Result,
  F9NextArgs extends any[],
  F9Result,
  LastResult
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult
  ) => (...args: F6NextArgs) => F7Result,
  f8: (
    next: (...args: F8NextArgs) => LastResult
  ) => (...args: F7NextArgs) => F8Result,
  f9: (
    next: (...args: F9NextArgs) => LastResult
  ) => (...args: F8NextArgs) => F9Result,
  last: (...args: F9NextArgs) => LastResult
): (...args: F1Args) => F1Result
/**
 * compose函数用于将多个函数组合成一个新的函数。
 * 新函数按照从后往前的顺序依次应用每个函数，即最先传入的函数最后应用。
 *
 * @param funcs 一个或多个函数，这些函数将被组合成一个新的函数。
 * @returns 返回一个新的函数，该函数依次应用传入的所有函数。
 */

export function compose(...funcs: ((...args: any[]) => any)[]) {
  return funcs.reverse().reduce((acc, fn) => fn(acc))
}
// #endregion compose

// #region partial
type RemoveItemsInFront<
  TItems extends any[],
  TItemsToRemove extends any[]
> = TItems extends [...TItemsToRemove, ...infer TRest] ? TRest : TItems

/**
 * 创建一个部分应用函数。
 * @param fn 要部分应用的函数，它接受一个参数数组 T 并返回结果 R。
 * @param args 要提前绑定的参数，它们是 T 参数数组的部分或全部。
 * @returns 返回一个新的函数，这个函数接受剩余参数 rest，然后调用原始函数 fn，
 *          将提前绑定的参数 args 和剩余参数 rest 一起传递给 fn。
 *
 * 该函数使用了泛型：
 * - T：原始函数接受的参数类型数组。
 * - TA：部分应用的参数类型数组，它是 T 的子集（即部分参数）。
 * - R：原始函数的返回值类型。
 *
 * 函数内部通过创建一个新的函数来实现部分应用，这个新函数接受剩余参数，
 * 然后将提前绑定的参数和剩余参数合并后传递给原始函数。
 */
export const partial = <T extends any[], TA extends Partial<T>, R>(
  fn: (...args: T) => R,
  ...args: TA
) => {
  // 创建并返回一个新的函数，该函数接受剩余参数并调用原始函数
  return (...rest: RemoveItemsInFront<T, TA>) =>
    fn(...([...args, ...rest] as T))
}
// #endregion partial

// #region partob
/**
 * 创建一个函数，该函数接受一个部分参数对象和一个剩余参数对象，然后调用一个给定的函数，
 * 将这两个对象合并后的参数传递给该给定函数。
 *
 * @param fn - 一个接受一个参数对象 T 并返回类型为 K 的函数。
 * @param argobj - 一个包含部分参数的对象，类型为 Partial<T>。
 * @returns 返回一个函数，该函数接受一个剩余参数对象（不包含 argobj 中已有的属性），
 *          然后调用 fn 函数，将两个对象合并后的结果作为参数传递给 fn。
 */
export const partob = <T, K, PartialArgs extends Partial<T>>(
  fn: (args: T) => K,
  argobj: PartialArgs
) => {
  // 返回一个函数，该函数将传入的剩余参数对象与之前的部分参数对象合并，
  // 然后调用原始函数 fn 并传入合并后的参数对象。
  return (restobj: Omit<T, keyof PartialArgs>): K =>
    fn({
      ...(argobj as Partial<T>), // 合并部分参数对象
      ...(restobj as Partial<T>) // 合并剩余参数对象
    } as T)
}
// #endregion partob

// #region proxied
/**
 * 创建一个代理对象，将对对象属性的访问委托给指定的处理函数。
 * @param handler - 一个函数，接收一个属性名（T类型），返回一个K类型的值。
 * @returns 返回一个记录（Record）对象，其属性名称为字符串类型，属性值为K类型，该对象的属性访问会被handler函数处理。
 */
export const proxied = <T, K>(
  handler: (propertyName: T) => K
): Record<string, K> => {
  // 创建一个空对象，并定义其get访问器，将属性访问委托给handler函数处理
  return new Proxy(
    {},
    {
      get: (_target, propertyName: any) => handler(propertyName)
    }
  )
}
// #endregion proxied

// #region memo
type Cache<T> = Record<string, { exp: number | null; value: T }>

/**
 * 创建一个记忆化函数，缓存函数调用的结果，以减少重复计算。
 * @param cache 用于存储函数调用结果的缓存对象。
 * @param func 需要被记忆化的函数。
 * @param keyFunc 用于生成缓存键的函数，如果为null，则默认使用JSON.stringify({args})。
 * @param ttl 缓存条目的有效期（单位：毫秒），如果为null，则缓存条目不会过期。
 * @returns 返回一个经过记忆化处理的函数。
 */
const memoize = <TArgs extends any[], TResult>(
  cache: Cache<TResult>,
  func: (...args: TArgs) => TResult,
  keyFunc: ((...args: TArgs) => string) | null,
  ttl: number | null
) => {
  return function callWithMemo(...args: any): TResult {
    // 生成缓存键
    const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args })
    const existing = cache[key]

    // 若缓存命中且未过期，则直接返回缓存结果
    if (existing !== undefined) {
      if (!existing.exp) return existing.value
      if (existing.exp > new Date().getTime()) {
        return existing.value
      }
    }

    // 缓存未命中或已过期，调用原始函数并更新缓存
    const result = func(...args)
    cache[key] = {
      exp: ttl ? new Date().getTime() + ttl : null,
      value: result
    }
    return result
  }
}

/**
 * 创建一个记忆化版本的函数，缓存函数的结果以提高性能。
 * @param func 需要被记忆化的函数，它接受任意数量的参数并返回一个结果。
 * @param options 配置对象，可选。
 * @param options.key 一个函数，用于生成调用原函数时的参数的唯一标识符。如果未提供，则默认为null。
 * @param options.ttl 缓存条目的时间戳，单位为毫秒。如果设置了该值，缓存条目将在指定的时间后过期。如果未提供，则默认为null。
 * @returns 返回一个经过记忆化处理的函数。
 */
export const memo = <TArgs extends any[], TResult>(
  func: (...args: TArgs) => TResult,
  options: {
    key?: (...args: TArgs) => string
    ttl?: number
  } = {}
) => {
  // 使用memoize函数创建记忆化版本的func，根据提供的options配置缓存行为
  return memoize({}, func, options.key ?? null, options.ttl ?? null) as (
    ...args: TArgs
  ) => TResult
}
// #endregion memo

// #region debounce
/**
 * 定义一个防抖函数的类型。
 * 防抖函数是一种技术，它用于确保一个函数不会在一定时间内被频繁调用。
 * 这个类型包括函数本身和几个额外的方法来控制函数的调用。
 *
 * @param TArgs 一个泛型数组，表示函数接受的参数类型。
 * @returns 返回一个对象，包含了一个可调用的函数和几个控制方法。
 */
export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void // 函数本身，接受泛型参数。

  cancel(): void // 取消函数的执行，防止它在防抖时间内被执行。
  isPending(): boolean // 检查函数是否正在等待执行。
  flush(...args: TArgs): void // 立即执行函数，忽略防抖逻辑。
}

/**
 * 函数防抖动封装。
 * 函数防抖是一种优化技术，用于限制函数调用的频率。当一个函数连续调用时，防抖函数会推迟该函数的执行，直到调用停止超过指定的延迟时间。
 *
 * @param {Object} 配置对象，包含一个`delay`属性，指定防抖动的延迟时间（毫秒）。
 * @returns {DebounceFunction<TArgs>} 返回一个经过防抖动处理的函数。
 *
 * @typeparam TArgs 函数参数的类型数组。
 * @param func
 */
export const debounce = <TArgs extends any[]>(
  { delay }: { delay: number },
  func: (...args: TArgs) => any
): DebounceFunction<TArgs> => {
  // 定义一个变量来存储计时器的ID，初始为undefined。
  // @ts-expect-error:''
  let timer: NodeJS.Timeout | undefined = undefined
  // 使用`active`标志位控制函数是否可以执行。
  let active = true

  // 防抖动的函数。
  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    // 如果`active`为true，则清除当前的计时器，并设置新的计时器。
    if (active) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        // 当计时器结束时，如果`active`仍为true，则执行原函数。
        active && func(...args)
        // 清除计时器ID。
        timer = undefined
      }, delay)
    } else {
      // 如果`active`为false，则直接执行原函数。
      func(...args)
    }
  }

  // 提供一个方法来检查防抖动函数是否还在等待执行。
  debounced.isPending = () => {
    return timer !== undefined
  }

  // 提供一个方法来取消防抖动函数的执行。
  debounced.cancel = () => {
    active = false
  }

  // 提供一个方法来立即执行原函数。
  debounced.flush = (...args: TArgs) => func(...args)

  return debounced
}
// #endregion debounce

// #region throttle
/**
 * 定义一个节流函数的类型。
 * 节流函数用于限制函数调用的频率，确保在一定时间内只调用一次。
 *
 * @param TArgs 一个泛型数组，表示函数接受的参数类型。
 * @returns 返回一个对象，包含了一个可调用的函数和一个状态检查方法。
 */
export type ThrottledFunction<TArgs extends any[]> = {
  (...args: TArgs): void // 函数本身，接受泛型参数。

  isThrottled(): boolean // 检查函数是否被节流，即是否在规定时间内无法再次调用。
}
/**
 * 函数节流器
 * @param {Object} config 配置对象，包含一个interval属性，指定节流间隔时间（毫秒）
 * @param {Function} func 需要节流的函数，接受泛型参数TArgs，返回任意类型
 * @returns {ThrottledFunction<TArgs>} 返回一个节流后的函数，和一个判断当前函数是否被节流的方法isThrottled
 */
export const throttle = <TArgs extends any[]>(
  { interval }: { interval: number },
  func: (...args: TArgs) => any
): ThrottledFunction<TArgs> => {
  let ready = true
  // @ts-expect-error:''
  let timer: NodeJS.Timeout | undefined = undefined

  const throttled: ThrottledFunction<TArgs> = (...args: TArgs) => {
    // 如果当前处于非就绪状态，则直接返回，不执行原函数
    if (!ready) return
    // 执行原函数
    func(...args)
    // 设置就绪状态为false，准备进入节流期
    ready = false
    // 设置定时器，在指定间隔时间后将就绪状态设置为true
    timer = setTimeout(() => {
      ready = true
      // 清除定时器，避免内存泄漏
      timer = undefined
    }, interval)
  }
  // 提供一个方法用于判断当前函数是否被节流（即是否在节流期内）
  throttled.isThrottled = () => {
    return timer !== undefined
  }
  return throttled
}
// #endregion throttle

// #region callable
/**
 * 将一个对象和一个函数组合起来，使该对象同时具有函数的调用能力和对象属性的访问/修改能力。
 * @param obj 要组合的对象，其属性可以被访问和修改。
 * @param fn 一个函数，接收当前对象作为参数，返回一个函数，这个返回的函数即为最终可被调用的函数。
 * @returns 返回一个新对象，该对象同时是原对象和可调用函数的结合体。
 */
export const callable = <
  TValue,
  TObj extends Record<string | number | symbol, TValue>,
  TFunc extends (...args: any) => any
>(
  obj: TObj,
  fn: (self: TObj) => TFunc
): TObj & TFunc => {
  const FUNC = () => {
  } // 创建一个空的函数，作为最终返回对象的基础。
  return new Proxy(Object.assign(FUNC, obj), {
    get: (target, key: string) => target[key], // 处理对象属性的获取。
    set: (target, key: string, value: any) => {
      ;(target as any)[key] = value // 处理对象属性的设置。
      return true
    },
    apply: (target, _self, args) => fn(Object.assign({}, target))(...args) // 处理函数的调用。
  }) as unknown as TObj & TFunc
}
// #endregion callable
