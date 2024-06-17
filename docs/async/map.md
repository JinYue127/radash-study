# map

对给定的数组进行异步映射操作。

## 基本用法

```ts
import { map } from 'radash'

const userIds = [1, 2, 3, 4]

const users = await map(userIds, async (userId) => {
  return await api.users.find(userId)
})
```

## 源码

::: details 点我查看代码
<<< ../../src/async.ts#map{ts}
:::
