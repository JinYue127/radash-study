# sort

对给定的数组进行排序，默认的升序排序。该函数仅支持数字排序。对于按字母顺序排序，请参阅 [alphabetical](./alphabetical) 函数。

## 基本用法

```ts
import { sort } from 'radash'

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
  }
]

sort(fish, f => f.weight) // => [bass, trout, marlin]
sort(fish, f => f.weight, true) // => [marlin, trout, bass]
```

## 源码

<<< ../../src/array.ts#sort{ts}
