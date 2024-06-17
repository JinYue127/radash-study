# series

为一系列项目创建一个索引和操作方法的工具集。

## 用法

:::code-group

```ts[基本用法]
import { series } from 'radash'

type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

const weekdays = series<Weekday>([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday'
])

weekdays.min('tuesday', 'thursday') // => 'tuesday'
weekdays.max('wednesday', 'monday') // => 'wednesday'
weekdays.next('wednesday') // => 'thursday'
weekdays.previous('tuesday') // => 'monday'
weekdays.first() // => 'monday'
weekdays.last() // => 'friday'
weekdays.next('friday') // => null
weekdays.next('friday', weekdays.first()) // => 'monday'
weekdays.spin('monday', 3) // => 'thursday'
```

```typescript[复杂数据类型]
// 使用对象时，您需要为 series 提供第二个参数，该函数将非原始值转换为可以检查相等性的标识。

import { series } from 'radash'

type Weekday = {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
}

const weekdays = series<Weekday>(
  [
    { day: 'monday' },
    { day: 'tuesday' },
    { day: 'wednesday' },
    { day: 'thursday' },
    { day: 'friday' }
  ],
  w => w.day
)

weekdays.next({ day: 'wednesday' }) // => { day: 'thursday' }
weekdays.previous({ day: 'tuesday' }) // => { day: 'monday' }
```

:::

## 源码

::: details 点我查看代码
<<< ../../src/series.ts#series{ts}
:::
