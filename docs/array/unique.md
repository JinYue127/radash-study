# unique

从数组中去除重复元素。该函数不保留项目的原始顺序。

## 基本用法

```ts
import { unique } from 'radash'

const fish = [
  {
    name: 'Marlin',
    weight: 105,
    source: 'ocean'
  },
  {
    name: 'Salmon',
    weight: 22,
    source: 'river'
  },
  {
    name: 'Salmon',
    weight: 22,
    source: 'river'
  }
]

unique(fish, f => f.name)
// [
//     { name: 'Marlin', weight: 105, source: 'ocean' },
//     { name: 'Salmon', weight: 22, source: 'river' }
// ]

```

## 源码

<<< ../../src/array.ts#unique{ts}
