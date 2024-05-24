# isEqual

比较两个值是否相等。

## 基本用法

```ts
import { isEqual } from 'radash'

isEqual(null, null) // => true
isEqual([], [])     // => true

isEqual('hello', 'world') // => false
isEqual(22, 'abc')        // => false
```

## 源码

<<< ../../src/typed.ts#isEqual{ts}
