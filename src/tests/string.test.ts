import * as _ from '..'
import { assert, describe, test } from 'vitest'

describe('string module', () => {
  describe('camel function', () => {
    test('返回大小写的字符串', () => {
      const result = _.camel('hello world')
      assert.equal(result, 'helloWorld')
    })
    test('返回单个单词', () => {
      const result = _.camel('hello')
      assert.equal(result, 'hello')
    })
    test('返回空输入的空字符串', () => {
      const result = _.camel(null as any)
      assert.equal(result, '')
    })
    test('a word in camel case should remain in camel case', () => {
      const result = _.camel('helloWorld')
      assert.equal(result, 'helloWorld')
    })
  })

  describe('camelCase function', () => {
    test('返回带有空格和大写的非字母数字', () => {
      const result = _.camel('Extbase Starter_flash AND-go')
      assert.equal(result, 'extbaseStarterFlashAndGo')
    })
  })

  describe('snake function', () => {
    test('返回大小写的字符串', () => {
      const result = _.snake('hello world')
      assert.equal(result, 'hello_world')
    })
    test('必须处理 camelCase 字符串', () => {
      const result = _.snake('helloWorld')
      assert.equal(result, 'hello_world')
    })
    test('必须处理短划线字符串', () => {
      const result = _.snake('hello-world')
      assert.equal(result, 'hello_world')
    })
    test('拆分字母旁边的数字', () => {
      const result = _.snake('hello-world12_19-bye')
      assert.equal(result, 'hello_world_12_19_bye')
    })
    test('当标志设置为 false 时不拆分数字', () => {
      const result = _.snake('hello-world12_19-bye', {
        splitOnNumber: false
      })
      assert.equal(result, 'hello_world12_19_bye')
    })
    test('返回单个单词', () => {
      const result = _.snake('hello')
      assert.equal(result, 'hello')
    })
    test('返回空输入的空字符串', () => {
      const result = _.snake(null as any)
      assert.equal(result, '')
    })
  })

  describe('snakeCase function', () => {
    test('返回带有 _ 的非字母数字', () => {
      const result = _.snake('Extbase Starter_flash AND-go')
      assert.equal(result, 'extbase_starter_flash_and_go')
    })
  })

  describe('dash function', () => {
    test('返回大小写的字符串', () => {
      const result = _.dash('hello world')
      assert.equal(result, 'hello-world')
    })
    test('返回单个单词', () => {
      const result = _.dash('hello')
      assert.equal(result, 'hello')
    })
    test('返回空输入的空字符串', () => {
      const result = _.dash(null as any)
      assert.equal(result, '')
    })
    test('必须处理 camelCase 字符串', () => {
      const result = _.dash('helloWorld')
      assert.equal(result, 'hello-world')
    })
    test('必须处理短划线字符串', () => {
      const result = _.dash('hello-world')
      assert.equal(result, 'hello-world')
    })
  })

  describe('dashCase function', () => {
    test('返回非字母数字 -', () => {
      const result = _.dash('Extbase Starter_flash AND-go')
      assert.equal(result, 'extbase-starter-flash-and-go')
    })
  })

  describe('template function', () => {
    test('替换所有匹配项', () => {
      const tmp = `
    Hello my name is {{name}}. I am a {{type}}.
    Not sure why I am {{reason}}.

    Thank You - {{name}}
  `
      const data = {
        name: 'Ray',
        type: 'template',
        reason: 'so beautiful'
      }

      const result = _.template(tmp, data)
      const expected = `
    Hello my name is ${data.name}. I am a ${data.type}.
    Not sure why I am ${data.reason}.

    Thank You - ${data.name}
  `

      assert.equal(result, expected)
    })
    test('替换给定的所有匹配项模板', () => {
      const tmp = `Hello <name>.`
      const data = {
        name: 'Ray'
      }

      const result = _.template(tmp, data, /<(.+?)>/g)
      assert.equal(result, `Hello ${data.name}.`)
    })
  })

  describe('capitalize function', () => {
    test('处理 null', () => {
      const result = _.capitalize(null as any)
      assert.equal(result, '')
    })
    test('将 hello 转换为 Hello', () => {
      const result = _.capitalize('hello')
      assert.equal(result, 'Hello')
    })
    test('将 hello Bob 转换为 Hello bob', () => {
      const result = _.capitalize('hello Bob')
      assert.equal(result, 'Hello bob')
    })
  })

  describe('pascal function', () => {
    test('在 Pascal 中返回非字母数字', () => {
      const result = _.pascal('Extbase Starter_flash AND-go')
      assert.equal(result, 'ExtbaseStarterFlashAndGo')
    })
    test('返回单个单词', () => {
      const result = _.pascal('hello')
      assert.equal(result, 'Hello')
    })
    test('返回空输入的空字符串', () => {
      const result = _.pascal(null as any)
      assert.equal(result, '')
    })
  })

  describe('title function', () => {
    test('返回按标题大小写格式设置的输入', () => {
      assert.equal(_.title('hello world'), 'Hello World')
      assert.equal(_.title('va_va_boom'), 'Va Va Boom')
      assert.equal(_.title('root-hook   -  ok!'), 'Root Hook Ok!')
      assert.equal(_.title('queryItems'), 'Query Items')
      assert.equal(
        _.title('queryAllItems-in_Database'),
        'Query All Items In Database'
      )
    })
    test('返回错误输入的空字符串', () => {
      assert.equal(_.title(null), '')
      assert.equal(_.title(undefined), '')
    })
  })

  describe('trim function', () => {
    test('处理错误输入', () => {
      assert.equal(_.trim(null), '')
      assert.equal(_.trim(undefined), '')
    })
    test('返回正确处理的输入字符串', () => {
      assert.equal(_.trim('\n\n\t\nhello\n\t  \n', '\n\t '), 'hello')
      assert.equal(_.trim('hello', 'x'), 'hello')
      assert.equal(_.trim(' hello  '), 'hello')
      assert.equal(_.trim(' __hello__  ', '_'), ' __hello__  ')
      assert.equal(_.trim('__hello__', '_'), 'hello')
      assert.equal(_.trim('//repos////', '/'), 'repos')
      assert.equal(_.trim('/repos/:owner/:repo/', '/'), 'repos/:owner/:repo')
    })
    test('当 char to trim 在正则表达式中是特殊情况时处理', () => {
      assert.equal(_.trim('_- hello_- ', '_- '), 'hello')
    })
  })
})
