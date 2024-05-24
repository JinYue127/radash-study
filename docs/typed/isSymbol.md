# isSymbol

检查一个值是否为函数。

## 基本用法

```ts
import { isSymbol } from 'radash'

isSymbol('hello') // => false
isSymbol(Symbol('hello')) // => true
```

## 源码

<<< ../../src/typed.ts#isSymbol{ts}
