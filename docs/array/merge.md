# merge

将两个数组合并为一个新数组，其中第二个数组的元素会根据matcher函数的结果与第一个数组进行匹配。
如果第一个数组中的元素在第二个数组中找到匹配项，则只保留第二个数组中的元素。

## 基本用法

```ts
import { merge } from 'radash'

const gods = [
  {
    name: 'Zeus',
    power: 92
  },
  {
    name: 'Ra',
    power: 97
  }
]

const newGods = [
  {
    name: 'Zeus',
    power: 100
  }
]

merge(gods, newGods, f => f.name) 
// => [{name: "Zeus" power: 100}, {name: "Ra", power: 97}]
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#merge{ts}
:::
