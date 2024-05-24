import { assert, describe, test } from 'vitest'
import * as _ from '..'
import { AggregateError } from '../async'

describe('async module', () => {
  describe('asyncReduce function', () => {
    test('返回 Reducer 的结果', async () => {
      const numbers = [
        0,
        1,
        2,
        3,
        4 // => 10
      ]
      const asyncSum = async (a: number, b: number): Promise<number> => {
        return new Promise(res => res(a + b))
      }
      const result = await _.reduce<number, number>(numbers, asyncSum, 0)
      assert.equal(result, 10)
    })
    test('传递正确的索引', async () => {
      const array = ['a', 'b', 'c', 'd', 'e']
      const asyncSumIndex = async (
        a: number[],
        _b: string,
        i: number
      ): Promise<number[]> => {
        return new Promise(res => {
          a.push(i)
          res(a)
        })
      }
      const result = await _.reduce<string, number[]>(array, asyncSumIndex, [])
      assert.deepEqual(result, [0, 1, 2, 3, 4])
    })
  })
  describe('reduce/asyncReduceV2 function', () => {
    const numbers = [0, 1, 2, 3, 4]
    const reducer = async (a: number, b: number): Promise<number> => {
      return new Promise(res => res(a + b))
    }

    test('调用 asyncReduce', async () => {
      const result = await _.reduce<number, number>(numbers, reducer, 0)
      assert.equal(result, 10)
    })
    test('未提供初始化时使用数组中的第一项', async () => {
      const result = await _.reduce(numbers, reducer)
      assert.equal(result, 10)
    })
    test('抛出无初始化值和空数组', async () => {
      try {
        await _.reduce([], reducer)
      } catch (err) {
        assert.isNotNull(err)
        return
      }
      assert.fail('Expected error to be thrown')
    })
    test('抛出无初始化值和 null 数组输入', async () => {
      try {
        await _.reduce(null as unknown as number[], reducer)
      } catch (err) {
        assert.isNotNull(err)
        return
      }
      assert.fail('Expected error to be thrown')
    })
  })
  describe('asyncMap function', () => {
    test('返回映射器的结果', async () => {
      const numbers = [1, 2, 3, 4]
      const asyncSquare = async (a: number): Promise<number> => {
        return new Promise(res => res(a * a))
      }
      const result = await _.map<number, number>(numbers, asyncSquare)
      assert.deepEqual(result, [1, 4, 9, 16])
    })
    test('处理 null 输入', async () => {
      const result = await _.map(null as unknown as unknown[], async () => '')
      assert.deepEqual(result, [])
    })
    test('传递正确的索引', async () => {
      const array = ['a', 'b', 'c', 'd']
      const mapper = async (l: string, index: number) => `${l}${index}`
      const result = await _.map(array, mapper)
      assert.deepEqual(result, ['a0', 'b1', 'c2', 'd3'])
    })
  })
  describe('_.tryit function', () => {
    test('returns error when error is thrown', async () => {
      const fn = _.tryit(async () => {
        throw new Error('not good enough')
      })
      const [err, result] = await fn()
      assert.isUndefined(result)
      assert.isNotNull(err)
      assert.equal(err!.message, 'not good enough')
    })
    test('returns result when no error is thrown', async () => {
      const [err, result] = await _.tryit(async () => {
        return 'hello'
      })()
      assert.isUndefined(err)
      assert.isNotNull(result)
      assert.equal(result, 'hello')
    })
    test('handles non-async function results', async () => {
      const [err, result] = _.tryit(() => {
        return 'hello'
      })()
      assert.isUndefined(err)
      assert.isNotNull(result)
      assert.equal(result, 'hello')
    })
    test('handles non-async function errors', async () => {
      const [err, result] = _.tryit(() => {
        if (1 < 0) return ''
        throw new Error('unknown')
      })()
      assert.isUndefined(result)
      assert.isNotNull(err)
      assert.equal(err!.message, 'unknown')
    })
    test('alias exists', () => {
      assert.isNotNull(_.tryit)
    })
  })
  describe('defer function', () => {
    test('调用已注册的延迟函数', async () => {
      let val = 0
      await _.defer(async defer => {
        defer(() => {
          val = 1
        })
      })
      assert.equal(val, 1)
    })
    test('返回给定函数的结果值', async () => {
      let val = 0
      const result = await _.defer(async defer => {
        defer(() => {
          val = 1
        })
        return 'x'
      })
      assert.equal(val, 1)
      assert.equal(result, 'x')
    })
    test('调用所有已注册的延迟函数', async () => {
      let one = 0
      let two = 0
      let three = 0
      const result = await _.defer(async defer => {
        defer(async () => {
          one = 1
        })
        defer(async () => {
          two = 2
        })
        defer(async () => {
          three = 3
        })
        return 'x'
      })
      assert.equal(one, 1)
      assert.equal(two, 2)
      assert.equal(three, 3)
      assert.equal(result, 'x')
    })
    test('抛出错误时调用所有已注册的延迟函数', async () => {
      let one = 0
      let two = 0
      let three = 0
      try {
        await _.defer(async defer => {
          defer(async () => {
            one = 1
          })
          defer(async () => {
            two = 2
          })
          defer(async () => {
            three = 3
          })
          throw new Error('soon broken')
        })
      } catch {
      }
      assert.equal(one, 1)
      assert.equal(two, 2)
      assert.equal(three, 3)
    })
    test('抛出错误', async () => {
      let error: Error | null = null
      try {
        await _.defer(async () => {
          throw new Error('soon broken')
        })
      } catch (err: any) {
        error = err
      }
      assert.isNotNull(error)
      assert.equal(error?.message, 'soon broken')
    })
    test('当 rethrow 为 true 时重新抛出 rethrow 错误', async () => {
      let error: Error | null = null
      try {
        await _.defer(async register => {
          register(
            async () => {
              throw new Error('soon broken')
            },
            { rethrow: true }
          )
        })
      } catch (err: any) {
        error = err
      }
      assert.isNotNull(error)
      assert.equal(error?.message, 'soon broken')
    })
    test('当 rethrow 为 false 时，不会重新抛出 rethrow 错误', async () => {
      let error: Error | null = null
      try {
        await _.defer(async register => {
          register(
            async () => {
              throw new Error('soon broken')
            },
            { rethrow: false }
          )
        })
      } catch (err: any) {
        error = err
      }
      assert.isNull(error)
    })
    test('默认情况下不会重新抛出重新抛出的错误', async () => {
      let error: Error | null = null
      try {
        await _.defer(async register => {
          register(async () => {
            throw new Error('soon broken')
          })
        })
      } catch (err: any) {
        error = err
      }
      assert.isNull(error)
    })
    test('返回等待的异步结果', async () => {
      const result = await _.defer(() => {
        return new Promise<string>(res => res('x'))
      })
      assert.equal(result, 'x')
    })
  })
  describe('_.parallel function', () => {
    test('返回所有函数的所有结果', async () => {
      const [errors, results] = await _.tryit(async () => {
        return _.parallel(1, _.list(1, 3), async num => {
          await _.sleep(1000)
          return `hi_${num}`
        })
      })()
      assert.isUndefined(errors)
      assert.deepEqual(results, ['hi_1', 'hi_2', 'hi_3'])
    })
    test('将错误作为所有错误的数组抛出', async () => {
      const [error, results] = await _.tryit(async () => {
        return _.parallel(1, _.list(1, 3), async num => {
          await _.sleep(1000)
          if (num === 2) throw new Error('number is 2')
          return `hi_${num}`
        })
      })()
      const err = error as AggregateError
      assert.isUndefined(results)
      assert.equal(err.errors.length, 1)
      assert.equal(err.errors[0].message, 'number is 2')
    })
    test('一次运行不超过限制', async () => {
      let numInProgress = 0
      const tracking: number[] = []
      await _.parallel(3, _.list(1, 14), async () => {
        numInProgress++
        tracking.push(numInProgress)
        tracking.push(numInProgress)
        await _.sleep(300)
        numInProgress--
      })
      assert.deepEqual(Math.max(...tracking), 3)
    })
  })
  describe('_.all function', () => {
    const promise = {
      resolve: <T>(value: T) => new Promise<T>(res => res(value)),
      reject: (err: any) => new Promise((_res, rej) => rej(err))
    }
    test('当给定数组时，返回具有正确顺序值的数组', async () => {
      const result = await _.all([
        promise.resolve(22),
        promise.resolve('hello'),
        promise.resolve({ name: 'ray' })
      ])
      assert.deepEqual(result, [22, 'hello', { name: 'ray' }])
    })
    test('当给定对象时，返回具有正确键值的对象', async () => {
      const result = await _.all({
        num: promise.resolve(22),
        str: promise.resolve('hello'),
        obj: promise.resolve({ name: 'ray' })
      })
      assert.deepEqual(result, {
        num: 22,
        str: 'hello',
        obj: { name: 'ray' }
      })
    })
    test('当单个 promise 失败时引发聚合错误（在对象模式下）)', async () => {
      try {
        await _.all({
          num: promise.resolve(22),
          str: promise.resolve('hello'),
          err: promise.reject(new Error('broken'))
        })
      } catch (e: any) {
        const err = e as AggregateError
        assert.equal(err.errors.length, 1)
        assert.equal(err.errors[0].message, 'broken')
        return
      }
      assert.fail('Expected error to be thrown but it was not')
    })
    test('当单个 promise 失败时引发聚合错误（在数组模式下）', async () => {
      try {
        await _.all([
          promise.resolve(22),
          promise.resolve('hello'),
          promise.reject(new Error('broken'))
        ])
      } catch (e: any) {
        const err = e as AggregateError
        assert.equal(err.errors.length, 1)
        assert.equal(err.errors[0].message, 'broken')
        return
      }
      assert.fail('Expected error to be thrown but it was not')
    })
  })
  describe('_.retry function', () => {
    type Options = {
      times?: number
      delay?: number | null
      backoff?: (count: number) => number
    }

    const NULL = null as unknown as Options

    test('返回给定函数的结果', async () => {
      const result = await _.retry(NULL, async () => {
        return 'hello'
      })
      assert.equal(result, 'hello')
    })
    test('简单+快捷+快乐之路', async () => {
      const result = await _.retry(NULL, async () => {
        return 'hello'
      })
      assert.equal(result, 'hello')
    })
    test('失败时重试', async () => {
      let failedOnce = false
      const result = await _.retry(NULL, async () => {
        if (!failedOnce) {
          failedOnce = true
          throw 'Failing for test'
        }
        return 'hello'
      })
      assert.equal(result, 'hello')
    })
    test('quits on bail', async () => {
      try {
        await _.retry({}, async bail => {
          bail('i quit')
        })
      } catch (err) {
        assert.equal(err, 'i quit')
        return
      }
      assert.fail('error should have been thrown')
    })
    test('最大重试次数后退出', async () => {
      try {
        await _.retry({}, async () => {
          throw 'quit again'
        })
      } catch (err) {
        assert.equal(err, 'quit again')
        return
      }
      assert.fail('error should have been thrown')
    })
    test('在最大重试后退出，不会延迟', async () => {
      try {
        const func = async () => {
          throw 'quit again'
        }
        await _.retry({ times: 3 }, func)
      } catch (err) {
        assert.equal(err, 'quit again')
        return
      }
      assert.fail('error should have been thrown')
    })
    test('在延迟的最大重试次数后退出', async () => {
      try {
        const func = async () => {
          throw 'quit again'
        }
        await _.retry({ delay: 100 }, func)
      } catch (err) {
        assert.equal(err, 'quit again')
        return
      }
      assert.fail('error should have been thrown')
    })
    test('在重试之间使用回退', async () => {
      let count = 0
      let backoff: number = 0
      const start = Date.now()
      await _.retry(
        {
          times: 3,
          backoff: i => {
            backoff += i ** 10
            return i ** 10
          }
        },
        async () => {
          count++
          if (count < 3) throw 'error'
        }
      )
      const diff = Date.now() - start
      assert.equal(count, 3)
      assert.isAtLeast(diff, backoff)
    })
  })
  describe('_.guard function', () => {
    test('返回给定异步函数的结果', async () => {
      const result = await _.guard(async () => {
        return 'hello'
      })
      assert.equal(result, 'hello')
    })
    test('返回给定同步函数的结果', async () => {
      const result = _.guard(() => {
        return 'hello'
      })
      assert.equal(result, 'hello')
    })
    test('如果给定异步函数抛出，则返回错误', async () => {
      const result =
        (await _.guard(async () => {
          throw new Error('error')
        })) ?? 'good-bye'
      assert.equal(result, 'good-bye')
    })
    test('如果给定同步函数抛出，则返回错误', async () => {
      const alwaysThrow = () => {
        if (1 > 0) throw new Error('error')
        return undefined
      }
      const result = _.guard(alwaysThrow) ?? 'good-bye'
      assert.equal(result, 'good-bye')
    })
    test('如果 shouldGuard 返回 false 则抛出错误', async () => {
      const makeFetchUser = (id: number) => {
        return async () => {
          if (id === 1) return 'user1'
          if (id === 2) throw new Error('user not found')
          throw new Error('unknown error')
        }
      }
      const isUserNotFoundErr = (err: any) => err.message === 'user not found'
      const fetchUser = async (id: number) =>
        (await _.guard(makeFetchUser(id), isUserNotFoundErr)) ?? 'default-user'

      const user1 = await fetchUser(1)
      assert.equal(user1, 'user1')

      const user2 = await fetchUser(2)
      assert.equal(user2, 'default-user')

      try {
        await fetchUser(3)
        assert.fail()
      } catch (err: any) {
        assert.equal(err.message, 'unknown error')
      }
    })
  })
})
