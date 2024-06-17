# reduce

异步 reduce 函数，用于对数组进行累积计算。

## 基本用法

```ts
const numbers = [
  0,
  1,
  2,
  3,
  4 // => 10
]
const asyncSum = async (a: number, b: number): Promise<number> => {
  return new Promise(res => res(a + b))
}
const result = await _.reduce<number, number>(numbers, asyncSum, 0) // 10
```

## 源码

::: details 点我查看代码
<<< ../../src/async.ts#reduce{ts}
:::
