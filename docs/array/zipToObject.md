# zipToObject

创建一个对象，将第一个数组中的键映射到第二个数组中对应的值。

## 基本用法

```ts
import { zipToObject } from 'radash'

const names = ['ra', 'zeus', 'loki']
const cultures = ['egypt', 'greek', 'norse']

zipToObject(names, cultures)
// => { ra: egypt, zeus: greek, loki: norse }

zipToObject(names, (k, i) => k + i)
// => { ra: ra0, zeus: zeus1, loki: loki2 }

zipToObject(names, null)
// => { ra: null, zeus: null, loki: null }
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#zipToObject{ts}
:::
