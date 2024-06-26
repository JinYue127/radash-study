# diff

比较两个数组的差异，并返回在第一个数组中存在，但在第二个数组中不存在的元素数组。

## 基本用法

```ts
import { diff } from 'radash'

const oldWorldGods = ['ra', 'zeus']
const newWorldGods = ['vishnu', 'zeus']

diff(oldWorldGods, newWorldGods) // => ['ra']
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#diff{ts}
:::
