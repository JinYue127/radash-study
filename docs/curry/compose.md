# compose

在函数组合中，每个函数都会被赋予下一个函数作为参数，并且必须调用它才能继续执行。

## 基本用法
::: code-group
```ts[example]
import { compose } from 'radash'

const useZero = (fn: any) => () => fn(0)
const objectize = (fn: any) => (num: any) => fn({ num })
const increment = (fn: any) => ({ num }: any) => fn({ num: num + 1 })
const returnArg = (arg: any) => (args: any) => args[arg]

const composed = compose(
  useZero,
  objectize,
  increment,
  increment,
  returnArg('num')
)

composed() // => 2
```


```ts[分解]
//这是一个分解的构图。它相当于上面的代码。
const decomposed = (
  useZero(
    objectize(
      increment(
        increment(
          returnArg('num')))))
)

decomposed() // => 2
```
:::

## 源码

<<< ../../src/curry.ts#compose{ts}
