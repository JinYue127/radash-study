# isPromise

检查一个值是否为Promise对象。

## 基本用法

```ts
import { isPromise } from 'radash'

isPromise('hello') // => false
isPromise(['hello']) // => false
isPromise(new Promise(res => res())) // => true
```

## 源码

<<< ../../src/typed.ts#isPromise{ts}
