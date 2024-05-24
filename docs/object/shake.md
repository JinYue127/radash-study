# shake

有点像 [_.sift](../array/sift) 但针对对象。默认情况下，它将返回一个新对象，并删除所有未定义的属性。您可以传递第二个函数参数以通过自定义条件删除任何属性。

## 基本用法

```ts
import { shake } from 'radash'

const ra = {
  mode: 'god',
  greek: false,
  limit: undefined
}

shake(ra) // => { mode, greek }
shake(ra, a => !a) // => { mode }
```

## 源码

<<< ../../src/object.ts#shake{ts}
