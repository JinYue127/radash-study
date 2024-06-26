# set

设置对象中指定路径的值。不修改给定的初始对象。

## 基本用法

```ts
import { set } from 'radash'

set({}, 'name', 'ra')
// => { name: 'ra' }

set({}, 'cards[0].value', 2)
// => { cards: [{ value: 2 }] }
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#set{ts}
:::
