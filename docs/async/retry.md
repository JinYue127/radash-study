# retry

`_.retry `函数允许您运行异步函数，并在失败时自动重试。给定要运行的异步函数、可选的最大重试次数 ( `r` )
以及重试之间的可选毫秒延迟 ( `d`)，将调用给定的异步函数，重试 `r` 多次，并在重试之间等待 `d` 毫秒。
`times` 选项默认为 `3` 。 `delay` 选项（默认为 `null`）可以指定尝试之间休眠的毫秒数。
`backoff` 退避策略

## 基本用法

```ts
import { retry } from 'radash'

await retry({}, api.users.list)
await retry({ times: 10 }, api.users.list)
await retry({ times: 2, delay: 1000 }, api.users.list)

// exponential backoff
await retry({ backoff: i => 10 ** i }, api.users.list)
```

## 源码

::: details 点我查看代码
<<< ../../src/async.ts#retry{ts}
:::
