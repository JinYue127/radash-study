# mapKeys

将对象的键通过映射函数转换为新键，返回一个新的对象，其键为映射后的新键，值保持不变。

## 基本用法

```ts
import { mapKeys } from 'radash'

const ra = {
  mode: 'god',
  power: 'sun'
}

mapKeys(ra, key => key.toUpperCase()) // => { MODE, POWER }
mapKeys(ra, (key, value) => value) // => { god: 'god', power: 'power' }
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#mapKeys{ts}
:::
