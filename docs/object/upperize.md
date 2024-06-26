# upperize

将对象的所有键名转换为大写形式。

## 基本用法

```ts
import { upperize } from 'radash'

const ra = {
  Mode: 'god',
  Power: 'sun'
}

upperize(ra) // => { MODE, POWER }
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#upperize{ts}
:::
