# isObject

检查一个值是否为对象类型。

## 基本用法

```ts
import { isObject } from 'radash'

isObject('hello') // => false
isObject(['hello']) // => false
isObject(null) // => false
isObject({ say: 'hello' }) // => true
```

## 源码

<<< ../../src/typed.ts#isObject{ts}
