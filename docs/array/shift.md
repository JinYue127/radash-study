# shift

给定一个项目列表，返回一个向右移动 n 个位置的数组。

## 基本用法

```ts
import { shift } from 'radash'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
shift(arr, 3) // => [7, 8, 9, 1, 2, 3, 4, 5, 6]
```

## 源码

<<< ../../src/array.ts#shift{ts}
