# fork

根据条件将输入列表分割成两个子列表。第一个子列表包含满足条件的元素，第二个子列表包含不满足条件的元素

## 基本用法

```ts
import { fork } from 'radash'

const gods = [
  {
    name: 'Ra',
    power: 100
  },
  {
    name: 'Zeus',
    power: 98
  },
  {
    name: 'Loki',
    power: 72
  },
  {
    name: 'Vishnu',
    power: 100
  }
]

const [finalGods, lesserGods] = fork(gods, f => f.power > 90) 
// [[ra, vishnu, zues], [loki]]
```

## 源码

<<< ../../src/array.ts#fork{ts}
