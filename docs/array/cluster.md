# cluster

将给定列表拆分成指定大小的集群。

## 基本用法

```ts
import { cluster } from 'radash'

const gods = ['Ra', 'Zeus', 'Loki', 'Vishnu', 'Icarus', 'Osiris', 'Thor', 'Apollo', 'Artemis', 'Athena']

cluster(gods, 3)
// => [
//   [ 'Ra', 'Zeus', 'Loki' ],
//   [ 'Vishnu', 'Icarus', 'Osiris' ],
//   ['Thor', 'Apollo', 'Artemis'],
//   ['Athena']
// ]
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#cluster{ts}
:::
