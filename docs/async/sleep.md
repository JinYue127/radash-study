# sleep

阻塞当前执行流，等待指定的毫秒数

## 基本用法

```ts
import { sleep } from 'radash'

await sleep(2000) // => waits 2 seconds
```

## 源码

<<< ../../src/async.ts#sleep{ts}
