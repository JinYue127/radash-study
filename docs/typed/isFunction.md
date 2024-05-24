# isFunction

检查一个值是否为函数。

## 基本用法

```ts
import { isFunction } from 'radash'

isFunction('hello') // => false
isFunction(['hello']) // => false
isFunction(() => 'hello') // => true
```

## 源码

<<< ../../src/typed.ts#isFunction{ts}
