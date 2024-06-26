# keys

取对象中所有路径的字符串数组。

## 基本用法

```ts
import { keys } from 'radash'

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

keys(ra)
// => [
//   'name',
//   'power',
//   'friend.name',
//   'friend.power',
//   'enemies.0.name',
//   'enemies.0.power'
// ]
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#keys{ts}
:::
