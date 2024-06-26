# sift

给定一个项目列表，返回一个新列表，其中包含所有不为假的项目。

## 基本用法

```ts
import { sift } from 'radash'

const fish = ['salmon', null, false, NaN, 'sockeye', 'bass']

sift(fish) // => ['salmon', 'sockeye', 'bass']
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#sift{ts}
:::
