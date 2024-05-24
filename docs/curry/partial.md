# partial

通过提供给定函数所需的部分或全部参数来创建部分函数。

## 基本用法

```ts
import { partial } from 'radash'

const add = (a: number, b: number) => a + b

const addFive = partial(add, 5)

addFive(2) // => 7
```

## 源码

<<< ../../src/curry.ts#partial{ts}
