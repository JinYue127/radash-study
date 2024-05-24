# all

all 函数类似于内置的 `Promise.all` 或 `Promise.allSettled` 函数。给定一个 Promise 列表（或对象），如果抛出任何错误，所有错误都会被收集并抛出到
`AggregateError` 中。

## 基本用法

::: code-group
```ts[arry.ts]
import { all } from 'radash'

const result = await _.all([
  promise.resolve(22),
  promise.resolve('hello'),
  promise.resolve({ name: 'ray' })
])
// [22, 'hello', { name: 'ray' }]
```
```ts[object.ts]
import { all } from 'radash'

const result = await _.all({
  num: promise.resolve(22),
  str: promise.resolve('hello'),
  obj: promise.resolve({ name: 'ray' })
})
/*
{
  num: 22,
  str: 'hello',
  obj: { name: 'ray' }
}*/

```
:::
## 源码

<<< ../../src/async.ts#all{ts}
