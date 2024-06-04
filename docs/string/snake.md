# snake

将给定字符串转换为蛇形命名法格式。

## 基本用法

```ts
import { snake } from 'radash'

snake('green fish blue fish') // => green_fish_blue_fish
```

> [!WARNING]
>将数字与相邻字母分开（ `hello5` 变为 `hello_5` ）。您可以通过传递 `splitOnNumber` 选项选择退出此行为并继续使用旧样式（` hello5` 变为 `hello5` ）。

```typescript
snake('5green fish 2blue fish') // => 5_green_fish_2_blue_fish

snake('5green fish 2blue fish', {
  splitOnNumber: false
}) // => 5green_fish_2blue_fish
```
## 源码

::: details 点我查看代码
<<< ../../src/string.ts#snake{ts}
:::
