# trim

去除字符串两端指定的字符。

## 基本用法
::: code-group
```ts[example.ts]
import { trim } from 'radash'

trim('  hello ') // => hello
trim('__hello__', '_') // => hello
trim('/repos/:owner/', '/') // => repos/:owner
```

```typescript[处理多个字符]
// Trim 还可以处理多个要修剪的字符。
trim('222__hello__111', '12_') // => hello
```
:::

## 源码

::: details 点我查看代码
<<< ../../src/string.ts#trim{ts}
:::
