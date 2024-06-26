# boil

对给定的数组进行操作，通过不断应用比较函数来“煮沸”数组，最终返回一个通过比较函数处理后的结果。

## 基本用法

```ts
import { boil } from 'radash'

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

::: details 点我查看代码
<<< ../../src/array.ts#boil{ts}
:::
