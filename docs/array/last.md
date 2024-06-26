# last

从数组中获取最后一个元素，如果数组为空，则返回默认值。

## 基本用法

```ts
import { last } from 'radash'

const fish = ['marlin', 'bass', 'trout']

const lastFish = last(fish) // => 'trout'
const lastItem = last([], 'bass') // => 'bass'
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#last{ts}
:::
