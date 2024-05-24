# invert

将给定的对象进行反转，即将键值对中的键和值互换。

## 基本用法

```ts
import { invert } from 'radash'

const powersByGod = {
  ra: 'sun',
  loki: 'tricks',
  zeus: 'lighning'
}

invert(gods) // => { sun: ra, tricks: loki, lightning: zeus }
```

## 源码

<<< ../../src/object.ts#invert{ts}
