# select

从数组中选择满足特定条件的元素，并通过映射函数转换它们。

## 基本用法

```ts
import { select } from 'radash'

const fish = [
  {
    name: 'Marlin',
    weight: 105,
    source: 'ocean'
  },
  {
    name: 'Bass',
    weight: 8,
    source: 'lake'
  },
  {
    name: 'Trout',
    weight: 13,
    source: 'lake'
  }
]

select(
  fish,
  f => f.weight,
  f => f.source === 'lake'
) // => [8, 13]

```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#select{ts}
:::
