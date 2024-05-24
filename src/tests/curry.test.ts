import { afterEach, assert, beforeEach, describe, expect, test, vi } from 'vitest'
import * as _ from '..'
import { DebounceFunction } from '../curry'

describe('curry module', () => {
  describe('chain function', () => {
    test('调用所有给定函数', () => {
      const genesis = () => 0
      const addFive = (num: number) => num + 5
      const twoX = (num: number) => num * 2
      const func = _.chain(genesis, addFive, twoX)
      // @ts-expect-error:''
      const result = func(0, '')
      assert.equal(result, 10)
    })

    test('调用 add（1），然后调用 addFive，然后调用 twoX 函数 by 1', () => {
      const add = (y: number) => (x: number) => x + y
      const addFive = add(5)
      const twoX = (num: number) => num * 2
      const func = _.chain(add(1), addFive, twoX)
      const result = func(1)
      assert.equal(result, 14)
    })

    test('调用 add（2），然后调用 addFive，然后调用 twoX，然后调用 repeatX 函数 by 1', () => {
      const add = (y: number) => (x: number) => x + y
      const addFive = add(5)
      const twoX = (num: number) => num * 2
      const repeatX = (num: number) => 'X'.repeat(num)
      const func = _.chain(add(2), addFive, twoX, repeatX)
      const result = func(1)
      assert.equal(result, 'XXXXXXXXXXXXXXXX')
    })

    test('调用 addFive，然后调用 add（2），然后调用 twoX，然后调用 repeatX 函数 by 1', () => {
      const add = (y: number) => (x: number) => x + y
      const addFive = add(5)
      const twoX = (num: number) => num * 2
      const repeatX = (num: number) => 'X'.repeat(num)
      const func = _.chain(addFive, add(2), twoX, repeatX)
      const result = func(1)
      assert.equal(result, 'XXXXXXXXXXXXXXXX')
    })

    test('调用 getName，则 upperCase 充当 User[] 的映射器', () => {
      type User = { id: number; name: string }
      const users: User[] = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'John Smith' },
        { id: 3, name: 'John Wick' }
      ]
      const getName = <T extends { name: string }>(item: T) => item.name
      const upperCase: (x: string) => Uppercase<string> = (text: string) =>
        text.toUpperCase() as Uppercase<string>

      const getUpperName = _.chain(getName, upperCase)
      const result = users.map(getUpperName)
      assert.deepEqual(result, ['JOHN DOE', 'JOHN SMITH', 'JOHN WICK'])
    })
  })
  describe('compose function', () => {
    test('组合函数', () => {
      const useZero = (fn: (num: number) => number) => () => fn(0)
      const objective =
        (fn: (obj: { num: number }) => number) => (num: number) =>
          fn({ num })
      const increment =
        (fn: (arg: { num: number }) => number) =>
          ({ num }: { num: number }) =>
            fn({ num: num + 1 })
      const returnArg = (arg: 'num') => (args: { num: number }) => args[arg]

      const composed = _.compose(
        useZero,
        objective,
        increment,
        increment,
        returnArg('num')
      )

      const decomposed = useZero(
        objective(increment(increment(returnArg('num'))))
      )

      const expected = decomposed()
      const result = composed()

      assert.equal(result, expected)
      assert.equal(result, 2)
    })
    test('编写异步函数', async () => {
      const useZero = (fn: (num: number) => Promise<number>) => async () =>
        fn(0)
      const objective =
        (fn: (obj: { num: number }) => Promise<number>) =>
          async (num: number) =>
            fn({ num })
      const increment =
        (fn: (arg: { num: number }) => Promise<number>) =>
          async ({ num }: { num: number }) =>
            fn({ num: num + 1 })
      const returnArg = (arg: 'num') => async (args: { num: number }) =>
        args[arg]

      const composed = _.compose(
        useZero,
        objective,
        increment,
        increment,
        returnArg('num')
      )

      const decomposed = useZero(
        objective(increment(increment(returnArg('num'))))
      )

      const expected = await decomposed()
      const result = await composed()

      assert.equal(result, expected)
    })
    test('compose 函数类型重载', () => {
      const useZero = (fn: (num: number) => number) => () => fn(0)
      const objective =
        (fn: (obj: { num: number }) => number) => (num: number) =>
          fn({ num })
      const increment =
        (fn: (arg: { num: number }) => number) =>
          ({ num }: { num: number }) =>
            fn({ num: num + 1 })
      const returnArg = (arg: 'num') => (args: { num: number }) => args[arg]
      const returnNum = () => (num: number) => num

      assert.equal(_.compose(useZero, returnNum())(), 0)

      assert.equal(_.compose(useZero, objective, returnArg('num'))(), 0)

      assert.equal(
        _.compose(useZero, objective, increment, returnArg('num'))(),
        1
      )

      assert.equal(
        _.compose(useZero, objective, increment, increment, returnArg('num'))(),
        2
      )

      assert.equal(
        _.compose(
          useZero,
          objective,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        3
      )

      assert.equal(
        _.compose(
          useZero,
          objective,
          increment,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        4
      )

      assert.equal(
        _.compose(
          useZero,
          objective,
          increment,
          increment,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        5
      )

      assert.equal(
        _.compose(
          useZero,
          objective,
          increment,
          increment,
          increment,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        6
      )

      assert.equal(
        _.compose(
          useZero,
          objective,
          increment,
          increment,
          increment,
          increment,
          increment,
          increment,
          increment,
          returnArg('num')
        )(),
        7
      )
    })
  })
  describe('partial function', () => {
    test('通过单个参数', () => {
      const add = (a: number, b: number) => a + b
      const expected = 20
      const partial = _.partial(add, 10)
      const result = partial(10)
      assert.equal(result, expected)
    })
    test('通过许多参数', () => {
      const add = (...nums: number[]) => nums.reduce((a, b) => a + b, 0)
      const expected = 10
      const result = _.partial(add, 2, 2, 2)(2, 2)
      assert.equal(result, expected)
    })
  })
  describe('partob function', () => {
    test('partob 传递单个参数', () => {
      const add = ({ a, b }: { a: number; b: number }) => a + b
      const expected = 20
      const result = _.partob(add, { a: 10 })({ b: 10 })
      assert.equal(result, expected)
    })
    test('partob 用 later 覆盖 initial', () => {
      const add = ({ a, b }: { a: number; b: number }) => a + b
      const expected = 15
      const result = _.partob(add, { a: 10 })({ a: 5, b: 10 } as any)
      assert.equal(result, expected)
    })
  })
  describe('proxied function', () => {
    test('返回调用回调函数的代理', () => {
      const handler = (propertyName: string) => {
        if (propertyName === 'x') return 2
        if (propertyName === 'getName') return () => 'radash'
        return undefined
      }
      const proxy = _.proxied(handler) as any
      assert.equal(proxy.x, 2)
      assert.equal(proxy.getName(), 'radash')
      assert.isUndefined(proxy.nil)
    })
  })
  describe('memo function', () => {
    test('只执行一次函数', () => {
      const func = _.memo(() => new Date().getTime())
      const resultA = func()
      const resultB = func()
      assert.equal(resultA, resultB)
    })
    test('使用密钥识别唯一呼叫', () => {
      const func = _.memo(
        (arg: { user: { id: string } }) => {
          const ts = new Date().getTime()
          return `${ts}::${arg.user.id}`
        },
        {
          key: arg => arg.user.id
        }
      )
      const resultA = func({ user: { id: 'alpha' } })
      const resultB = func({ user: { id: 'beta' } })
      const resultA2 = func({ user: { id: 'alpha' } })
      assert.equal(resultA, resultA2)
      assert.notEqual(resultB, resultA)
    })
    test('当第一个值过期时再次调用函数', async () => {
      const func = _.memo(() => new Date().getTime(), {
        ttl: 1
      })
      const resultA = func()
      await new Promise(res => setTimeout(res, 100))
      const resultB = func()
      assert.notEqual(resultA, resultB)
    })
    test('当第一个值未过期时，不会再次调用函数', async () => {
      const func = _.memo(() => new Date().getTime(), {
        ttl: 1000
      })
      const resultA = func()
      await new Promise(res => setTimeout(res, 100))
      const resultB = func()
      assert.equal(resultA, resultB)
    })
  })
  describe('debounce function', () => {
    let func: DebounceFunction<any>
    const mockFunc = vi.fn()
    const runFunc3Times = () => {
      func()
      func()
      func()
    }

    beforeEach(() => {
      func = _.debounce({ delay: 600 }, mockFunc)
    })

    afterEach(() => {
      vi.clearAllMocks()
    })

    test('快速调用时仅执行一次', async () => {
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(0)
      await _.sleep(610)
      expect(mockFunc).toHaveBeenCalledTimes(1)
    })

    test('调用取消后不去抖动', () => {
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(0)
      func.cancel()
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(3)
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(6)
    })

    test('调用 flush 方法时立即执行该函数', () => {
      func.flush()
      expect(mockFunc).toHaveBeenCalledTimes(1)
    })

    test('调用 flush 后继续去抖动', async () => {
      runFunc3Times()
      expect(mockFunc).toHaveBeenCalledTimes(0)
      func.flush()
      expect(mockFunc).toHaveBeenCalledTimes(1)
      func()
      expect(mockFunc).toHaveBeenCalledTimes(1)
      await _.sleep(610)
      expect(mockFunc).toHaveBeenCalledTimes(2)
      func.flush()
      expect(mockFunc).toHaveBeenCalledTimes(3)
    })

    test('调用 Cancel 方法时取消所有挂起的调用', async () => {
      const results: boolean[] = []
      func()
      results.push(func.isPending())
      results.push(func.isPending())
      await _.sleep(610)
      results.push(func.isPending())
      func()
      results.push(func.isPending())
      await _.sleep(610)
      results.push(func.isPending())
      assert.deepEqual(results, [true, true, false, true, false])
    })

    test('如果调用 Pending 方法时有任何挂起的调用，则返回', async () => {
      func()
      func.cancel()
      await _.sleep(610)
      expect(mockFunc).toHaveBeenCalledTimes(0)
    })
  })
  describe('throttle function', () => {
    test('throttles!', async () => {
      let calls = 0
      const func = _.throttle({ interval: 600 }, () => calls++)
      func()
      func()
      func()
      assert.equal(calls, 1)
      await _.sleep(610)
      func()
      func()
      func()
      assert.equal(calls, 2)
    })

    test('returns if the throttle is active', async () => {
      const results = []
      const func = _.throttle({ interval: 600 }, () => {
      })
      results.push(func.isThrottled())
      func()
      results.push(func.isThrottled())
      func()
      results.push(func.isThrottled())
      func()
      results.push(func.isThrottled())
      await _.sleep(610)
      results.push(func.isThrottled())
      assert.deepEqual(results, [false, true, true, true, false])
    })
  })
  describe('callable function', () => {
    test('使对象可调用', async () => {
      const request = {
        source: 'client',
        body: 'ford',
        doors: 2
      }

      const call = _.callable(request, self => (id: string) => ({ ...self, id }))

      expect(call.source).toBe('client')
      expect(call.body).toBe('ford')
      expect(call.doors).toBe(2)
      const s = call('23')
      expect(s.doors).toBe(2)
      expect(s.id).toBe('23')

      call.doors = 4
      expect(call.doors).toBe(4)
      const x = call('9')
      expect(x.doors).toBe(4)
      expect(x.id).toBe('9')
    })
  })
})
