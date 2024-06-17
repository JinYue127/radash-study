# callable

创建一个代理对象，将对对象属性的访问委托给指定的处理函数。

## 基本用法

```ts
import { callable } from 'radash'

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
```

## 源码

::: details 点我查看代码
<<< ../../src/curry.ts#callable{ts}
:::
