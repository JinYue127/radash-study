# proxied

创建一个代理对象，将对对象属性的访问委托给指定的处理函数。

## 基本用法

```ts
import { proxied } from 'radash'

type Property = 'name' | 'size' | 'getLocation'

const person = proxied((prop: Property) => {
  switch (prop) {
    case 'name':
      return 'Joe'
    case 'size':
      return 20
    case 'getLocation'
      return () => 'here'
  }
})

person.name // => Joe
person.size // => 20
person.getLocation() // => here
```

## 源码

::: details 点我查看代码
<<< ../../src/curry.ts#proxied{ts}
:::
