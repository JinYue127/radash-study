# parallel

与 [_.map](map.md) 类似，但专门为并行运行异步回调函数而构建。第一个参数是允许同时运行的函数数量的限制。返回结果数组。

## 基本用法

::: code-group
```ts[example.ts]
import { parallel } from 'radash'

const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Will run the find user async function 3 at a time
// starting another request when one of the 3 is freed
const users = await parallel(3, userIds, async (userId) => {
  return await api.users.find(userId)
})
```
```ts[errors.ts]
// 当所有工作完成后，并行将检查错误。
// 如果发生任何错误，它们都将被抛出到一个 `AggregateError` 中，该 `AggregateError` 具有 `errors` 属性，该属性是抛出的所有错误。
import { parallel, try as tryit } from 'radash'

const userIds = [1, 2, 3]

const [err, users] = await tryit(parallel)(3, userIds, async (userId) => {
  throw new Error(`No, I don\'t want to find user ${userId}`)
})

console.log(err) // => AggregateError
console.log(err.errors) // => [Error, Error, Error]
console.log(err.errors[1].message) // => No, I don't want to find user 2
```
:::
## 源码

<<< ../../src/async.ts#parallel{ts}
