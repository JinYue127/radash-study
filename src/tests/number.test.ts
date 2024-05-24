import { assert, describe, test } from 'vitest'
import * as _ from '..'

describe('number module', () => {
  describe('inRange function', () => {
    test('处理空值', () => {
      assert.strictEqual(_.inRange(0, 1, null as any), false)
      assert.strictEqual(_.inRange(0, null as any, 1), false)
      assert.strictEqual(_.inRange(null as any, 0, 1), false)
      assert.strictEqual(_.inRange(0, undefined as any, 1), false)
      assert.strictEqual(_.inRange(undefined as any, 0, 1), false)
      assert.strictEqual(_.inRange(0, 1, undefined as any), true)
    })
    test('处理错误输入', () => {
      const result = _.inRange(0, 1, {} as any)
      assert.strictEqual(result, false)
    })
    test('正确计算', () => {
      assert.strictEqual(_.inRange(10, 0, 5), false)
      assert.strictEqual(_.inRange(10, 0, 20), true)
      assert.strictEqual(_.inRange(-10, 0, -20), true)
      assert.strictEqual(_.inRange(9.99, 0, 10), true)
      assert.strictEqual(_.inRange(Math.PI, 0, 3.15), true)
    })
    test('处理数字类型的不同语法', () => {
      assert.strictEqual(_.inRange(0, -1, 1), true)
      assert.strictEqual(_.inRange(Number(0), -1, 1), true)
      assert.strictEqual(_.inRange(+'0', -1, 1), true)
    })
    test('处理两个参数', () => {
      assert.strictEqual(_.inRange(1, 2), true)
      assert.strictEqual(_.inRange(1.2, 2), true)
      assert.strictEqual(_.inRange(2, 1), false)
      assert.strictEqual(_.inRange(2, 2), false)
      assert.strictEqual(_.inRange(3.2, 2), false)
      assert.strictEqual(_.inRange(-1, 1), false)
      assert.strictEqual(_.inRange(-1, -10), true)
    })
    test('处理末端值', () => {
      assert.strictEqual(_.inRange(1, 0, 1), false)
      assert.strictEqual(_.inRange(10.0, 0, 10), false)
    })
    test('处理范围开始值', () => {
      assert.strictEqual(_.inRange(0, 0, 1), true)
      assert.strictEqual(_.inRange(10.0, 10, 20), true)
    })
  })
  describe('toFloat function', () => {
    test('处理 null', () => {
      const result = _.toFloat(null)
      assert.strictEqual(result, 0.0)
    })
    test('处理 undefined', () => {
      const result = _.toFloat(undefined)
      assert.strictEqual(result, 0.0)
    })
    test('使用 null 默认值', () => {
      const result = _.toFloat('x', null)
      assert.strictEqual(result, null)
    })
    test('处理错误输入', () => {
      const result = _.toFloat({})
      assert.strictEqual(result, 0.0)
    })
    test('正确转换 20.00', () => {
      const result = _.toFloat('20.00')
      assert.strictEqual(result, 20.0)
    })
  })
  describe('toInt function', () => {
    test('处理 null', () => {
      const result = _.toInt(null)
      assert.strictEqual(result, 0)
    })
    test('使用 null 默认值', () => {
      const result = _.toInt('x', null)
      assert.strictEqual(result, null)
    })
    test('处理 undefined', () => {
      const result = _.toInt(undefined)
      assert.strictEqual(result, 0)
    })
    test('处理错误输入', () => {
      const result = _.toInt({})
      assert.strictEqual(result, 0)
    })
    test('正确转换 20', () => {
      const result = _.toInt('20.00')
      assert.strictEqual(result, 20)
    })
  })
})
