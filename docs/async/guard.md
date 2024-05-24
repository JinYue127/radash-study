# guard

`guard` 函数用于执行一个给定的函数，并在出现错误时根据条件决定是否拦截错误。

## 基本用法

::: code-group
```ts[example1.ts]
// 如果异步函数出错，您可以设置默认值。
import { guard } from 'radash'

const users = (await guard(fetchUsers)) ?? []
```
```ts[example2.ts]
// 您也可以选择仅保护特定错误
import { guard } from 'radash'

const isInvalidUserError = (err: any) => err.code === 'INVALID_ID'
const user = (await guard(fetchUser, isInvalidUserError)) ?? DEFAULT_USER
```
:::

## 源码

<<< ../../src/async.ts#guard{ts}

