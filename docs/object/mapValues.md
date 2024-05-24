# mapValues

将对象的每个值通过映射函数转换成新的值，返回一个新的对象，键保持不变。

## 基本用法

```ts
import { mapValues } from 'radash'

const ra = {
  mode: 'god',
  power: 'sun'
}

mapValues(ra, value => value.toUpperCase()) // => { mode: 'GOD', power: 'SUN' }
mapValues(ra, (value, key) => key) // => { mode: 'mode', power: 'power' }
```

## 源码

<<< ../../src/object.ts#mapValues{ts}
