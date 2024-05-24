# intersects

判断两个数组是否有交集

## 基本用法

```ts
import { intersects } from 'radash'

const oceanFish = ['tuna', 'tarpon']
const lakeFish = ['bass', 'trout']

intersects(oceanFish, lakeFish) // => false

const brackishFish = ['tarpon', 'snook']

intersects(oceanFish, brackishFish) // => true
```

## 源码

<<< ../../src/array.ts#intersects{ts}
