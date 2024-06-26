# pick 

给定一个对象和该对象中的键列表，返回一个仅包含给定键的新对象。

## 基本用法

```ts
import { pick } from 'radash'

const fish = {
  name: 'Bass',
  weight: 8,
  source: 'lake',
  barckish: false
}

pick(fish, ['name', 'source']) // => { name, source }
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#pick{ts}
:::
