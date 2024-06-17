# throttle

Throttle 接受一个带有 `interval` 的选项对象和一个在调用时调用的源函数。
当调用返回的函数时，只有在 `interval` 毫秒的时间过去后，它才会调用源函数。
否则，它将忽略该调用。

## 基本用法

::: code-group

```ts[example.ts]
import { throttle } from 'radash'

const onMouseMove = () => {
  rerender()
}

addEventListener('mousemove', throttle({ interval: 200 }, onMouseMove))
```

```typescript[isThrottled]
// `isThrottled` 检查函数是否被节流，即是否在规定时间内无法再次调用。
const debounced = throttle({ interval: 200 }, onMouseMove)

// ... sometime later

debounced.isThrottled()
```

:::

## 源码

::: details 点我查看代码
<<< ../../src/curry.ts#throttle{ts}
:::
