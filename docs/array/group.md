# group

将输入数组根据指定的分组函数进行分组。

## 基本用法

```ts
import { group } from 'radash'

const fish = [
  {
    name: 'Marlin',
    source: 'ocean'
  },
  {
    name: 'Bass',
    source: 'lake'
  },
  {
    name: 'Trout',
    source: 'lake'
  }
]

const fishBySource = group(fish, f => f.source) 
// => { ocean: [marlin], lake: [bass, trout] }
```

## 源码

<<< ../../src/array.ts#group{ts}
