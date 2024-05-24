# construct

与[crush](./crush)相反，给定一个被粉碎到关键路径和值的对象将返回重建的原始对象。

## 基本用法

```ts
import { construct } from 'radash'

const flat = {
  name: 'ra',
  power: 100,
  'friend.name': 'loki',
  'friend.power': 80,
  'enemies.0.name': 'hathor',
  'enemies.0.power': 12
}

construct(flat)
// {
//   name: 'ra',
//   power: 100,
//   friend: {
//     name: 'loki',
//     power: 80
//   },
//   enemies: [
//     {
//       name: 'hathor',
//       power: 12
//     }
//   ]
// }
```

## 源码

<<< ../../src/object.ts#construct{ts}
