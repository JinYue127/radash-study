# isDate

检查一个值是否为Date对象。

> [!WARNING]
> 不检查输入日期是否有效，仅检查它是 Javascript 日期类型。

## 基本用法

```ts
import { isDate } from 'radash'

isDate(new Date()) // => true
isDate(12)         // => false
isDate('hello')    // => false
```

## 源码

::: details 点我查看代码
<<< ../../src/typed.ts#isDate{ts}
:::
