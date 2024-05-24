# memo

用 memo 包装一个函数，缓存函数调用的结果，以减少重复计算。

## 基本用法
::: code-group
```ts[example.ts]
import { memo } from 'radash'

const timestamp = memo(() => Date.now())

const now = timestamp()
const later = timestamp()

now === later // => true
```

```typescript[ttl]
// 您可以选择传递`ttl` （生存时间），这将使记忆的结果过期
import { memo, sleep } from 'radash'

const timestamp = memo(() => Date.now(), {
  ttl: 1000 // milliseconds
})

const now = timestamp()
const later = timestamp()

await sleep(2000)

const muchLater = timestamp()

now === later // => true
now === muchLater // => false
```

```typescript[自定义存储值时的存储方式]
// 您可以选择自定义存储值时的存储方式。
const timestamp = memo(({ group }: { group: string }) => {
  const ts = Date.now()
  return `${ts}::${group}`
}, {
  key: ({ group }: { group: string }) => group
})

const now = timestamp({ group: 'alpha' })
const later = timestamp({ group: 'alpha' })
const beta = timestamp({ group: 'beta' })

now === later // => true
beta === now // => false
```
:::

## 源码

<<< ../../src/curry.ts#memo{ts}
