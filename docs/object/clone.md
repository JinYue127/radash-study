# clone

克隆对象。

## 基本用法

```ts
import { clone } from 'radash'

const ra = {
  name: 'Ra',
  power: 100
}

const gods = [ra]

clone(ra) // => copy of ra
clone(gods) // => copy of gods
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#clone{ts}
:::
