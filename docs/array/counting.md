# counting

给定一个对象数组和一个标识回调函数，以确定应如何识别每个对象。
返回一个对象，其中键是回调返回的 id 值，每个值都是一个整数，表示该 id 出现的次数。

## 基本用法

```ts
import { counting } from 'radash'

const gods = [
  {
    name: 'Ra',
    culture: 'egypt'
  },
  {
    name: 'Zeus',
    culture: 'greek'
  },
  {
    name: 'Loki',
    culture: 'greek'
  }
]

counting(gods, g => g.culture) 
// => { egypt: 1, greek: 2 }
```

## 源码

<<< ../../src/array.ts#counting{ts}
