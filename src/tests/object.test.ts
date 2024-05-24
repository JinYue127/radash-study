import { assert, describe, test } from 'vitest'
import * as _ from '..'

const NULL = null as unknown as {}
describe('object module', () => {
  describe('shake function', () => {
    test('删除所有未定义的值', () => {
      const result = _.shake({
        x: 2,
        y: null,
        z: undefined,
        o: false,
        r: 'x'
      })
      assert.deepEqual(result, {
        x: 2,
        y: null,
        o: false,
        r: 'x'
      })
    })
    test('根据筛选函数删除值', () => {
      const result = _.shake(
        {
          x: 2,
          y: null,
          z: undefined,
          o: false,
          r: 'x'
        },
        val => val !== 'x'
      )
      assert.deepEqual(result, {
        r: 'x'
      })
    })
    test('处理未定义的输入', () => {
      const result = _.shake(undefined)
      assert.deepEqual(result, {})
    })
  })
  describe('mapKeys function', () => {
    test('针对 mapper 函数运行所有键', () => {
      const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
      const result = _.mapKeys(
        {
          x: 22,
          y: 8
        },
        prefixWith('x')
      )
      assert.deepEqual(result, {
        xx: 22,
        xy: 8
      })
    })
  })
  describe('mapValues function', () => {
    test('针对 Mapper 函数运行所有值', () => {
      const prefixWith = (prefix: string) => (str: string) => `${prefix} ${str}`
      const result = _.mapValues(
        {
          x: 'hi',
          y: 'bye'
        },
        prefixWith('x')
      )
      assert.deepEqual(result, {
        x: 'x hi',
        y: 'x bye'
      })
    })
  })
  describe('mapEntries function', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray'
    }
    test('处理 null 输入', () => {
      const result = _.mapEntries(
        NULL,
        null as unknown as (
          key: never,
          value: never
        ) => [string | number | symbol, unknown]
      )
      assert.deepEqual(result, {})
    })
    test('正确映射键和值', () => {
      const result = _.mapEntries(peopleByRole, (key, value) => [
        value,
        key.toUpperCase()
      ])
      console.log(result)
      assert.equal(result.jay, 'ADMIN')
      assert.equal(result.fey, 'USER')
      assert.equal(result.bray, 'GUEST')
    })
  })
  describe('invert function', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray'
    }
    test('处理 null 输入', () => {
      const result = _.invert(NULL)
      assert.deepEqual(result, {})
    })
    test('正确映射键和值', () => {
      const result = _.invert(peopleByRole)
      assert.equal(result.jay, 'admin')
      assert.equal(result.fey, 'user')
      assert.equal(result.bray, 'guest')
    })
  })
  describe('lowerize function', () => {
    test('将所有键更改为小写', () => {
      const result = _.lowerize({
        'X-Api-Key': 'value',
        Bearer: 'value'
      })
      assert.deepEqual(result, {
        'x-api-key': 'value',
        bearer: 'value'
      })
    })
  })
  describe('upperize function', () => {
    test('将所有键更改为大写', () => {
      const result = _.upperize({
        'x-api-key': 'value',
        bearer: 'value'
      })
      assert.deepEqual(result, {
        'X-API-KEY': 'value',
        BEARER: 'value'
      })
    })
  })
  describe('clone function', () => {
    test('copies 原始类型', () => {
      const arr = [
        1.1,
        'How you do in?',
        false,
        Symbol('key'),
        BigInt('1'),
        undefined,
        null
      ]
      for (const elm of arr) {
        const newElm = _.clone(elm)
        assert.equal(elm, newElm)
      }
    })
    test('copies 数组', () => {
      const arr = [{ a: 0 }, 1, 2, 3]
      const result = _.clone(arr)

      assert.notEqual(arr, result)
      for (const i in result) {
        assert.equal(arr[i], result[i])
      }
    })
    test('copies 函数', () => {
      const fa = () => 0
      const fb = _.clone(fa)

      assert.notEqual(fa, fb)
      assert.equal(fa(), fb())
    })
    test('复制对象（类实例）而不丢失类类型', () => {
      class Data {
        val = 0
      }

      const obj = new Data()
      obj.val = 1
      const result = _.clone(obj)

      assert.notEqual(obj, result)
      assert.equal(obj.constructor.name, result.constructor.name)
      assert.equal(obj.val, result.val)
    })
    test('从对象复制所有属性', () => {
      const obj = {
        x: 22,
        add: (a: number, b: number) => a + b,
        child: {
          key: 'yolo'
        }
      }
      const result = _.clone(obj)
      assert.equal(result.x, obj.x)
      assert.equal(result.add(2, 2), obj.add(2, 2))
      assert.equal(result.child.key, obj.child.key)
    })
    test('从类实例复制所有属性', () => {
      class Data {
        public x: number = 22
        public child: any = {
          key: 'yolo'
        }

        public add(a: number, b: number) {
          return a + b
        }
      }

      const result = _.clone(new Data())
      assert.equal(result.x, 22)
      assert.equal(result.child.key, 'yolo')
      assert.equal(result.add(1, 2), 3)
    })
  })
  describe('listify function', () => {
    test('处理 null 输入', () => {
      const result = _.listify(null as any as Record<string, string>, () => 1)
      assert.deepEqual(result, [])
    })
    test('处理空对象', () => {
      const result = _.listify({} as Record<string, string>, () => 1)
      assert.deepEqual(result, [])
    })
    test('调用 Item 以转换为列表', () => {
      type Index = 'one' | 'two'
      const obj: Record<Index, any> = {
        one: { name: 'ray' },
        two: { name: 'ash' }
      }
      const result = _.listify(obj, (key, value) => ({
        index: key,
        name: value.name
      }))
      assert.deepEqual(result, [
        { index: 'one', name: 'ray' },
        { index: 'two', name: 'ash' }
      ])
    })
  })
  describe('pick function', () => {
    test('处理 null 输入', () => {
      const result = _.pick(null as unknown as Record<string, unknown>, [])
      assert.deepEqual(result, {})
    })
    test('处理空键', () => {
      const result = _.pick({ a: 2 }, [])
      assert.deepEqual(result, {})
    })
    test('处理键不在对象中', () => {
      const result = _.pick({ a: 2, b: 3 }, ['c'] as any)
      assert.deepEqual(result, {} as any)
    })
    test('处理一个不在对象中的键', () => {
      const result = _.pick({ a: 2, b: 3 }, ['a', 'c'] as any)
      assert.deepEqual(result, { a: 2 } as any)
    })
    test('不会忽略未定义的值', () => {
      const result = _.pick({ a: 2, b: undefined }, ['b'])
      assert.deepEqual(result, { b: undefined })
    })
    test('仅返回已选属性', () => {
      const result = _.pick({ a: 2, b: 4 }, ['a'])
      assert.deepEqual(result, {
        a: 2
      })
    })
    test('类型：接受接口', () => {
      interface SomeDeclaredType {
        a: string
        b: Error
        c: number[]
      }

      const x: SomeDeclaredType = {
        a: 'alpha',
        b: new Error('beta'),
        c: [3]
      }
      const result = _.pick(x, ['a'])
      assert.deepEqual(result, {
        a: 'alpha'
      })
    })
    test('适用于代理对象', () => {
      const target = {
        a: 'hello',
        b: 'everyone'
      }
      const handler1 = {
        get() {
          return 'world'
        }
      }
      const proxy = new Proxy(target, handler1)
      const result = _.pick(proxy, ['a'])
      assert.deepEqual(result, {
        a: 'world'
      })
    })
    test('适用于在没有 Object 原型链的情况下创建的对象，例如通过“Object.create（null）”创建的对象', () => {
      const obj = Object.create(null)
      obj.a = 2
      obj.b = 4
      const result = _.pick(obj, ['a'])
      assert.deepEqual(result, {
        a: 2
      })
    })
    test('适用于覆盖了“hasOwnProperty”的对象', () => {
      const obj = { a: 2, b: 4 }
      // @ts-expect-error：''
      obj.hasOwnProperty = 'OVERWRITTEN'
      const result = _.pick(obj, ['a'])
      assert.deepEqual(result, {
        a: 2
      })
    })
  })
  describe('omit function', () => {
    const person = {
      name: 'jay',
      age: 20,
      active: true
    }
    test('处理 null 输入', () => {
      const result = _.omit(null, [])
      assert.deepEqual(result, {})
    })
    test('处理空键', () => {
      const result = _.omit(person, [])
      assert.deepEqual(result, person)
    })
    test('处理空键', () => {
      const result = _.omit(person, null as unknown as [])
      assert.deepEqual(result, person)
    })
    test('返回不带省略属性的对象', () => {
      const result = _.omit(person, ['name'])
      assert.deepEqual(result, {
        age: 20,
        active: true
      })
    })
  })
  describe('get function', () => {
    type Person = {
      name: string
      age: number
      friends?: Person[]
    }
    const jay: Person = {
      name: 'jay',
      age: 17,
      friends: [
        {
          name: 'carl',
          age: 17,
          friends: [
            {
              name: 'sara',
              age: 17
            }
          ]
        }
      ]
    }
    test('处理 null 和 undefined 输入', () => {
      assert.equal(_.get(null, 'name'), null)
      assert.equal(_.get(undefined, 'name'), null)
    })
    test('将 undefined 视为默认值', () => {
      assert.equal(_.get({}, 'a.b.c', undefined), undefined)
    })
    test('返回指定值或默认值 using path', () => {
      assert.equal(_.get({ age: undefined }, 'age', 22), 22)
      assert.equal(_.get(jay, 'friends[0].age'), 17)
      assert.equal(_.get(jay, 'friends["0"].age'), 17)
      assert.equal(_.get(jay, 'friends.0.age'), 17)
      assert.equal(_.get(jay, 'friends.1.age'), null)
      assert.equal(_.get(jay, 'friends.0.friends[0].name'), 'sara')
      assert.equal(_.get(jay, 'name'), 'jay')
      assert.equal(_.get(jay, '[name]'), 'jay')
      assert.equal(_.get(jay, '["name"]'), 'jay')
      assert.equal(_.get(jay, 'friends[0][name]'), 'carl')
      assert.equal(_.get(jay, 'friends[0].friends[0].friends[0].age', 22), 22)
    })
  })
  describe('set function', () => {
    test('处理错误输入', () => {
      assert.deepEqual(_.set({}, '', {}), {})
      assert.deepEqual(_.set({}, null as any, {}), {})
      assert.deepEqual(_.set({}, '', null as any), {})
      assert.deepEqual(_.set(null as any, '', {}), {})
      assert.deepEqual(_.set(null as any, null as any, null as any), {})
      assert.deepEqual(_.set({ foo: true }, 'foo', false), { foo: false })
      assert.deepEqual(_.set({}, 'foo', 0), { foo: 0 })
    })
    test('正确设置值', () => {
      assert.deepEqual(_.set({}, 'cards.value', 2), {
        cards: { value: 2 }
      })
      assert.deepEqual(_.set({}, 'cards.0.value', 2), {
        cards: [{ value: 2 }]
      })
      assert.deepEqual(_.set({}, 'cards.0.0.value', 2), {
        cards: [[{ value: 2 }]]
      })
      assert.deepEqual(_.set({}, 'cards.[0].[0].value', 2), {
        cards: [[{ value: 2 }]]
      })
      assert.deepEqual(_.set({}, 'cards.[1].[1].value', 2), {
        cards: [undefined, [undefined, { value: 2 }]]
      })
    })
  })
  describe('assign function', () => {
    const initial = {
      name: 'jay',
      cards: ['ac'],
      location: {
        street: '23 main',
        state: {
          abbrev: 'FL',
          name: 'Florida'
        }
      }
    }
    const override = {
      name: 'charles',
      cards: ['4c'],
      location: {
        street: '8114 capo',
        state: {
          abbrev: 'TX',
          name: 'Texas'
        }
      }
    }
    test('处理输入两个 null ', () => {
      const result = _.assign(NULL, NULL)
      assert.deepEqual(result, {})
    })
    test('处理第一个输入 null ', () => {
      const result = _.assign({ a: 'y' }, NULL)
      assert.deepEqual(result, { a: 'y' })
    })
    test('处理最后输入 null ', () => {
      const result = _.assign(NULL, { a: 'y' })
      assert.deepEqual(result, { a: 'y' })
    })
    test('使用 B 中的值正确分配 A', () => {
      const result = _.assign(initial, override)
      assert.deepEqual(result, override)
    })
    test('处理覆盖对象为空', () => {
      const result = _.assign({ a: 'x' }, {})
      assert.deepEqual(result, { a: 'x' })
    })
    test('处理初始对象为空', () => {
      const result = _.assign({}, { b: 'y' })
      assert.deepEqual(result, { b: 'y' })
    })
  })
  describe('keys function', () => {
    test('处理错误输入', () => {
      assert.deepEqual(_.keys({}), [])
      assert.deepEqual(_.keys(null as any), [])
      assert.deepEqual(_.keys(undefined as any), [])
    })
    test('返回正确的键列表', () => {
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hath-or',
            power: 12
          }
        ]
      }
      assert.deepEqual(_.keys(ra), [
        'name',
        'power',
        'friend.name',
        'friend.power',
        'enemies.0.name',
        'enemies.0.power'
      ])
    })
  })
  describe('crush function', () => {
    test('处理错误输入', () => {
      assert.deepEqual(_.crush({}), {})
      assert.deepEqual(_.crush(null as any), {})
      assert.deepEqual(_.crush(undefined as any), {})
    })
    test('返回正确粉碎的对象', () => {
      const now = new Date()
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hat-hor',
            power: 12
          }
        ],
        timestamp: now
      }
      assert.deepEqual(_.crush(ra), {
        name: 'ra',
        power: 100,
        'friend.name': 'loki',
        'friend.power': 80,
        'enemies.0.name': 'hat-hor',
        'enemies.0.power': 12,
        timestamp: now
      })
    })
  })
  describe('construct function', () => {
    test('处理错误输入', () => {
      assert.deepEqual(_.construct({}), {})
      assert.deepEqual(_.construct(null as any), {})
      assert.deepEqual(_.construct(undefined as any), {})
    })
    test('返回正确构造的对象', () => {
      const now = new Date()
      const ra = {
        name: 'ra',
        power: 100,
        friend: {
          name: 'loki',
          power: 80
        },
        enemies: [
          {
            name: 'hat-hor',
            power: 12
          },
          {
            name: 'vishnu',
            power: 58
          }
        ],
        timestamp: now
      }
      assert.deepEqual(
        _.construct({
          name: 'ra',
          power: 100,
          'friend.name': 'loki',
          'friend.power': 80,
          'enemies.0.name': 'hat-hor',
          'enemies.0.power': 12,
          'enemies.1.name': 'vishnu',
          'enemies.1.power': 58,
          timestamp: now
        }),
        ra
      )
    })
  })
})
