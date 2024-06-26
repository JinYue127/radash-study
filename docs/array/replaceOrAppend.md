# replaceOrAppend

替换或追加元素到列表中。返回一个新的列表，如果匹配成功，则新列表中匹配的元素被 newItem 替换；如果没有匹配的元素，则将 newItem 追加到列表末尾。如果没有提供列表或新元素，则返回一个空列表或只包含新元素的列表。

## 基本用法

```ts
import { replaceOrAppend } from 'radash'

const fish = [
  {
    name: 'Marlin',
    weight: 105
  },
  {
    name: 'Salmon',
    weight: 19
  },
  {
    name: 'Trout',
    weight: 13
  }
]

const salmon = {
  name: 'Salmon',
  weight: 22
}

const sockeye = {
  name: 'Sockeye',
  weight: 8
}

replaceOrAppend(fish, salmon, f => f.name === 'Salmon')
// => [marlin, salmon (weight:22), trout]
replaceOrAppend(fish, sockeye, f => f.name === 'Sockeye')
// => [marlin, salmon, trout, sockeye]
```

## 源码

::: details 点我查看代码
<<< ../../src/array.ts#replaceOrAppend{ts}
:::
