# uid

生成带有可选特殊字符的唯一字符串。

## 基本用法

```ts
import { uid } from 'radash'

uid(7) // => UaOKdlW
uid(20, '*') // => dyJdbC*NsEgcnGjTHS
```

> [!TIP]
> 请注意，此函数针对简单性和可用性进行了优化，而不是针对性能或安全性进行了优化。如果您需要创建通用唯一或加密随机字符串，请使用专门用于该目的的包。

## 源码

<<< ../../src/random.ts#uid{ts}
