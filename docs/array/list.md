# list

生成一个由指定范围或长度填充的数组。该接口与 [range](./range) 相同。

## 基本用法

```ts
import { list } from 'radash'

list(3)                  // [0, 1, 2, 3]
list(0, 3)               // [0, 1, 2, 3]
list(0, 3, 'y')          // [y, y, y, y]
list(0, 3, () => 'y')    // [y, y, y, y]
list(0, 3, i => i)       // [0, 1, 2, 3]
list(0, 3, i => `y${i}`) // [y0, y1, y2, y3]
list(0, 3, obj)          // [obj, obj, obj, obj]
list(0, 6, i => i, 2)    // [0, 2, 4, 6]

```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#list{ts}
:::
