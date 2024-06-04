# isEmpty

检查提供的值是否为空。

## 基本用法

```ts
import { isEmpty } from 'radash'

isEmpty([]) // => true
isEmpty('') // => true

isEmpty('hello')   // => false
isEmpty(['hello']) // => false
```

## 源码

::: details 点我查看代码
<<< ../../src/typed.ts#isEmpty{ts}
:::
