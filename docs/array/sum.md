# sum

给定一个数组，以及一个函数，用于从数组的每个元素中获取一个数字值，将所有项目相加。

## 基本用法

```ts
import { sum } from 'radash'

const fish = [
  {
    name: 'Marlin',
    weight: 100
  },
  {
    name: 'Bass',
    weight: 10
  },
  {
    name: 'Trout',
    weight: 15
  }
]

sum(fish, f => f.weight) // => 125
```

## 源码

<<< ../../src/array.ts#sum{ts}
