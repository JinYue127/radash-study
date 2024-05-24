# listify

将对象的键值对转换为指定类型的数组。

## 基本用法

```ts
import { listify } from 'radash'

const fish = {
  marlin: {
    weight: 105,
  },
  bass: {
    weight: 8,
  }
}

listify(fish, (key, value) => ({ ...value, name: key }))
// => [{ name: 'marlin', weight: 105 }, { name: 'bass', weight: 8 }]
```

## 源码

<<< ../../src/object.ts#listify{ts}
