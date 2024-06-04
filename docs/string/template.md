# template

根据提供的数据和模板字符串，将模板字符串中的占位符替换为数据值。

## 基本用法

```ts
import { template } from 'radash'

template('It is {{color}}', { color: 'blue' }) // => It is blue
template('It is <color>', { color: 'blue' }, /<(.+?)>/g) // => It is blue
```

## 源码

::: details 点我查看代码
<<< ../../src/string.ts#template{ts}
:::
