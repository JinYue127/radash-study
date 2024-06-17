# inRange

检查一个数字是否在一个指定范围内。

## 基本用法

```ts
import { inRange } from 'radash'

inRange(10, 0, 20) // true
inRange(9.99, 0, 10) // true
inRange(Math.PI, 0, 3.15) // true
inRange(10, 10, 20) // true
inRange(10, 0, 10) // false

inRange(1, 2) // true
inRange(1, 0) // false
```

## 源码

::: details 点我查看代码
<<< ../../src/number.ts#inRange{ts}
:::
