# draw

抽奖，如“从牌堆中抽一张牌”，用于从数组中获取随机项目。

## 基本用法

```ts
import { draw } from 'radash'

const fish = ['marlin', 'bass', 'trout']

draw(fish) // => a random fish
```

## 源码

<<< ../../src/random.ts#draw{ts}
