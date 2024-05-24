# tryit

尝试执行一个函数，并处理其返回值或异常。

## 基本用法

::: code-group
```ts[example.ts]
import { tryit } from 'radash'

const [err, user] = await tryit(api.users.find)(userId)
```
```ts[柯里化]
import { tryit } from 'radash'

const findUser = tryit(api.users.find)

const [err, user] = await findUser(userId)
```
:::
## 源码

<<< ../../src/async.ts#tryit{ts}
