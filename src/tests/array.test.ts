import { assert, describe, test } from 'vitest'
import * as _ from '..'

const NULL = null as unknown as unknown[]
describe('array module', () => {
  describe('group function', () => {
    test('按提供的属性进行分组', () => {
      const list = [
        { group: 'a', word: 'hello' },
        { group: 'b', word: 'bye' },
        { group: 'a', word: 'oh' },
        { group: 'b', word: 'hey' },
        { group: 'c', word: 'ok' }
      ]
      const groups = _.group(list, x => x.group)
      assert.equal(groups.a?.length, 2)
      assert.equal(groups.b?.length, 2)
      assert.equal(groups.c?.length, 1)
      assert.equal(groups.c?.[0].word, 'ok')
    })
  })
  describe('zip function', () => {
    test('将多个数组按索引进行合并', () => {
      const result = _.zip(['a', 'b'], [1, 2], [true, false])
      assert.deepEqual(result, [
        ['a', 1, true],
        ['b', 2, false]
      ])
    })
    test('如果数组长度不一致，则只合并到最短的数组长度', () => {
      const result = _.zip(['a', 'b'], [1, 2, 3], [true, false])
      assert.deepEqual(result, [
        ['a', 1, true],
        ['b', 2, false],
        [undefined, 3, undefined]
      ])
    })
    test('如果数组为空，则返回空数组', () => {
      const result = _.zip([], [], [])
      assert.deepEqual(result, [])
    })
  })
  describe('zipToObject function', () => {
    test('将数组按索引进行合并，并转换为对象', () => {
      const result = _.zipToObject(['a', 'b'], [1, 2])
      assert.deepEqual(result, { a: 1, b: 2 })
    })
    test('将数组按自定义函数进行合并，并转换为对象', () => {
      const result = _.zipToObject(['a', 'b'], (key, idx) => key + idx)
      assert.deepEqual(result, { a: 'a0', b: 'b1' })
    })
    test('压缩到只有一个值的对象', () => {
      const result = _.zipToObject(['a', 'b'], 123)
      assert.deepEqual(result, { a: 123, b: 123 })
    })
    test('如果传递了一个错误的参数，则返回空对象', () => {
      // @ts-expect-error:参数为空
      const result = _.zipToObject()
      assert.deepEqual(result, {})
    })
  })
  describe('boil function', () => {
    test('根据状况比较和保留项目', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.boil(list, (a, b) => (a.score > b.score ? a : b))
      assert.equal(result!.game, 'e')
      assert.equal(result!.score, 500)
    })
    test('如果数组为空，则返回null', () => {
      const result = _.boil([], () => true)
      assert.isNull(result)
    })
    test('当提供的数组为 null 时不会失败', () => {
      const result = _.boil(null as unknown as readonly boolean[], () => true)
      assert.isNull(result)
    })
    test('当提供的数组为 {} 时不会失败', () => {
      const result = _.boil({} as any, () => true)
      assert.isNull(result)
    })
  })
  describe('sum function', () => {
    test('计算数组中的数字总和', () => {
      const result = _.sum([1, 2, 3, 4, 5])
      assert.equal(result, 15)
    })
    test('使用 fn 正确计算数组中的数字总和', () => {
      const list = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
      const result = _.sum(list, x => x.value)
      assert.equal(result, 22)
    })
    test('如果数组为空，则返回0', () => {
      const result = _.sum([])
      assert.equal(result, 0)
    })
    test('如果数组为 null，则返回0', () => {
      const result = _.sum(null as unknown as readonly number[])
      assert.equal(result, 0)
    })
  })
  describe('first function', () => {
    test('返回列表中的第一项', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.first(list)
      assert.equal(result!.game, 'a')
      assert.equal(result!.score, 100)
    })
    test('当列表为空时返回默认值，而不会出错', () => {
      const list = [] as string[]
      const result = _.first(list, 'yolo')
      assert.equal(result, 'yolo')
    })
    test('优雅地处理 null 输入列表', () => {
      const result = _.first(NULL)
      assert.equal(result, null)
    })
  })
  describe('last function', () => {
    test('返回列表中的最后一项', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.last(list)
      assert.equal(result!.game, 'b')
      assert.equal(result!.score, 200)
    })
    test('当列表为空时返回默认值，而不会出错', () => {
      const list = [] as string[]
      const result = _.last(list, 'yolo')
      assert.equal(result, 'yolo')
    })
    test('优雅地处理 null 输入列表', () => {
      const result = _.last(NULL)
      assert.equal(result, null)
    })
  })
  describe('sort function', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 }
    ]
    test('使用降序', () => {
      const result = _.sort(list, x => x.score, true)
      assert.equal(result[0].game, 'e')
      assert.equal(result[0].score, 500)
      assert.equal(result[4].game, 'a')
      assert.equal(result[4].score, 100)
    })
    test('使用升序', () => {
      const result = _.sort(list, x => x.score)
      assert.equal(result[0].game, 'a')
      assert.equal(result[0].score, 100)
      assert.equal(result[4].game, 'e')
    })
    test('优雅地处理 null 输入列表', () => {
      const result = _.sort(null as any as number[], x => x)
      assert.deepEqual(result, [])
    })
  })
  describe('alphabetical function', () => {
    const gods = [
      {
        name: 'Ra',
        power: 100
      },
      {
        name: 'Zeus',
        power: 98
      },
      {
        name: 'Loki',
        power: 72
      },
      {
        name: 'Vishnu',
        power: 100
      }
    ]
    test('使用降序', () => {
      const result = _.alphabetical(gods, x => x.name, true)
      assert.equal(result[0].name, 'Zeus')
      assert.equal(result[3].name, 'Loki')
    })
    test('使用升序', () => {
      const result = _.alphabetical(gods, x => x.name)
      assert.equal(result[0].name, 'Loki')
      assert.equal(result[3].name, 'Zeus')
    })
  })
  describe('counting function', () => {
    test('计算数组中每个项目的出现次数', () => {
      const gods = [
        {
          name: 'Ra',
          culture: 'egypt'
        },
        {
          name: 'Zeus',
          culture: 'greek'
        },
        {
          name: 'Loki',
          culture: 'greek'
        }
      ]
      const result = _.counting(gods, x => x.culture)
      assert.equal(result.egypt, 1)
      assert.equal(result.greek, 2)
    })
    test('不会因输入错误而出错', () => {
      const result1 = _.counting(null as unknown as number[], x => x)
      const result2 = _.counting(undefined as unknown as number[], x => x)
      assert.deepEqual(result1, {})
      assert.deepEqual(result2, {})
    })
  })
  describe('replace function', () => {
    test('替换数组中的项目', () => {
      const fish = [
        {
          name: 'Marlin',
          weight: 105
        },
        {
          name: 'Bass',
          weight: 8
        },
        {
          name: 'Trout',
          weight: 13
        }
      ]

      const salmon = {
        name: 'Salmon',
        weight: 22
      }
      const result = _.replace(fish, salmon, x => x.name === 'Bass')
      assert.equal(result[1].name, 'Salmon')
    })
    test('新项为 undefined', () => {
      const result = _.replace(['a'], undefined, () => true)
      assert.deepEqual(result, ['a'])
    })
    test('新项为 null', () => {
      const result = _.replace(['a'], null, i => i === 'a')
      assert.deepEqual(result, [null])
    })
    test('列表为 null ', () => {
      const result = _.replace(null as unknown as readonly string[], 'x', () => false)
      assert.deepEqual(result, [])
    })
    test('返回按索引替换的项目', () => {
      const result = _.replace(
        ['a', 'b', 'c', 'd'],
        'BB',
        (_letter, idx) => idx === 1
      )
      assert.equal(result[1], 'BB')
    })
    test('返回带有替换项的列表副本', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.replace(
        list,
        { game: 'x', score: 800 },
        item => item.game === 'a'
      )
      assert.equal(result[0].game, 'x')
      assert.equal(list[1].game, 'b')
    })
    test('返回列表的副本而不进行更改', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 }
      ]
      const result = _.replace(
        list,
        { game: 'x', score: 800 },
        item => item.game === 'XX'
      )
      assert.equal(result[0].game, 'a')
      assert.equal(list[1].game, 'b')
    })
  })
  describe('objectify function', () => {
    const fish = [
      {
        name: 'Marlin',
        weight: 105
      },
      {
        name: 'Bass',
        weight: 8
      },
      {
        name: 'Trout',
        weight: 13
      }
    ]
    test('默认值为数组项，不传默认值函数', () => {
      const result = _.objectify(fish, x => x.name)
      assert.equal(result.Marlin.name, 'Marlin')
      assert.equal(result.Bass.weight, 8)
      assert.equal(result.Trout.weight, 13)
    })
    test('当数组为空时返回空对象', () => {
      // @ts-expect-error: expect-error
      const result = _.objectify([], x => x.name)
      assert.deepEqual(result, {})
    })
    test('当数组为 null 时返回空对象', () => {
      const result = _.objectify(null as unknown as readonly string[], x => x)
      assert.deepEqual(result, {})
    })
    test('数组转为对象，传入 key 和 value 的函数', () => {
      const result = _.objectify(
        fish,
        f => f.name,
        f => f.weight
      )
      assert.equal(result.Marlin, 105)
      assert.equal(result.Bass, 8)
    })
  })
  describe('select function', () => {
    test('不会因输入错误而失败', () => {
      const result1 = _.select(null as unknown as number[], x => x, x => !!x)
      assert.deepEqual(result1, [])
      const result2 = _.select(undefined as unknown as number[], x => x, x => !!x)
      assert.deepEqual(result2, [])
    })
    test('返回数组中满足条件的项', () => {
      const fish = [
        {
          name: 'Marlin',
          weight: 105,
          source: 'ocean'
        },
        {
          name: 'Bass',
          weight: 8,
          source: 'lake'
        },
        {
          name: 'Trout',
          weight: 13,
          source: 'lake'
        }
      ]
      const result = _.select(fish, f => f.weight, f => f.source === 'lake')
      assert.equal(result[0], 8)
      assert.equal(result[1], 13)
    })
    test('在空输入列表上不会失败', () => {
      const list: any[] = []
      const result = _.select(
        list,
        (x: any) => x.word,
        x => x.group === 'a'
      )
      assert.deepEqual(result, [])
    })
    test('与索引配合使用', () => {
      const letters = ['a', 'b', 'c', 'd']
      const result = _.select(
        letters,
        (l, idx) => `${l}${idx}`,
        (_l, idx) => idx > 1
      )
      assert.deepEqual(result, ['c2', 'd3'])
    })
  })
  describe('max function', () => {
    test('返回数字数组数组中的最大值', () => {
      const result = _.max([1, 2, 3, 4, 5])
      assert.equal(result, 5)
    })
    test('返回任意数组中的最大值', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.max(list, x => x.score)
      assert.equal(result!.game, 'e')
      assert.equal(result!.score, 500)
    })
    test('返回空数组时返回 null', () => {
      const result = _.max([])
      assert.equal(result, null)
    })
  })
  describe('min function', () => {
    test('返回数字数组数组中的最大值', () => {
      const result = _.min([1, 2, 3, 4, 5])
      assert.equal(result, 1)
    })
    test('返回任意数组中的最大值', () => {
      const list = [
        { game: 'a', score: 100 },
        { game: 'b', score: 200 },
        { game: 'c', score: 300 },
        { game: 'd', score: 400 },
        { game: 'e', score: 500 }
      ]
      const result = _.min(list, x => x.score)
      assert.equal(result!.game, 'a')
      assert.equal(result!.score, 100)
    })
    test('返回空数组时返回 null', () => {
      const result = _.min([])
      assert.equal(result, null)
    })
  })
  describe('cluster function', () => {
    test('返回列表的子集', () => {
      const list = [1, 1, 1, 1, 1, 1, 1, 1]
      const result = _.cluster(list)
      const [a, b, c] = result
      assert.deepEqual(a, [1, 1])
      assert.deepEqual(b, [1, 1])
      assert.deepEqual(c, [1, 1])
    })
    test('列表子集含有剩余数', () => {
      const list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]
      const result = _.cluster(list, 3)
      const [a, b, c, d] = result
      assert.deepEqual(a, [1, 1, 1])
      assert.deepEqual(b, [1, 1, 1])
      assert.deepEqual(c, [1, 1, 1])
      assert.deepEqual(d, [2, 2])
    })
  })
  describe('unique function', () => {
    test('返回数组中唯一项的副本', () => {
      const list = [1, 1, 1, 1, 1, 1, 2, 1]
      const result = _.unique(list)
      assert.deepEqual(result, [1, 2])
    })
    test('返回空数组时返回空数组', () => {
      const result = _.unique([])
      assert.deepEqual(result, [])
    })
    test('使用键 FN 正确删除重复项', () => {
      const list = [
        { id: 'a', word: 'hello' },
        { id: 'a', word: 'hello' },
        { id: 'b', word: 'oh' },
        { id: 'b', word: 'oh' },
        { id: 'c', word: 'yolo' }
      ]
      const result = _.unique(list, x => x.id)
      const [a, b, c] = result
      assert.equal(a.id, 'a')
      assert.equal(a.word, 'hello')
      assert.equal(b.id, 'b')
      assert.equal(b.word, 'oh')
      assert.equal(c.id, 'c')
      assert.equal(c.word, 'yolo')
    })
  })
  describe('range function', () => {
    const obj = { name: 'radash' }
    const toList = <T>(gen: Generator<T>): T[] => {
      const items: T[] = []
      for (const item of gen) items.push(item)
      return items
    }

    test('产生预期值', () => {
      assert.deepEqual(toList(_.range(0, 4)), [0, 1, 2, 3, 4])
      assert.deepEqual(toList(_.range(3)), [0, 1, 2, 3])
      assert.deepEqual(toList(_.range(0, 3)), [0, 1, 2, 3])
      assert.deepEqual(toList(_.range(0, 3, 'y')), ['y', 'y', 'y', 'y'])
      assert.deepEqual(toList(_.range(0, 3, () => 'y')), ['y', 'y', 'y', 'y'])
      assert.deepEqual(toList(_.range(0, 3, i => i)), [0, 1, 2, 3])
      assert.deepEqual(toList(_.range(0, 3, i => `y${i}`)), [
        'y0',
        'y1',
        'y2',
        'y3'
      ])
      assert.deepEqual(toList(_.range(0, 3, obj)), [obj, obj, obj, obj])
      assert.deepEqual(toList(_.range(0, 6, i => i, 2)), [0, 2, 4, 6])
    })
  })
  describe('list function', () => {
    const obj = { name: 'radash' }
    test('创建正确的列表', () => {
      assert.deepEqual(_.list(0, 4), [0, 1, 2, 3, 4])
      assert.deepEqual(_.list(3), [0, 1, 2, 3])
      assert.deepEqual(_.list(0, 3), [0, 1, 2, 3])
      assert.deepEqual(_.list(0, 3, 'y'), ['y', 'y', 'y', 'y'])
      assert.deepEqual(
        _.list(0, 3, () => 'y'),
        ['y', 'y', 'y', 'y']
      )
      assert.deepEqual(
        _.list(0, 3, i => i),
        [0, 1, 2, 3]
      )
      assert.deepEqual(
        _.list(0, 3, i => `y${i}`),
        ['y0', 'y1', 'y2', 'y3']
      )
      assert.deepEqual(_.list(0, 3, obj), [obj, obj, obj, obj])
      assert.deepEqual(
        _.list(0, 6, i => i, 2),
        [0, 2, 4, 6]
      )
    })
    test('如果 step 没有落在它上面，则省略 end', () => {
      const result = _.list(0, 5, i => i, 2)
      assert.deepEqual(result, [0, 2, 4])
    })
    test('仅当步长于结束时才返回 start', () => {
      const result = _.list(0, 5, i => i, 20)
      assert.deepEqual(result, [0])
    })
  })
  describe('flat function', () => {
    test('返回所有数组中的所有项', () => {
      const lists = [['a', 'b'], ['c', 'd'], ['e']]
      const result = _.flat(lists)
      assert.deepEqual(result, ['a', 'b', 'c', 'd', 'e'])
      assert.equal(result[0], 'a')
      assert.equal(result[4], 'e')
    })
  })
  describe('intersects function', () => {
    test('如果列表 A 和 B 具有共同的项目，则返回 true', () => {
      const listA = ['a', 'b']
      const listB = [1, 2, 'b', 'x']
      const result = _.intersects(listA, listB)
      assert.isTrue(result)
    })
    test('如果列表 A 和 B 没有共同点，则返回 false', () => {
      const listA = ['a', 'b', 'c']
      const listB = ['x', 'y']
      const result = _.intersects(listA, listB)
      assert.isFalse(result)
    })
    test('使用自定义标识返回 true', () => {
      const listA = [{ value: 23 }, { value: 12 }]
      const listB = [{ value: 12 }]
      const result = _.intersects(listA, listB, x => x.value)
      assert.isTrue(result)
    })
    test('如果任一列表为 null，则返回 false 而不失败', () => {
      assert.isFalse(_.intersects(null as unknown as never, []))
      assert.isFalse(_.intersects([], null as unknown as never))
    })
  })
  describe('fork function', () => {
    test('返回两个空数组作为 null 输入', () => {
      const [a, b] = _.fork(NULL, x => !!x)
      assert.deepEqual(a, [])
      assert.deepEqual(b, [])
    })
    test('为一个空数组输入返回两个空数组', () => {
      const [a, b] = _.fork([], x => !!x)
      assert.deepEqual(a, [])
      assert.deepEqual(b, [])
    })
    test('返回正确分叉的列表', () => {
      const input = [
        { name: 'ray', group: 'X' },
        { name: 'sara', group: 'X' },
        { name: 'bo', group: 'Y' },
        { name: 'mary', group: 'Y' }
      ]
      const [xs, ys] = _.fork(input, x => x.group === 'X')
      assert.lengthOf(xs, 2)
      assert.lengthOf(ys, 2)
      const [r, s] = xs
      assert.equal(r.name, 'ray')
      assert.equal(s.name, 'sara')
      const [b, m] = ys
      assert.equal(b.name, 'bo')
      assert.equal(m.name, 'mary')
    })
  })
  describe('merge function', () => {
    test('输入 NULL NULL 返回空数组', () => {
      const result = _.merge(NULL, NULL, () => '')
      assert.deepEqual(result, [])
    })
    test('输入 [] [] 返回空数组', () => {
      const result = _.merge([], [], () => '')
      assert.deepEqual(result, [])
    })
    test('输入 [] NULL 返回空数组', () => {
      const result = _.merge([], NULL, () => '')
      assert.deepEqual(result, [])
    })
    test('输入 NULL [] 返回空数组', () => {
      const result = _.merge(NULL, [], () => '')
      assert.deepEqual(result, [])
    })
    test('没有提供matcher函数时，直接返回第一个数组', () => {
      const result = _.merge(
        ['a'],
        [],
        null as unknown as (x: string) => string
      )
      assert.deepEqual(result, ['a'])
    })
    test('返回正确合并的列表', () => {
      const inputA = [
        { name: 'ray', group: 'X' },
        { name: 'sara', group: 'X' },
        { name: 'bo', group: 'Y' },
        { name: 'mary', group: 'Y' }
      ]
      const inputB = [
        { name: 'ray', group: 'XXX' },
        { name: 'mary', group: 'YYY' }
      ]
      const result = _.merge(inputA, inputB, x => x.name)
      assert.equal(result[0].group, 'XXX')
      assert.equal(result[1].group, 'X')
      assert.equal(result[2].group, 'Y')
      assert.equal(result[3].group, 'YYY')
    })
  })
  describe('replaceOrAppend function', () => {
    const letters = ['a', 'b', 'c', 'd', 'e']
    const lettersXA = ['XA', 'b', 'c', 'd', 'e']
    const lettersXC = ['a', 'b', 'XC', 'd', 'e']
    const lettersXE = ['a', 'b', 'c', 'd', 'XE']
    const lettersXX = ['a', 'b', 'c', 'd', 'e', 'XX']
    test('输入两个 null 返回空数组', () => {
      const result = _.replaceOrAppend(NULL, null, () => false)
      assert.deepEqual(result, [])
    })
    test('返回列表输入 null 的新数组', () => {
      const result = _.replaceOrAppend(NULL, 'a', () => false)
      assert.deepEqual(result, ['a'])
    })
    test('返回新项输入 null 的列表', () => {
      const result = _.replaceOrAppend(['a'], null, () => false)
      assert.deepEqual(result, ['a'])
    })
    test('根据 Index 进行替换', () => {
      const result = _.replaceOrAppend(
        ['a', 'b', 'c', 'd'],
        'BB',
        (letter, idx) => idx === 1
      )
      assert.equal(result[1], 'BB')
    })
    test('返回列表，开始有项目替换匹配项', () => {
      const result = _.replaceOrAppend(letters, 'XA', x => x === 'a')
      assert.deepEqual(result, lettersXA)
    })
    test('返回列表，中间有项目替换匹配项', () => {
      const result = _.replaceOrAppend(letters, 'XC', x => x === 'c')
      assert.deepEqual(result, lettersXC)
    })
    test('返回列表，并在末尾替换匹配项', () => {
      const result = _.replaceOrAppend(letters, 'XE', x => x === 'e')
      assert.deepEqual(result, lettersXE)
    })
    test('返回列表，并在末尾追加匹配项', () => {
      const result = _.replaceOrAppend(letters, 'XX', x => x === 'x')
      assert.deepEqual(result, lettersXX)
    })
  })
  describe('toggle function', () => {
    test('处理空输入列表', () => {
      const result = _.toggle(null as unknown as any[], 'a')
      assert.deepEqual(result, ['a'])
    })
    test('处理 null 输入列表和 null 项', () => {
      const result = _.toggle(null as unknown as any[], null)
      assert.deepEqual(result, [])
    })
    test('处理 null 项', () => {
      const result = _.toggle(['a'], null)
      assert.deepEqual(result, ['a'])
    })
    test('当项目不存在时，应使用默认匹配器添加项目', () => {
      const result = _.toggle(['a'], 'b')
      assert.deepEqual(result, ['a', 'b'])
    })
    test('当项目确实存在时，应该使用默认匹配器删除项目', () => {
      const result = _.toggle(['a', 'b'], 'b')
      assert.deepEqual(result, ['a'])
    })
    test('当项确实存在时，应使用自定义匹配器将其删除', () => {
      const result = _.toggle(
        [{ value: 'a' }, { value: 'b' }],
        { value: 'b' },
        v => v.value
      )
      assert.deepEqual(result, [{ value: 'a' }])
    })
    test('当项目不存在时，应使用自定义匹配器添加项目', () => {
      const result = _.toggle([{ value: 'a' }], { value: 'b' }, v => v.value)
      assert.deepEqual(result, [{ value: 'a' }, { value: 'b' }])
    })
    test('设置策略时应在项目前置', () => {
      const result = _.toggle(['a'], 'b', null, { strategy: 'prepend' })
      assert.deepEqual(result, ['b', 'a'])
    })
  })
  describe('sift function', () => {
    const people = [null, 'hello', undefined, false, 23]
    test('输入 null 返回空数组', () => {
      const result = _.sift(NULL)
      assert.deepEqual(result, [])
    })
    test('返回过滤掉虚假值的数组', () => {
      const result = _.sift(people)
      assert.deepEqual(result, ['hello', 23])
    })
  })
  describe('iterate function', () => {
    test('迭代正确的次数', () => {
      const result = _.iterate(5, (acc, idx) => acc + idx, 0)
      assert.equal(result, 15)
    })
  })
  describe('diff function', () => {
    test('处理根数组为 null ', () => {
      const result = _.diff(NULL, ['a'])
      assert.deepEqual(result, ['a'])
    })
    test('处理第二个数组为 null', () => {
      const result = _.diff(['a'], NULL)
      assert.deepEqual(result, ['a'])
    })
    test('处理数组均为 null', () => {
      const result = _.diff(NULL, NULL)
      assert.deepEqual(result, [])
    })
    test('处理根数组为 []', () => {
      const result = _.diff([], ['a'])
      assert.deepEqual(result, [])
    })
    test('处理第二个数组为 []', () => {
      const result = _.diff(['a'], [])
      assert.deepEqual(result, ['a'])
    })
    test('从 root 返回其他 root 中不存在的所有项', () => {
      const result = _.diff(['a', 'b', 'c'], ['c', 'd', 'e'])
      assert.deepEqual(result, ['a', 'b'])
    })
    test('使用标识函数', () => {
      const identity = ({ letter }: { letter: string }) => letter
      const letter = (l: string) => ({ letter: l })
      const result = _.diff(
        [letter('a'), letter('b'), letter('c')],
        [letter('c'), letter('d'), letter('e')],
        identity
      )
      assert.deepEqual(result, [letter('a'), letter('b')])
    })
  })
  describe('shift function', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    test('将数组向右移动 3 个位置', () => {
      const result = _.shift(arr, 3)
      assert.deepEqual(result, [7, 8, 9, 1, 2, 3, 4, 5, 6])
    })
    test('将数组向左移动 3 个位置', () => {
      const result = _.shift(arr, -3)
      assert.deepEqual(result, [4, 5, 6, 7, 8, 9, 1, 2, 3])
    })
    test('将数组向右移动 6 个位置', () => {
      const result = _.shift(arr, 15)
      assert.deepEqual(result, [4, 5, 6, 7, 8, 9, 1, 2, 3])
    })
    test('将数组向左移动 6 个位置', () => {
      const result = _.shift(arr, -15)
      assert.deepEqual(result, [7, 8, 9, 1, 2, 3, 4, 5, 6])
    })
    test('保持数组原样', () => {
      const result = _.shift(arr, 0)
      assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    test('保持数组原样', () => {
      const result = _.shift(arr, 9)
      assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    test('应返回空数组', () => {
      const results = _.shift([], 0)
      assert.deepEqual(results, [])
    })
    test('应返回空数组', () => {
      const results = _.shift([], 10)
      assert.deepEqual(results, [])
    })
  })
})
