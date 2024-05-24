# isNumber

检查一个值是否为数字。

## 基本用法

```ts
import { isNumber } from 'radash'

isNumber('hello') // => false
isNumber(['hello']) // => false
isNumber(12) // => true
```

## 源码

<<< ../../src/typed.ts#isNumber{ts}
