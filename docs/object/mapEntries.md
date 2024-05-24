# mapEntries

将对象的键值对映射到新的键值对。它是 [_.mapValues](./mapValues) 和 [_.mapKeys](./mapKeys) 的合二为一。

## 基本用法

```ts
import { mapEntries } from 'radash'

const ra = {
  name: 'Ra',
  power: 'sun',
  rank: 100,
  culture: 'egypt'
}

mapEntries(ra, (key, value) => [key.toUpperCase(), `${value}`]) 
// => { NAME: 'Ra', POWER: 'sun', RANK: '100', CULTURE: 'egypt' }
```

## 源码

<<< ../../src/object.ts#mapEntries{ts}
