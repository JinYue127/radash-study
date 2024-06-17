# defer

延迟执行函数，直到调用注册的回调函数来触发执行，并处理可能的错误。有点像 `finally` 块。
传递给 _.defer 的函数使用单个 register 函数参数进行调用，该函数参数可用于注册函数完成时要调用的工作。
如果您的函数抛出错误，然后注册的清理函数抛出错误，则默认情况下会忽略该错误。
注册函数支持可选的第二个 options 参数，该参数允许您配置重新抛出策略，以便重新抛出清理函数中的错误。

## 基本用法

```ts
import { defer } from 'radash'

await defer(async (cleanup) => {
  const buildDir = await createBuildDir()

  cleanup(() => fs.unlink(buildDir))

  await build()
})

await defer(async (register) => {
  const org = await api.org.create()
  register(async () => api.org.delete(org.id), { rethrow: true })

  const user = await api.user.create()
  register(async () => api.users.delete(user.id), { rethrow: true })

  await executeTest(org, user)
})
```

## 源码

::: details 点我查看代码
<<< ../../src/async.ts#defer{ts}
:::
