import { isArray, isPromise } from './typed'
import { fork, list, range, sort } from './array'
// #region reduce
/**
 * 异步reduce函数，用于对数组进行累积计算。
 * @param array 一个只读数组，是需要进行累积计算的输入。
 * @param asyncReducer 一个异步函数，用于定义每一步的计算规则。它接收当前累积值、当前元素和当前元素的索引作为参数，并返回一个新的累积值。
 * @param initValue 可选参数，定义累积计算的初始值。如果未提供且输入数组为空，则会抛出错误。
 * @returns 返回一个Promise，解析为最终的累积值。
 */
export const reduce = async <T, K>(
  array: readonly T[],
  asyncReducer: (acc: K, item: T, index: number) => Promise<K>,
  initValue?: K
): Promise<K> => {
  // 检查是否提供了初始值，以及是否尝试在空数组上进行reduce操作
  const initProvided = initValue !== undefined
  if (!initProvided && array?.length < 1) {
    throw new Error('Cannot reduce empty array with no init value')
  }

  // 根据是否提供初始值来确定迭代的起点
  const iter = initProvided ? array : array.slice(1)
  let value: any = initProvided ? initValue : array[0]

  // 迭代数组，对每个元素应用asyncReducer函数
  for (const [i, item] of iter.entries()) {
    value = await asyncReducer(value, item, i)
  }

  return value
}
// #endregion reduce

// #region map
/**
 * 对给定的数组进行异步映射操作。
 * @param array 输入的只读数组。
 * @param asyncMapFunc 对数组中每个元素执行的异步函数，接收当前元素和其索引作为参数，返回一个Promise。
 * @returns 返回一个Promise，该Promise解析为一个由asyncMapFunc处理后的新元素组成的数组。
 */
export const map = async <T, K>(
  array: readonly T[],
  asyncMapFunc: (item: T, index: number) => Promise<K>
): Promise<K[]> => {
  if (!array) return [] // 如果输入数组为空，则直接返回空数组
  const result = [] // 初始化结果数组
  let index = 0 // 初始化索引
  // 遍历数组中的每个元素
  for (const value of array) {
    const newValue = await asyncMapFunc(value, index++) // 异步处理当前元素，并递增索引
    result.push(newValue) // 将处理后的新值添加到结果数组中
  }
  return result // 返回最终结果数组
}
// #endregion map

// #region tryit
/**
 * 尝试执行一个函数，并处理其返回值或异常。
 *
 * @param func 一个接受任意参数并返回特定值或Promise的函数。
 * @returns 返回一个函数，该函数接受与`func`相同的参数，然后执行`func`。
 *          如果`func`返回一个Promise，则返回的也是一个Promise，
 *          解析为`[Error, undefined] | [undefined, Awaited<Return>]`格式。
 *          如果`func`抛出异常，会捕获异常并以`[err, undefined]`的形式返回。
 *          如果`func`执行正常，会返回`[undefined, result]`的形式。
 *
 * @template Args 函数`func`接受的参数类型数组。
 * @template Return 函数`func`的返回值类型，支持Promise。
 */
export const tryit = <Args extends any[], Return>(
  func: (...args: Args) => Return
) => {
  return (
    ...args: Args
  ): Return extends Promise<any>
    ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
    : [Error, undefined] | [undefined, Return] => {
    try {
      // 尝试执行函数`func`，并处理其返回值。
      const result = func(...args)
      if (isPromise(result)) {
        // 如果`func`返回一个Promise，则返回该Promise，
        // 通过Promise链处理成功和失败的情况。
        return result
          .then(value => [undefined, value])
          .catch(err => [err, undefined]) as Return extends Promise<any>
          ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
          : [Error, undefined] | [undefined, Return]
      }
      // 如果`func`返回非Promise值，直接返回该值。
      return [undefined, result] as Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return]
    } catch (err) {
      // 如果执行过程中抛出异常，捕获异常并返回。
      return [err as any, undefined] as Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return]
    }
  }
}
// #endregion tryit

// #region defer
/**
 * 延迟执行函数，直到调用注册的回调函数来触发执行，并处理可能的错误。
 * @param func 一个接受注册函数作为参数并返回一个Promise的函数。该注册函数用于注册一个处理错误和结果的回调。
 * @returns 返回一个Promise，该Promise在注册的回调被调用且处理完可能的错误后解决。
 */
export const defer = async <TResponse>(
  func: (
    register: (
      fn: (error?: any) => any,
      options?: { rethrow?: boolean }
    ) => void
  ) => Promise<TResponse>
): Promise<TResponse> => {
  // 用于存储所有注册的回调函数及其选项的数组
  const callbacks: {
    fn: (error?: any) => any
    rethrow: boolean
  }[] = []

  // 注册函数，用于将回调函数和选项添加到callbacks数组中
  const register = (
    fn: (error?: any) => any,
    options?: { rethrow?: boolean }
  ) => callbacks.push({
    fn,
    rethrow: options?.rethrow ?? false
  })

  // 尝试执行传入的函数，并捕获可能的错误和响应
  const [err, response] = await tryit(func)(register)

  // 遍历所有注册的回调，执行它们并处理可能的重新抛出的错误
  for (const { fn, rethrow } of callbacks) {
    const [rethrown] = await tryit(fn)(err)
    if (rethrown && rethrow) throw rethrown
  }

  // 如果存在错误，则抛出错误；否则，返回响应
  if (err) throw err
  return response
}
// #endregion defer

// #region parallel
type WorkItemResult<K> = {
  index: number
  result: K
  error: any
}

/**
 * 定义了一个AggregateError类，用于管理和报告多个错误。
 * 这个类扩展自JavaScript的原生Error类，添加了对多个错误的聚合处理。
 */
export class AggregateError extends Error {
  errors: Error[] // 存储导致聚合错误的多个子错误对象

  /**
   * 构造函数初始化AggregateError实例。
   * @param errors {Error[]} - （可选）一个包含多个Error对象的数组，默认为空数组。
   */
  constructor(errors: Error[] = []) {
    super() // 调用父类的构造函数
    // 从传入的错误数组中找到第一个非空的错误名，并用其构造聚合错误名
    const name = errors.find(e => e.name)?.name ?? ''
    this.name = `AggregateError(${name}...)`
    // 构造聚合错误的消息，包含子错误的数量
    this.message = `AggregateError with ${errors.length} errors`
    // 尝试使用数组中第一个提供堆栈跟踪的错误对象的堆栈信息，如果不存在则使用当前错误的堆栈信息
    this.stack = errors.find(e => e.stack)?.stack ?? this.stack
    this.errors = errors // 保存传入的错误数组
  }
}

/**
 * 并行处理数组中的元素。
 * @param limit 并行处理的任务数限制。
 * @param array 待处理的数组，元素类型为 T。
 * @param func 对数组中每个元素执行的异步函数，返回结果类型为 K。
 * @returns 返回一个 Promise，该 Promise 解析为处理结果数组，元素类型为 K。
 */
export const parallel = async <T, K>(
  limit: number,
  array: readonly T[],
  func: (item: T) => Promise<K>
): Promise<any[]> => {
  // 准备工作项：为每个数组元素创建一个包含索引和元素本身的工作项。
  const work = array.map((item, index) => ({
    index,
    item
  }))

  // 定义一个处理器，异步地处理工作项直到工作队列为空。
  const processor = async (res: (value: WorkItemResult<K>[]) => void) => {
    const results: WorkItemResult<K>[] = []
    while (true) {
      const next = work.pop()
      if (!next) return res(results) // 当没有更多工作项时，结束处理器并返回结果。
      const [error, result] = await tryit(func)(next.item)
      results.push({
        error,
        result: result as K,
        index: next.index
      })
    }
  }

  // 创建并初始化处理队列，每个队列将处理一个工作项。
  const queues = list(1, limit).map(() => new Promise(processor))

  // 并行执行所有队列中的任务，并收集结果。
  const itemResults = (await Promise.all(queues)) as WorkItemResult<K>[][]

  // 对处理结果进行分组和排序，以便后续处理。
  const [errors, results] = fork(
    sort(itemResults.flat(), r => r.index),
    x => !!x.error
  )

  // 如果有错误发生，抛出聚合错误。
  if (errors.length > 0) {
    throw new AggregateError(errors.map(error => error.error))
  }

  // 返回处理成功的结果数组。
  return results.map(r => r.result)
}
// #endregion parallel

// #region sleep
/**
 * 函数名: sleep
 * 功能: 阻塞当前执行流，等待指定的毫秒数。
 * 参数:
 *   - milliseconds: number类型，表示需要等待的毫秒数。
 * 返回值:
 *   - Promise<void>，一个不会返回任何结果的Promise对象。
 */
export const sleep = (milliseconds: number) => {
  // 创建一个Promise，通过setTimeout在指定的毫秒后解决（resolve）。
  return new Promise(res => setTimeout(res, milliseconds))
}

type PromiseValues<T extends Promise<any>[]> = {
  [K in keyof T]: T[K] extends Promise<infer U> ? U : never
}
// #endregion sleep

// #region all
export async function all<T extends [Promise<any>, ...Promise<any>[]]>(
  promises: T
): Promise<PromiseValues<T>>
export async function all<T extends Promise<any>[]>(
  promises: T
): Promise<PromiseValues<T>>
export async function all<T extends Record<string, Promise<any>>>(
  promises: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>
/**
 * 等待所有给定的Promise对象或Promise数组完成，并根据情况处理结果或异常。
 * @param promises 可以是一个Promise对象的映射表或一个Promise数组。如果是一个映射表，键是结果的标识符，值是Promise对象；如果是一个数组，直接等待每个Promise的结果。
 * @returns 如果输入是一个Promise数组，则返回一个包含每个Promise解析结果的数组；如果输入是一个Promise对象的映射表，则返回一个对象，键是输入映射表中的键，值是对应Promise解析的结果。如果任何Promise被拒绝，则抛出一个包含所有异常的AggregateError。
 */
export async function all<
  T extends Record<string, Promise<any>> | Promise<any>[]
>(promises: T) {
  // 根据输入是数组还是对象，统一处理成键值对的形式，其中键可以是null（对于数组而言）
  const entries = isArray(promises)
    ? promises.map(p => [null, p] as [null, Promise<any>])
    : Object.entries(promises)

  // 等待所有Promise完成，并处理结果或异常
  const results = await Promise.all(
    entries.map(([key, value]) =>
      value
        .then(result => ({ result, exc: null, key }))
        .catch(exc => ({ result: null, exc, key }))
    )
  )

  // 分离出所有异常
  const exceptions = results.filter(r => r.exc)
  if (exceptions.length > 0) {
    throw new AggregateError(exceptions.map(e => e.exc))
  }

  // 根据输入类型返回相应的结果格式
  if (isArray(promises)) {
    return results.map(r => r.result) as T extends Promise<any>[]
      ? PromiseValues<T>
      : unknown
  }

  // 如果输入是对象，则返回一个对象，其中每个键对应原始键，每个值是相应Promise的解析结果
  return results.reduce(
    (acc, item) => ({
      ...acc,
      [item.key!]: item.result
    }),
    {} as { [K in keyof T]: Awaited<T[K]> }
  )
}
// #endregion all

// #region retry
/**
 * 一个用于重试异步操作的函数，直到操作成功或达到指定的重试次数。
 * @param options 包含重试配置的对象，可以指定重试次数（times）、重试间隔（delay）和退避策略（backoff）。
 * @param func 需要被重试的函数，它应该返回一个Promise，并接受一个退出函数作为参数，用于在发生错误时退出。
 * @returns 返回一个Promise，解析为函数`func`成功执行时的返回值，如果所有尝试都失败，则解析为undefined。
 */
export const retry = async <TResponse>(
  options: {
    times?: number
    delay?: number | null
    backoff?: (count: number) => number
  },
  func: (exit: (err: any) => void) => Promise<TResponse>
): Promise<TResponse> => {
  // 初始化重试次数、重试间隔和退避策略
  const times = options?.times ?? 3
  const delay = options?.delay
  const backoff = options?.backoff ?? null

  // 尝试执行操作，直到成功或达到重试次数上限
  for (const i of range(1, times)) {
    // 尝试执行函数，并捕获错误
    const [err, result] = (await tryit(func)((err: any) => {
      throw { _exited: err }
    })) as [any, TResponse]

    // 如果没有错误，返回结果
    if (!err) return result

    // 如果错误是通过exit函数抛出的，则重新抛出该错误
    if (err._exited) throw err._exited

    // 如果已经是最后一次尝试，抛出错误
    if (i === times) throw err

    // 根据配置，等待一段时间后再次尝试
    if (delay) await sleep(delay)
    if (backoff) await sleep(backoff(i))
  }

  // 所有尝试都失败，返回undefined
  return undefined as unknown as TResponse
}
// #endregion retry

// #region guard
/**
 * `guard` 函数用于执行一个给定的函数，并在出现错误时根据条件决定是否拦截错误。
 *
 * @param func 要执行的函数，它应该返回一个任何类型的值。
 * @param shouldGuard 可选参数，用于定义一个判断错误是否应该被拦截的函数。如果提供，该函数会接收一个错误对象作为参数，如果 shouldGuard 返回 `true`，则错误会被拦截；否则，错误会抛出。
 * @returns 如果原始函数 `func` 返回一个 Promise，则 `guard` 会返回一个 Promise，该 Promise 可能解析为原始 Promise 的解析值，或者在错误被拦截时为 undefined。如果 `func` 不返回 Promise，则 `guard` 直接返回函数的结果，或者在错误被拦截时为 undefined。
 */
export const guard = <TFunction extends () => any>(
  func: TFunction,
  shouldGuard?: (err: any) => boolean
): ReturnType<TFunction> extends Promise<any>
  ? Promise<Awaited<ReturnType<TFunction>> | undefined>
  : ReturnType<TFunction> | undefined => {
  // 定义一个内部的 _guard 函数，用于处理错误拦截逻辑。
  const _guard = (err: any) => {
    // 如果 shouldGuard 函数存在且判断错误不应被拦截，则抛出错误。
    if (shouldGuard && !shouldGuard(err)) throw err
    // 否则，返回 undefined。
    return undefined as any
  }

  // 定义一个辅助类型断言函数，用于判断结果是否为 Promise。
  const isPromise = (result: any): result is Promise<any> =>
    result instanceof Promise

  try {
    // 尝试执行 func 函数。
    const result = func()
    // 如果结果为 Promise，则在其上附加 catch 逻辑，处理可能的错误。
    return isPromise(result) ? result.catch(_guard) : result
  } catch (err) {
    // 如果执行过程中抛出错误，使用 _guard 函数处理。
    return _guard(err)
  }
}
// #endregion guard
