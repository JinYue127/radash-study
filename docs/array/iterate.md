# iterate

对给定的函数进行指定次数的迭代。

## 基本用法

```ts
import { iterate } from 'radash'

const value = iterate(
  4,
  (acc, idx) => {
    return acc + idx
  },
  0
) // => 10
```
> [!WARNING]
>请注意，这不是零索引。如果您传递的 count 为 5，您将在回调函数中获得索引 1, 2, 3, 4, 5。

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#iterate{ts}
:::
