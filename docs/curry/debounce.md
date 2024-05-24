# debounce

Debounce 接受一个带有 `delay` 的选项对象和一个在调用时调用的源函数。
当调用返回的函数时，它只会在 `delay` 毫秒时间过去后调用源函数。
不会导致调用源的调用会重置延迟，从而推迟下一次调用。

## 基本用法
::: code-group
```ts[example]
import { debounce } from 'radash'

const makeSearchRequest = (event) => {
  api.movies.search(event.target.value)
}

input.addEventListener('change', debounce({ delay: 100 }, makeSearchRequest))
```

```typescript[cancel]
// debounce 返回的函数有一个 `cancel` 方法，调用该方法时防止它在防抖时间内被执行。
const debounced = debounce({ delay: 100 }, api.feed.refresh)

// ... sometime later

debounced.cancel()
```

```typescript[Flush]
// `Flush` 立即执行函数，忽略防抖逻辑。
const debounced = debounce({ delay: 100 }, api.feed.refresh)

// ... sometime later

debounced.flush(event)
```

```typescript[isPending]
// `isPending` 检查函数是否正在等待执行。
const debounced = debounce({ delay: 100 }, api.feed.refresh)

// ... sometime later

debounced.isPending()
```
:::

## 源码

<<< ../../src/curry.ts#debounce{ts}
