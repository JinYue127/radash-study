# alphabetical

给定一个对象数组和一个用于确定用于排序的属性的回调函数，返回一个新数组，其中对象按字母顺序排序。第三个可选参数允许您按降序而不是默认的升序排序。对于数字排序，请参阅 [sort](./sort)
函数。

## 基本用法

```ts
import { alphabetical } from 'radash'

const gods = [
  {
    name: 'Ra',
    power: 100
  },
  {
    name: 'Zeus',
    power: 98
  },
  {
    name: 'Loki',
    power: 72
  },
  {
    name: 'Vishnu',
    power: 100
  }
]

alphabetical(gods, g => g.name) // => [Loki, Ra, Vishnu, Zeus]
alphabetical(gods, g => g.name, 'desc') // => [Zeus, Vishnu, Ra, Loki]
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#alphabetical{ts}
:::
