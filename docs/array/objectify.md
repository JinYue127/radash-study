# objectify

将数组转换成一个对象，其中每个元素的键由getKey函数指定，值由getValue函数指定。
第一个参数是要映射的数组。
第二个参数是确定每个项目的键的函数。
第三个参数是可选的，用于为数组中的每个元素生成一个值。如果未提供，则默认为将元素本身作为值

## 基本用法

```ts
import { objectify } from 'radash'

const fish = [
  {
    name: 'Marlin',
    weight: 105
  },
  {
    name: 'Bass',
    weight: 8
  },
  {
    name: 'Trout',
    weight: 13
  }
]

objectify(fish, f => f.name) // => { Marlin: [marlin object], Bass: [bass object], ... }
objectify(
  fish,
  f => f.name,
  f => f.weight
) // => { Marlin: 105, Bass: 8, Trout: 13 }
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#objectify{ts}
:::
