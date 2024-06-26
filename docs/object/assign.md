# assign

将两个对象递归地合并为一个新对象，并从右到左应用值。递归仅适用于子对象属性。

## 基本用法

```ts
import { assign } from 'radash'

const ra = {
  name: 'Ra',
  power: 100
}

assign(ra, { name: 'Loki' })
// => { name: Loki, power: 100 }
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#assign{ts}
:::
