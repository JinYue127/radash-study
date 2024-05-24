# series

为一系列项目创建一个索引和操作方法的工具集。

## 基本用法

```ts
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

### 复杂数据类型

使用对象时，您需要为 series 提供第二个参数，该函数将非原始值转换为可以检查相等性的标识。

```typescript
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

## 源码

<<< ../../src/series.ts#series{ts}
