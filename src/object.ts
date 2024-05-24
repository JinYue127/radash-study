import { isArray, isObject, isPrimitive } from './typed'
import { toInt } from './number'
import { objectify } from './array'

// #region shake
/**
 * 从对象中去除满足特定条件的属性。
 *
 * @param obj - 要处理的对象。
 * @param filter - 一个函数，用于确定是否移除对象中的属性。如果该函数返回`true`，则表示该属性应被移除。
 * @returns 返回一个新的对象，该对象是原对象的深拷贝，但移除了满足过滤条件的属性。
 */
export const shake = <RemovedKeys extends string, T>(
  obj: T,
  filter: (value: any) => boolean = x => x === undefined
): Omit<T, RemovedKeys> => {
  if (!obj) return {} as T // 如果输入对象不存在，则直接返回一个空对象。
  const keys = Object.keys(obj) as (keyof T)[] // 获取对象的所有键名，并断言其类型为T的键名数组。
  return keys.reduce((acc, key) => {
    if (filter(obj[key])) {
      return acc // 如果当前键的值满足过滤条件，则不将其添加到新对象中。
    } else {
      acc[key] = obj[key] // 否则，将当前键及其值添加到新对象中。
      return acc
    }
  }, {} as T) // 初始值为空对象，通过reduce方法构建新对象。
}
// #endregion shake

// #region mapKeys
/**
 * 将对象的键通过映射函数转换为新键，返回一个新的对象，其键为映射后的新键，值保持不变。
 * @param obj 要转换键的对象，其键必须是字符串、数字或符号。
 * @param mapFunc 映射函数，接受当前键和对应的值作为参数，返回新的键。
 * @returns 返回一个新的对象，其中的键为通过映射函数转换后的新键，值与原对象相同。
 */
export const mapKeys = <
  TValue,
  TKey extends string | number | symbol,
  TNewKey extends string | number | symbol
>(
  obj: Record<TKey, TValue>,
  mapFunc: (key: TKey, value: TValue) => TNewKey
): Record<TNewKey, TValue> => {
  // 获取对象的所有键，强制转换为 TKey 类型数组
  const keys = Object.keys(obj) as TKey[]

  // 使用 reduce 方法遍历所有键，应用映射函数转换键，并构建新的对象
  return keys.reduce((acc, key) => {
    acc[mapFunc(key as TKey, obj[key])] = obj[key]
    return acc
  }, {} as Record<TNewKey, TValue>)
}
// #endregion mapKeys

// #region mapValues
/**
 * 将对象的每个值通过映射函数转换成新的值，返回一个新的对象，键保持不变。
 *
 * @param obj 要转换值的对象，其键为 TKey 类型，值为 TValue 类型。
 * @param mapFunc 映射函数，用于将原对象的每个值转换为新值。该函数接收当前值和键作为参数，返回转换后的值。
 * @returns 返回一个新的对象，其中每个值都是通过 mapFunc 转换后的结果，键与原对象保持一致。
 */
export const mapValues = <
  TValue,
  TKey extends string | number | symbol,
  TNewValue
>(
  obj: Record<TKey, TValue>,
  mapFunc: (value: TValue, key: TKey) => TNewValue
): Record<TKey, TNewValue> => {
  // 获取对象的所有键，类型断言为 TKey[]
  const keys = Object.keys(obj) as TKey[]

  // 使用 reduce 方法遍历所有键，将每个值通过 mapFunc 函数转换后存入新的对象中
  return keys.reduce((acc, key) => {
    acc[key] = mapFunc(obj[key], key) // 调用 mapFunc 函数转换值
    return acc // 返回更新后的对象
  }, {} as Record<TKey, TNewValue>) // 初始化空对象，逐步填充转换后的值
}
// #endregion mapValues

// #region mapEntries
/**
 * 将对象的键值对映射到新的键值对。
 * @param obj 要映射的原始对象，其键为 TKey，值为 TValue。
 * @param toEntry 映射函数，接受原始键和值，返回新的键值对（[TNewKey, TNewValue]）。
 * @returns 返回一个新的对象，其键为 TNewKey，值为 TNewValue，由原始对象的键值对经过 toEntry 函数映射得到。
 */
export const mapEntries = <
  TKey extends string | number | symbol,
  TValue,
  TNewKey extends string | number | symbol,
  TNewValue
>(
  obj: Record<TKey, TValue>,
  toEntry: (key: TKey, value: TValue) => [TNewKey, TNewValue]
): Record<TNewKey, TNewValue> => {
  // 如果原始对象不存在，则直接返回一个空对象
  if (!obj) return {} as Record<TNewKey, TNewValue>

  // 使用 reduce 方法遍历原始对象的所有键值对，将其映射到新的键值对，并构建一个新的对象
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // 调用 toEntry 函数将原始键值对映射为新的键值对
    const [newKey, newValue] = toEntry(key as TKey, value as TValue)
    // 将新的键值对添加到累计对象中
    acc[newKey] = newValue
    return acc // 返回更新后的累计对象
  }, {} as Record<TNewKey, TNewValue>)
}
// #endregion mapEntries

// #region invert
/**
 * 将给定的对象进行反转，即将键值对中的键和值互换。
 * @param obj 要反转的对象。该对象的键和值必须为字符串、数字或符号类型。
 * @returns 返回一个新的对象，其中原对象的键成为新对象的值，原对象的值成为新对象的键。
 */
export const invert = <
  TKey extends string | number | symbol,
  TValue extends string | number | symbol
>(
  obj: Record<TKey, TValue>
): Record<TValue, TKey> => {
  // 如果输入对象为空，则直接返回一个空对象
  if (!obj) return {} as Record<TValue, TKey>

  // 将对象的键转换为一个数组
  const keys = Object.keys(obj) as TKey[]

  // 使用reduce方法遍历键数组，构造一个新的对象，其中键值对反转
  return keys.reduce((acc, key) => {
    acc[obj[key]] = key
    return acc
  }, {} as Record<TValue, TKey>)
}
// #endregion invert

// #region lowerize
type LowercaseKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Lowercase<P>]: T[P]
}

/**
 * 将对象的所有键名转换为小写。
 *
 * @param obj - 一个键值对对象，其中键可以是任意字符串。
 * @returns 返回一个新的对象，其中所有键都转换为小写形式。对象的类型与输入对象相同，但键名变为小写。
 */
export const lowerize = <T extends Record<string, any>>(obj: T) =>
  mapKeys(obj, k => k.toLowerCase()) as LowercaseKeys<T>
// #endregion lowerize

// #region upperize
type UppercaseKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Uppercase<P>]: T[P]
}

/**
 * 将对象的所有键名转换为大写形式。
 *
 * @param obj - 一个泛型对象，其键为字符串类型。
 * @returns 返回一个新对象，其中所有键名都转换为了大写形式。对象的值类型与输入对象相同。
 */
export const upperize = <T extends Record<string, any>>(obj: T) =>
  mapKeys(obj, k => k.toUpperCase()) as UppercaseKeys<T>
// #endregion upperize

// #region clone
/**
 * 克隆对象。
 * @param obj 要克隆的对象。
 * @returns 返回obj的深拷贝。注意，函数会返回一个绑定到空对象的原始函数副本，对于原始类型则直接返回自身。
 * @template T 指定被克隆对象的类型。
 */
export const clone = <T>(obj: T): T => {
  // 如果obj是原始类型，直接返回obj本身
  if (isPrimitive(obj)) {
    return obj
  }
  // 如果obj是函数，返回一个绑定到空对象的该函数的新实例
  if (typeof obj === 'function') {
    return obj.bind({})
  }
  // 创建一个新的对象实例
  const newObj = new ((obj as object).constructor as { new(): T })()
  // 遍历原对象的属性，并复制到新对象上
  Object.getOwnPropertyNames(obj).forEach(prop => {
    // 由于之前已经检查了原始类型的条件，这里绕过类型检查
    ;(newObj as any)[prop] = (obj as any)[prop]
  })
  return newObj
}
// #endregion clone

// #region listify
/**
 * 将对象的键值对转换为指定类型的数组。
 * @param obj 要转换的对象，其键必须是字符串、数字或符号。
 * @param toItem 一个函数，用于将键和值转换为指定的结果类型。
 * @returns 返回一个由 toItem 函数处理后的结果组成的数组。
 */
export const listify = <TValue, TKey extends string | number | symbol, KResult>(
  obj: Record<TKey, TValue>,
  toItem: (key: TKey, value: TValue) => KResult
) => {
  // 如果对象不存在，直接返回空数组
  if (!obj) return []
  // 获取对象的所有键值对
  const entries = Object.entries(obj)
  // 如果对象为空，返回空数组
  if (entries.length === 0) return []
  // 使用 reduce 方法将键值对转换为指定类型的数组
  return entries.reduce((acc, entry) => {
    acc.push(toItem(entry[0] as TKey, entry[1] as TValue))
    return acc
  }, [] as KResult[])
}
// #endregion listify

// #region pick
/**
 * 从对象中选择指定属性。
 * @param obj 要选择属性的对象。
 * @param keys 要选择的属性的键名数组。
 * @returns 返回一个新对象，包含原对象中指定的属性。
 */
export const pick = <T extends object, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Pick<T, TKeys> => {
  // 如果对象不存在，返回一个空对象
  if (!obj) return {} as Pick<T, TKeys>
  // 使用reduce方法遍历keys数组，构建一个包含指定属性的新对象
  return keys.reduce((acc, key) => {
    // 检查属性是否存在于对象中，如果存在，则添加到新对象中
    if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key]
    return acc
  }, {} as Pick<T, TKeys>)
}
// #endregion pick

// #region omit
/**
 * 从对象中排除指定属性后返回新对象。
 * @param obj 要处理的对象。
 * @param keys 要排除的属性名数组。
 * @returns 返回一个新对象，该对象不包含指定的属性。
 */
export const omit = <T, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Omit<T, TKeys> => {
  // 如果对象不存在，返回一个空对象
  if (!obj) return {} as Omit<T, TKeys>
  // 如果没有指定要排除的属性，则返回原对象
  if (!keys || keys.length === 0) return obj as Omit<T, TKeys>
  // 使用reduce方法遍历要排除的属性数组，逐个从对象中删除这些属性
  return keys.reduce(
    (acc, key) => {
      // 注意：这里直接修改了acc对象，虽然通常不推荐，但考虑到性能因素，在这个特定场景下允许这么做。
      delete acc[key]
      return acc
    },
    { ...obj } // 复制原对象作为reduce的初始值，避免直接修改原对象
  )
}
// #endregion omit

// #region get
/**
 * 从对象中获取指定路径的值。
 * @param value 要检索的对象。
 * @param path 要获取的值的路径，可以使用点(.)或方括号([])表示嵌套。
 * @param defaultValue 如果指定路径的值不存在，返回的默认值。默认为`undefined`。
 * @returns 沿路径找到的值，如果路径不存在则返回`defaultValue`。
 */
export const get = <TDefault = unknown>(
  value: any,
  path: string,
  defaultValue?: TDefault
): TDefault => {
  // 将路径字符串分割成各个键名
  const segments = path.split(/[.\[\]]/g)
  let current: any = value
  for (const key of segments) {
    // 如果当前值为null或undefined，返回默认值
    if (current === null) return defaultValue as TDefault
    if (current === undefined) return defaultValue as TDefault
    // 移除键名中的引号
    const deQuoted = key.replace(/['"]/g, '')
    // 跳过空键名
    if (deQuoted.trim() === '') continue
    // 沿路径前进
    current = current[deQuoted]
  }
  // 如果最终值未定义，返回默认值
  if (current === undefined) return defaultValue as TDefault
  // 返回找到的值
  return current
}
// #endregion get

// #region set
/**
 * 设置对象中指定路径的值。
 * @param initial 初始对象，将在此对象上进行设置。
 * @param path 要设置的值的路径，可以使用点或方括号语法表示嵌套。
 * @param value 要设置的值。
 * @returns 返回一个新对象，其中指定路径的值已被设置为提供的值。
 */
export const set = <T extends object, K>(
  initial: T,
  path: string,
  value: K
): T => {
  // 如果初始对象不存在，返回一个空对象
  if (!initial) return {} as T
  // 如果路径不存在或值未定义，直接返回初始对象
  if (!path || value === undefined) return initial
  // 分割路径字符串，并过滤掉空格
  const segments = path.split(/[.\[\]]/g).filter(x => !!x.trim())

  // 内部递归函数，用于设置值
  const _set = (node: any) => {
    // 如果还有更多路径段，则递归处理
    if (segments.length > 1) {
      const key = segments.shift() as string
      // 判断下一个路径段是否为数字
      const nextIsNum = toInt(segments[0], null) !== null
      // 为当前节点设置一个新对象或数组，取决于下一个节点预期的类型
      node[key] = node[key] === undefined ? (nextIsNum ? [] : {}) : node[key]
      _set(node[key])
    } else {
      // 如果没有更多路径段，直接设置值
      node[segments[0]] = value
    }
  }

  // 克隆初始对象，以免修改原始对象
  const cloned = clone(initial)
  _set(cloned)
  return cloned
}
// #endregion set

// #region assign
/**
 * 将override对象中的属性值分配给initial对象，如果override中的属性存在，则会覆盖initial中的相应属性。
 * 该函数特别处理了对象属性的嵌套分配。
 *
 * @param initial - 初始对象，其属性将被override对象的属性覆盖或补充。
 * @param override - 用于覆盖或补充initial对象的属性的对象。
 * @returns 返回一个新对象，它包含了initial和override对象的属性，override对象的属性会覆盖initial对象中的同名属性。
 */
export const assign = <X extends Record<string | symbol | number, any>>(
  initial: X,
  override: X
): X => {
  // 如果initial或override对象不存在，则直接返回存在的那个对象，或空对象。
  if (!initial || !override) return initial ?? override ?? {}

  // 使用Object.entries结合reduce方法来遍历合并后的对象，递归处理嵌套对象的合并。
  return Object.entries({ ...initial, ...override }).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: (() => {
          // 如果initial对象的当前属性是对象，则递归调用assign函数进行合并。
          if (isObject(initial[key])) return assign(initial[key], value)
          // 否则直接使用override对象的值。
          return value
        })()
      }
    },
    {} as X  // 初始化reduce操作的累加器为一个空对象，类型断言为X。
  )
}
// #endregion assign

// #region keys
/**
 * 获取对象中所有路径的字符串数组。
 * 该函数递归遍历对象（包括嵌套对象和数组），为每个属性生成一个路径字符串。
 * @param value - 一个对象，可以是嵌套的对象或数组。
 * @returns 返回一个字符串数组，包含输入对象中所有属性的路径。路径使用点符号（.）分隔。
 */
export const keys = <TValue extends object>(value: TValue): string[] => {
  if (!value) return [] // 如果输入值为false值（如null，undefined或空），则直接返回空数组

  // 递归函数，用于获取对象或数组中所有路径
  const getKeys = (nested: any, paths: string[]): string[] => {
    if (isObject(nested)) { // 如果当前项是对象
      // 通过flatMap递归处理对象的每个属性，并拼接当前路径
      return Object.entries(nested).flatMap(([k, v]) =>
        getKeys(v, [...paths, k])
      )
    }
    if (isArray(nested)) { // 如果当前项是数组
      // 通过flatMap递归处理数组的每个元素，并拼接当前索引
      return nested.flatMap((item, i) => getKeys(item, [...paths, `${i}`]))
    }
    // 如果当前项既不是对象也不是数组，返回当前路径
    return [paths.join('.')]
  }
  // 调用递归函数，从空路径开始处理
  return getKeys(value, [])
}
// #endregion keys

// #region crush
/**
 * 将给定的对象打碎为一个简单的键值对对象。
 * @param value 要打碎的对象，它必须是一个对象类型。
 * @returns 返回一个简化后的键值对对象。如果输入值不存在或不是对象，则返回一个空对象。
 */
export const crush = <TValue extends object>(value: TValue): object => {
  // 如果给定的值不存在或不是对象，则直接返回一个空对象
  if (!value) return {}
  // 使用objectify函数将原对象的键和值转换为新的键值对对象
  return objectify(
    keys(value), // 获取原对象的所有键
    k => k,      // 将键直接用作新对象的键
    k => get(value, k) // 使用get函数获取原对象的值，并用作新对象的值
  )
}
// #endregion crush

// #region construct
/**
 * 构造一个新的对象，其结构和内容来源于输入的对象。
 * @param obj - 一个对象，用于构造新对象的模板。
 * @returns 返回一个新构造的对象，其结构与输入的对象相同。
 */
export const construct = <TObject extends object>(obj: TObject): object => {
  // 如果输入的对象不存在，则返回一个空对象
  if (!obj) return {}
  // 通过遍历输入对象的键，构建一个新的对象
  return Object.keys(obj).reduce((acc, path) => {
    // 将遍历到的键值对设置到新构建的对象上
    return set(acc, path, (obj as any)[path])
  }, {})
}
// #endregion construct
