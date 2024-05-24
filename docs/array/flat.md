# flat

将嵌套的数组拉平为一个一维数组。
>[!TIP]
请注意， _.flat 不是递归的，并且不会展平孩子的孩子的孩子的孩子的孩子的孩子的孩子。它只会展平 T[][] 和数组数组。

## 基本用法

```ts
import { flat } from 'radash'

const gods = [['ra', 'loki'], ['zeus']]

flat(gods) // => [ra, loki, zeus]
```

## 源码

<<< ../../src/array.ts#flat{ts}
