# max

给定一个数组和一个获取每个项目值的函数，返回具有最大值的项目。在底层使用 [boil](./boil) 函数 。

## 基本用法

```ts
import { max } from 'radash'

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

max(fish, f => f.weight) 
// => {name: "Marlin", weight: 105, source: "ocean"}

```

## 源码

<<< ../../src/array.ts#max{ts}
