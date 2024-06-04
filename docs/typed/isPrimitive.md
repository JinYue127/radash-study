# isPrimitive

检查给定值是否为原始值。
> [!TIP]
> 基本类型： number 、 string 、 boolean 、 symbol、 bigint、 undefined、 null

## 基本用法

```ts
import { isPrimitive } from 'radash'

isPrimitive(22) // => true
isPrimitive('hello') // => true
isPrimitive(['hello']) // => false
```

## 源码

::: details 点我查看代码
<<< ../../src/typed.ts#isPrimitive{ts}
:::
