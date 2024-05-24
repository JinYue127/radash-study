# toggle

切换列表中特定项目的可见性或位置。
如果项目存在，则移除它；如果不存在，则根据策略添加到列表中。

## 基本用法

::: code-group
```ts[example1]
// 如果列表中已存在符合条件的项目，则会将其删除。如果没有，将会添加。
import { toggle } from 'radash'

const gods = ['ra', 'zeus', 'loki']

toggle(gods, 'ra')     // => [zeus, loki]
toggle(gods, 'vishnu') // => [ra, zeus, loki, vishnu]
```
```ts[example2]
// 您可以传递可选的 toKey 函数来确定非原始值的标识。在处理更复杂的数据类型时很有帮助。
import { toggle } from 'radash'

const ra = { name: 'Ra' }
const zeus = { name: 'Zeus' }
const loki = { name: 'Loki' }
const vishnu = { name: 'Vishnu' }

const gods = [ra, zeus, loki]

toggle(gods, ra, g => g.name)     // => [zeus, loki]
toggle(gods, vishnu, g => g.name) // => [ra, zeus, loki, vishnu]
```
```ts[example3]
// 默认情况下，如果项目不存在，切换将追加该项目。如果您需要在该项目前面添加内容，您可以覆盖选项参数中的 strategy 。
import { toggle } from 'radash'

const gods = ['ra', 'zeus', 'loki']

toggle(gods, 'vishnu', g => g, { strategy: 'prepend' }) 
// => [vishnu, ra, zeus, loki]
```
:::
## 源码

<<< ../../src/array.ts#toggle{ts}
