# shuffle

对给定的数组进行随机打乱操作。

## 基本用法

```ts
import { shuffle } from 'radash'

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

shuffle(fish)
```

## 源码

::: details 点我查看代码
<<< ../../src/random.ts#shuffle{ts}
:::
