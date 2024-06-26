# get

从对象中获取指定路径的值。如果指定路径的值不存在，返回的默认值。默认为`undefined`。

## 基本用法

```ts
import { get } from 'radash'

const fish = {
  name: 'Bass',
  weight: 8,
  sizes: [
    {
      maturity: 'adult',
      range: [7, 18],
      unit: 'inches'
    }
  ]
}

get( fish, 'sizes[0].range[1]' ) // 18
get( fish, 'sizes.0.range.1' ) // 18
get( fish, 'foo', 'default' ) // 'default'
```

## 源码

::: details 点我查看代码
<<< ../../src/object.ts#get{ts}
:::
