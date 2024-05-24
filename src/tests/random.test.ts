import { assert, describe, test } from 'vitest'
import * as _ from '..'

describe('random module', () => {
  describe('random function', () => {
    test('返回一个数字', () => {
      const result = _.random(0, 100)
      assert.isAtLeast(result, 0)
      assert.isAtMost(result, 100)
    })
  })
  describe('uid function', () => {
    test('生成正确长度的字符串', () => {
      const result = _.uid(10)
      assert.equal(result.length, 10)
    })
    /**
     * @warning This is potentially a flaky test.
     * We're trying to assert that given additional
     * special chars our function will include them
     * in the random selection process to generate the
     * uid. However, there is always a small chance that
     * one is never selected. If the test is flaky, increase
     * the size of the uid and/or the number of underscores
     * in the special char addition.
     */
    test('uid 生成包含特殊字符串的字符串', () => {
      const result = _.uid(
        300,
        '________________________________________________________________'
      )
      assert.include(result, '_')
    })
  })
  describe('shuffle function', () => {
    test('返回具有相同数量项目的列表', () => {
      const list = [1, 2, 3, 4, 5]
      const result = _.shuffle(list)
      assert.equal(list.length, result.length)
    })
    test('返回具有相同值的列表', () => {
      const list = [1, 2, 3, 4, 5]
      const totalBefore = _.sum(list)
      const result = _.shuffle(list)
      const totalAfter = _.sum(result)
      assert.equal(totalBefore, totalAfter)
    })
    test('返回不带突变输入的列表副本', () => {
      const list = [1, 2, 3, 4, 5]
      const result = _.shuffle(list)
      assert.notEqual(list, result)
      assert.deepEqual(list, [1, 2, 3, 4, 5])
    })
  })
  describe('draw function', () => {
    test('从列表中返回一个字符串', () => {
      const letters = 'abcde'
      const result = _.draw(letters.split(''))
      assert.include(letters, result!)
    })
    test('返回列表中的项目', () => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' }
      ]
      const result = _.draw(list)
      assert.include('abc', result!.id)
    })
    test('返回给定空输入的 null 值', () => {
      const list: unknown[] = []
      const result = _.draw(list)
      assert.isNull(result)
    })
  })
})
