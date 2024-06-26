# crush

将给定的对象打碎为一个简单的键值对对象。深键将在新对象中转换为点符号。

## 基本用法

```ts
import { crush } from 'radash'

const ra = {
  name: 'ra',
  power: 100,
  friend: {
    name: 'loki',
    power: 80
  },
  enemies: [
    {
      name: 'hathor',
      power: 12
    }
  ]
}

crush(ra)
// {
//   name: 'ra',
//   power: 100,
//   'friend.name': 'loki',
//   'friend.power': 80,
//   'enemies.0.name': 'hathor',
//   'enemies.0.power': 12
// }
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#crush{ts}
:::
