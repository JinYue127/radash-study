# first

从数组中获取第一个元素，如果数组为空，则返回默认值。

## 基本用法

```ts
import { first } from 'radash'

const gods = ['ra', 'loki', 'zeus']

first(gods) // => 'ra'
first([], 'vishnu') // => 'vishnu'
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#first{ts}
:::
