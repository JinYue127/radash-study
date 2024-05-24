# zip

创建一个分组元素数组，其中第一个包含给定数组的第一个元素，第二个包含给定数组的第二个元素，依此类推。

## 基本用法

```ts
import { zip } from 'radash'

const names = ['ra', 'zeus', 'loki']
const cultures = ['egypt', 'greek', 'norse']

zip(names, cultures)
// => [
//   [ra, egypt]
//   [zeus, greek]
//   [loki, norse]
// ]
```

## 源码

<<< ../../src/array.ts#zip{ts}
