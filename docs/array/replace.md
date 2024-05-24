# replace

替换列表中满足条件的元素。仅替换第一个匹配项。始终返回原始数组的副本

## 基本用法

```ts
import { replace } from 'radash'

const fish = [
  {
    name: 'Marlin',
    weight: 105
  },
  {
    name: 'Bass',
    weight: 8
  },
  {
    name: 'Trout',
    weight: 13
  },
  {
    name: 'Bass',
    weight: 20
  },
]

const salmon = {
  name: 'Salmon',
  weight: 22
}

replace(fish, salmon, f => f.name === 'Bass')
// [
//   { name: 'Marlin', weight: 105 },
//   { name: 'Salmon', weight: 22 },
//   { name: 'Trout', weight: 13 },
//   { name: 'Bass', weight: 20 }
// ]

```

## 源码

<<< ../../src/array.ts#replace{ts}
