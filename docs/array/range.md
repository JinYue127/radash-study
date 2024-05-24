# range

生成一个数字范围或根据指定规则映射的值的迭代器。该接口与 [list](./list) 相同

## 基本用法

```ts
import { range } from 'radash'

range(3)                  // yields 0, 1, 2, 3
range(0, 3)               // yields 0, 1, 2, 3
range(0, 3, 'y')          // yields y, y, y, y
range(0, 3, () => 'y')    // yields y, y, y, y
range(0, 3, i => i)       // yields 0, 1, 2, 3
range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
range(0, 3, obj)          // yields obj, obj, obj, obj
range(0, 6, i => i, 2)    // yields 0, 2, 4, 6

for (const i of range(0, 200, 10)) {
  console.log(i) // => 0, 10, 20, 30 ... 190, 200
}

for (const i of range(0, 5)) {
  console.log(i) // => 0, 1, 2, 3, 4, 5
}
```

## 源码

<<< ../../src/array.ts#range{ts}
