# omit

给定一个对象和该对象中的键列表，返回一个没有任何给定键的新对象。

## 基本用法

```ts
import { omit } from 'radash'

const fish = {
  name: 'Bass',
  weight: 8,
  source: 'lake',
  brackish: false
}

omit(fish, ['name', 'source']) // => { weight, brackish }
```

## 源码

<<< ../../src/object.ts#omit{ts}
