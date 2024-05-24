# lowerize

将对象的所有键名转换为小写。

## 基本用法

```ts
import { lowerize } from 'radash'

const ra = {
  Mode: 'god',
  Power: 'sun'
}

lowerize(ra) // => { mode, power }
```

## 源码

<<< ../../src/object.ts#lowerize{ts}
