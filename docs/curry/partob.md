# partob

创建一个函数，该函数接受一个部分参数对象和一个剩余参数对象，然后调用一个给定的函数， 将这两个对象合并后的参数传递给该给定函数。

## 基本用法

```ts
import { partob } from 'radash'

const add = (props: { a: number; b: number }) => props.a + props.b

const addFive = partob(add, { a: 5 })

addFive({ b: 2 }) // => 7
```

## 源码

::: details 点我查看代码
<<< ../../src/curry.ts#partob{ts}
:::
