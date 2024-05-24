# chain

链接函数将导致它们一个接一个地执行，将每个函数的输出作为下一个函数的输入传递，并在链的末尾返回最终输出。

## 基本用法
::: code-group

```ts[example1.ts]
import { chain } from 'radash'

const add = (y: number) => (x: number) => x + y
const mult = (y: number) => (x: number) => x * y
const addFive = add(5)
const double = mult(2)

const chained = chain(addFive, double)

chained(0) // => 10
chained(7) // => 24
```

```ts[example2.ts]
import { chain } from 'radash'

type Deity = {
  name: string
  rank: number
}

const gods: Deity[] = [
  { rank: 8, name: 'Ra' },
  { rank: 7, name: 'Zeus' },
  { rank: 9, name: 'Loki' }
]

const getName = (god: Deity) => item.name
const upperCase = (text: string) => text.toUpperCase() as Uppercase<string>

const getUpperName = chain(
  getName,
  upperCase
)

getUpperName(gods[0])       // => 'RA'
gods.map(getUpperName)      // => ['RA', 'ZEUS', 'LOKI']
```
:::
## 源码

<<< ../../src/curry.ts#chain{ts}
