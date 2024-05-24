import { isArray, isFunction } from './typed'
// #region group
/**
 * 将输入数组根据指定的分组函数进行分组。
 * @param array 输入的只读数组。
 * @param getGroupId 分组函数，用于为每个数组项生成一个分组标识。
 * @returns 返回一个部分记录（Partial Record），其中键是分组标识，值是属于该分组的数组项数组。
 */
export const group = <T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key
): Partial<Record<Key, T[]>> => {
  // 使用数组的reduce方法进行分组
  return array.reduce((acc, item) => {
    // 获取当前项的分组标识
    const groupId = getGroupId(item)
    // 如果该分组标识还未在结果中，则初始化为空数组
    if (!acc[groupId]) acc[groupId] = []
    // 将当前项添加到对应的分组中
    acc[groupId].push(item)
    return acc // 返回更新后的结果
  }, {} as Record<Key, T[]>) // 初始值为空对象，类型断言为Record<Key, T[]>
}
// #endregion group

// #region zip
export function zip<T1, T2, T3, T4, T5>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[],
  array5: T5[]
): [T1, T2, T3, T4, T5][]
export function zip<T1, T2, T3, T4>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[]
): [T1, T2, T3, T4][]
export function zip<T1, T2, T3>(
  array1: T1[],
  array2: T2[],
  array3: T3[]
): [T1, T2, T3][]
export function zip<T1, T2>(
  array1: T1[],
  array2: T2[]
): [T1, T2][]
/**
 * 创建一个分组元素数组，其中第一个包含给定数组的第一个元素，第二个包含给定数组的第二个元素，依此类推。
 * @param arrays 多个数组，每个数组代表一个维度的数据。
 * @returns 返回一个由元组组成的数组，每个元组包含来自输入数组的相应元素。
 */
export function zip<T>(
  ...arrays: T[][]
): T[][] {
  if (!arrays || !arrays.length) return []
  return new Array(Math.max(...arrays.map(({ length }) => length))).fill([]).map((_, idx) => arrays.map(array => array[idx]))
}
// #endregion zip

// #region zipToObject
/**
 * 创建一个对象，将第一个数组中的键映射到第二个数组中对应的值。
 * @param keys 键的数组，键可以是字符串、数字或符号。
 * @param values 值可以是一个值，一个根据键和索引返回值的函数，或者一个值的数组。
 *               如果是函数，它将接收当前键和索引作为参数；
 *               如果是数组，每个键将对应于该数组的一个元素；
 *               如果是一个值，所有键都将映射到这个值。
 * @returns 返回一个记录（对象），其中每个键都映射到相应的值。
 */
export function zipToObject<K extends string | number | symbol, V>(
  keys: K[],
  values: V | ((key: K, idx: number) => V) | V[]
): Record<K, V> {
  // 当没有提供keys或keys数组为空时，返回一个空对象
  if (!keys || !keys.length) {
    return {} as Record<K, V>
  }
  // 根据values的类型选择合适的值获取方式
  const getValue = isFunction(values) ? values : isArray(values) ? (_k: K, i: number) => values[i]
    : () => values
  // 通过reduce方法将keys和对应的values组合成一个对象
  return keys.reduce((acc, key, idx) => {
    // @ts-expect-error: ts-expect-error
    acc[key] = getValue(key, idx) // 为每个键设置值
    return acc
  }, {} as Record<K, V>)
}
// #endregion zipToObject

// #region boil
/**
 * 对给定的数组进行操作，通过不断应用比较函数来“煮沸”数组，最终返回一个通过比较函数处理后的结果。
 * @param array 一个只读数组，是将要被处理的源数据。
 * @param compareFunc 一个用于比较数组元素并返回一个聚合结果的函数。该函数接收两个参数（数组的两个元素），并返回一个聚合后的值。
 * @returns 如果输入的数组为空或不存在，则返回null；否则，返回通过比较函数处理后的聚合值。
 */
export const boil = <T>(
  array: readonly T[],
  compareFunc: (a: T, b: T) => T
) => {
  // 检查数组是否为空或未定义，若是，则直接返回null
  if (!array || (array.length ?? 0) === 0) return null
  // 使用reduce方法，通过比较函数对数组进行聚合处理，并返回结果
  return array.reduce(compareFunc)
}
// #endregion boil

// #region sum
export function sum<T extends number>(array: readonly T[]): number
/**
 * 计算数组中元素的总和。
 * @param array 一个只读数组，数组中的元素类型可以是对象或者数字。
 * @param fn 一个函数，用于从数组的每个元素中获取一个数字值。如果元素类型是对象，则该函数必填；如果元素类型是数字，则该函数可选。
 * @returns 返回数组中所有元素计算得到的总和。
 */
export function sum<T extends object>(
  array: readonly T[],
  fn: (item: T) => number
): number

/**
 * 给定一个数组，以及一个函数，用于从数组的每个元素中获取一个数字值，将所有项目相加。
 * @param array 一个只读数组，数组中的元素类型可以任意。
 * @param fn 可选，一个函数，用于从数组的每个元素中获取一个数字值。如果元素类型是数字，则该函数不必要。
 * @returns 返回数组中所有元素计算得到的总和。
 */
export function sum<T extends object | number>(
  array: readonly any[],
  fn?: (item: T) => number
) {
  // 使用 reduce 方法计算数组元素的总和
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0)
}
// #endregion sum

// #region first
/**
 * 从数组中获取第一个元素，如果数组为空，则返回默认值。
 *
 * @param array 一个只读数组，函数将从这个数组中获取第一个元素。
 * @param defaultValue 当数组为空时，返回的默认值。默认值为 undefined。
 * @returns 如果数组不为空，返回数组的第一个元素；如果为空，则返回默认值。
 */
export const first = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  // 判断数组是否非空，非空则返回第一个元素，否则返回默认值
  return array?.length > 0 ? array[0] : defaultValue
}
// #endregion first

// #region last
/**
 * 从数组中获取最后一个元素，如果数组为空，则返回默认值。
 * @param array 一个只读数组。
 * @param defaultValue 如果数组为空，可以返回一个默认值，默认值为undefined。
 * @returns 如果数组不为空，返回数组的最后一个元素；如果为空，返回默认值。
 */
export const last = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  // 判断数组是否为空，若不为空返回最后一个元素，否则返回默认值
  return array?.length > 0 ? array[array.length - 1] : defaultValue
}
// #endregion last

// #region sort
/**
 * 对给定的数组进行排序。
 * @param array 需要排序的数组，数组元素类型为泛型 T。
 * @param getter 一个函数，用于从数组元素中获取用于比较的数值。
 * @param desc 是否按降序排序，false 表示升序（默认），true 表示降序。
 * @returns 排序后的数组。
 */
export const sort = <T>(
  array: readonly T[],
  getter: (item: T) => number,
  desc: false | true = false
) => {
  // 如果数组不存在，则直接返回空数组
  if (!array) return []

  // 定义升序和降序的比较函数
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  // 使用 slice 创建数组的副本，然后根据 desc 参数决定使用升序还是降序排序
  return array.slice().sort(desc ? dsc : asc)
}
// #endregion sort

// #region alphabetical
/**
 * 给定一个对象数组和一个用于确定用于排序的属性的回调函数，返回一个新数组，其中对象按字母顺序排序。第三个可选参数允许您按降序而不是默认的升序排序。
 * @param array - 需要排序的数组，数组元素类型为泛型 T。
 * @param getter - 一个函数，用于从数组元素中获取用于排序的字符串属性。
 * @param desc - 指定排序顺序，为 true 时降序排序，为 false 时升序排序，默认为 false。
 * @returns 排序后的数组。
 */
export const alphabetical = <T>(
  array: readonly T[],
  getter: (item: T) => string,
  desc: false | true = false
) => {
  // 如果输入的数组不存在，则直接返回一个空数组
  if (!array) return []

  // 定义升序和降序排序的比较函数
  const asc = (a: T, b: T) => getter(a).localeCompare(getter(b))
  const dsc = (a: T, b: T) => getter(b).localeCompare(getter(a))
  // 利用 Array.prototype.slice() 创建数组的浅拷贝，并根据 desc 参数决定使用升序还是降序排序函数，然后返回排序后的数组
  return array.slice().sort(desc ? dsc : asc)
}
// #endregion alphabetical

// #region counting
/**
 * 给定一个对象数组和一个标识回调函数，以确定应如何识别每个对象。
 * 返回一个对象，其中键是回调返回的 id 值，每个值都是一个整数，表示该 id 出现的次数。
 * @param list 一个只读的数组，其中的元素将被计数。
 * @param identity 一个函数，用于从列表的每个元素中提取一个唯一的标识符。
 * @returns 一个记录，其中键为通过identity函数从列表元素中提取的标识符，值为对应标识符的元素在列表中出现的次数。
 */
export const counting = <T, TId extends string | number | symbol>(
  list: readonly T[],
  identity: (item: T) => TId
): Record<TId, number> => {
  // 如果输入列表为空，直接返回一个空对象
  if (!list) return {} as Record<TId, number>

  // 使用reduce函数遍历列表，累计每个元素出现的次数
  return list.reduce((acc, item) => {
    const id = identity(item) // 从当前元素提取标识符
    acc[id] = (acc[id] ?? 0) + 1 // 如果该标识符已存在，则累加计数；否则初始化为1
    return acc // 返回更新后的计数记录
  }, {} as Record<TId, number>) // 初始值为空的计数记录对象
}
// #endregion counting

// #region replace
/**
 * 替换列表中满足条件的元素。仅替换第一个匹配项。始终返回原始数组的副本
 * @param list 一个只读的数组列表。
 * @param newItem 将要替换原有元素的新元素。
 * @param match 一个回调函数，用于确定哪个元素应该被替换。该函数接收当前元素和其索引作为参数，返回一个布尔值。
 * @returns 一个新的数组，其中满足条件的元素被新元素替换。
 */
export const replace = <T>(
  list: readonly T[],
  newItem: T,
  match: (item: T, idx: number) => boolean
): T[] => {
  // 如果输入列表为空，则直接返回一个空数组
  if (!list) return []
  // 如果新项为undefined，则直接返回原始列表的浅拷贝
  if (newItem === undefined) return [...list]
  // 遍历列表，寻找满足条件的元素
  for (let idx = 0; idx < list.length; idx++) {
    if (match(list[idx], idx)) {
      // 如果找到满足条件的元素，替换之，并返回新的列表
      return [...list.slice(0, idx), newItem, ...list.slice(idx + 1)]
    }
  }
  // 如果没有找到满足条件的元素，则返回原始列表的浅拷贝
  return [...list]
}
// #endregion replace

// #region objectify
/**
 * 将数组转换成一个对象，其中每个元素的键由getKey函数指定，值由getValue函数指定。
 * @param array 要转换为对象的数组。
 * @param getKey 一个函数，用于为数组中的每个元素生成一个键。
 * @param getValue 可选，一个函数，用于为数组中的每个元素生成一个值。如果未提供，则默认为将元素本身作为值。
 * @returns 一个记录（对象），其中键由getKey函数确定，值由getValue函数确定。
 */
export const objectify = <T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value
): Record<Key, Value> => {
  if (!array) return {} as Record<Key, Value>
  // 使用数组的reduce方法，将数组元素一一转换为对象属性
  return array.reduce((acc, item) => {
    acc[getKey(item)] = getValue(item) // 为对象添加新属性
    return acc // 返回更新后的对象
  }, {} as Record<Key, Value>) // 初始值为空对象，类型断言为Record<Key, Value>
}
// #endregion objectify

// #region select
/**
 * 从数组中选择满足特定条件的元素，并通过映射函数转换它们。
 * @param array 一个只读的数组，是选择和转换元素的来源。
 * @param mapper 一个函数，用于将原数组中的元素转换为新类型。
 * @param condition 一个函数，用于确定是否选择数组中的元素。只有满足此条件的元素才会被转换和返回。
 * @returns 返回一个新数组，包含通过条件筛选并经过映射函数转换的元素。
 */
export const select = <T, K>(
  array: readonly T[],
  mapper: (item: T, index: number) => K,
  condition: (item: T, index: number) => boolean
) => {
  // 如果输入数组不存在，则直接返回空数组
  if (!array) return []
  // 使用reduce方法遍历数组，筛选符合条件的元素并应用映射函数
  return array.reduce((acc, item, index) => {
    // 如果当前元素不满足条件，则跳过它，不将其添加到结果数组中
    if (!condition(item, index)) return acc
    // 如果满足条件，则将元素通过映射函数转换后添加到结果数组
    acc.push(mapper(item, index))
    return acc // 返回更新后的结果数组
  }, [] as K[]) // 初始值为空数组，类型断言为K[]
}
// #endregion select

// #region max
export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | null
export function max<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
/**
 * 给定一个数组和一个获取每个项目值的函数，返回具有最大值的项目。在底层使用 boil 函数
 * 提供了三种重载形式：
 * 1. 用于查找数字数组中的最大值。
 * 2. 用于查找任意数组中的最大值，但如果数组元素不是数字，则返回 null。
 * 3. 用于根据指定的getter函数查找数组中具有最大值的元素。
 *
 * @param array - 一个只读数组，可以是数字数组，也可以是其他类型的数组。
 * @param getter - 可选参数，一个函数，用于获取数组元素的数值用于比较。
 * @returns 返回数组中的最大值元素，如果无法进行数值比较或数组为空，则返回 null。
 */
export function max<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  // 默认获取函数，如果未提供getter，则直接使用元素本身
  const get = getter ?? ((v: any) => v)
  // 使用boil函数对数组进行处理，找到其中数值最大的元素
  return boil(array, (a, b) => (get(a) > get(b) ? a : b))
}
// #endregion max

// #region min
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
/**
 * 给定一个数组和一个获取每个项目值的函数，返回具有最小值的项目。在底层使用 boil 函数
 *
 * @param array - 一个只读数组，可以是数字数组或者包含数字的元组。
 * @returns 如果数组为空，返回 null；否则返回数组中的最小值。
 *
 * @param array - 一个只读的泛型数组。
 * @param getter - 一个函数，用于从数组项中获取一个用于比较的数字值。
 * @returns 如果数组为空，返回 null；否则返回数组中通过 getter 函数计算出的最小值的项。
 */
export function min<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  // 提取 getter 函数
  const get = getter ?? ((v: any) => v)
  // 使用 boil 函数找到数组中的最小值
  return boil(array, (a, b) => (get(a) < get(b) ? a : b))
}
// #endregion min

// #region cluster
/**
 * 将给定列表拆分成指定大小的集群。
 * @param list 一个只读数组，表示要拆分的原始列表。
 * @param size 每个集群的大小，默认为2。注意：该参数不会影响最后一个集群的大小，它只会决定除最后一个之外的集群的大小。
 * @returns 返回一个数组，其中每个元素都是原始列表中按指定大小拆分得到的子列表。
 */
export const cluster = <T>(
  list: readonly T[],
  size: number = 2
) => {
  // 计算需要创建的集群数量，向上取整
  const clusterCount = Math.ceil(list.length / size)
  // 创建一个指定长度的数组，并填充为null，然后通过map函数将每个null转换为一个子列表
  return new Array(clusterCount).fill(null).map((_c: null, i: number) => {
    // 根据集群索引，从原始列表中截取对应范围的子列表
    return list.slice(i * size, i * size + size)
  })
}
// #endregion cluster

// #region unique
/**
 * 从数组中去除重复元素。该函数不保留项目的原始顺序。
 * @param array 输入的只读数组。
 * @param toKey 可选函数，用于将数组元素转换为键值。如果不提供，则直接使用元素本身作为键。
 * @returns 返回一个新数组，其中不包含重复的元素。
 */
export const unique = <T, K extends string | number | symbol>(
  array: readonly T[],
  toKey?: (item: T) => K
): T[] => {
  // 使用reduce方法构建一个对象，以唯一的键值对应非重复的元素。
  const valueMap = array.reduce((acc, item) => {
    // 根据toKey函数生成键，若无toKey函数，则直接将元素视为键。
    const key = toKey ? toKey(item) : (item as any as string | number | symbol)
    // 如果已经存在该键，则不添加到valueMap中；否则，添加该元素到valueMap中。
    if (acc[key]) return acc
    acc[key] = item
    return acc
  }, {} as Record<string | number | symbol, T>)
  // 从valueMap对象中提取值，形成一个新的数组返回。
  return Object.values(valueMap)
}
// #endregion unique

// #region range
/**
 * 生成一个数字范围或根据指定规则映射的值的迭代器。
 * @param startOrLength 范围的开始值或长度（如果指定了`end`）。
 * @param end 可选的结束值，如果未指定，则`startOrLength`被视为结束值。
 * @param valueOrMapper 可以是映射函数，用于将索引值映射为定制类型T的值；也可以是一个预设值，直接作为返回值。
 * @param step 步长，指定数值递增的间隔。
 * @returns 返回一个生成器，逐个生成指定范围或映射后的值。
 */
export function* range<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper: T | ((i: number) => T) = i => i as T,
  step: number = 1
): Generator<T> {
  // 确定valueOrMapper是函数还是静态值
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper
  // 根据是否指定了end参数，确定起始值和最终值
  const start = end ? startOrLength : 0
  const final = end ?? startOrLength
  // 通过指定步长遍历，并应用映射函数
  for (let i = start; i <= final; i += step) {
    yield mapper(i)
    // 如果下一个索引超过最终值，终止循环
    if (i + step > final) break
  }
}
// #endregion range

// #region list
/**
 * 生成一个由指定范围或长度填充的数组。
 * @param startOrLength - 数组的开始值或长度。如果指定了结束值 end，则该参数被视为开始值；否则，该参数被视为数组的长度。
 * @param end - （可选）数组的结束值。只有在指定了开始值后才需要提供。
 * @param valueOrMapper - （可选）数组中每个元素的值或一个函数，该函数接收一个索引值并返回数组中的元素值。
 * @param step - （可选）数组元素递增的步长值。
 * @returns 返回一个填充了指定值或通过映射函数生成的值的数组。
 */
export const list = <T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper?: T | ((i: number) => T),
  step?: number
): T[] => {
  // 将范围或长度的定义转换为数组
  return Array.from(range(startOrLength, end, valueOrMapper, step))
}
// #endregion list

// #region flat
/**
 * 将嵌套的数组拉平为一个一维数组。
 * @param lists 一个包含多个数组的二维数组。
 * @returns 拉平后的一维数组。
 */
export const flat = <T>(
  lists: readonly T[][]
): T[] => {
  // 使用reduce方法迭代嵌套数组，将所有元素添加到一个新的数组中
  return lists.reduce((acc, list) => {
    acc.push(...list) // 将当前列表的元素添加到累计数组中
    return acc        // 返回更新后的累计数组
  }, [])
}
// #endregion flat

// #region intersects
/**
 * 判断两个数组是否有交集。
 * @param listA 第一个数组，不可为空。
 * @param listB 第二个数组，不可为空。
 * @param identity 可选函数，用于定义元素的唯一标识。如果未提供，则直接使用元素本身作为标识。
 * @returns 返回一个布尔值，表示两个数组是否有交集。
 */
export const intersects = <T, K extends string | number | symbol>(
  listA: readonly T[],
  listB: readonly T[],
  identity?: (t: T) => K
): boolean => {
  // 检查输入数组是否为空
  if (!listA || !listB) return false

  // 如果未提供identity函数，则默认使用元素本身作为标识
  const ident = identity ?? (x => x as unknown as K)

  // 使用reduce构建一个字典，记录listB中每个元素的标识及其存在性
  const dictB = listB.reduce((acc, item) => {
    acc[ident(item)] = true
    return acc
  }, {} as Record<K, boolean>)
  // 遍历listA，检查是否有元素的标识在字典dictB中
  return listA.some(item => dictB[ident(item)])
}
// #endregion intersects

// #region fork
/**
 * 根据条件将输入列表分割成两个子列表。
 * @param list 一个只读的数组，它的元素类型为 T。
 * @param condition 一个函数，用于测试列表中的每个元素是否满足条件。如果元素满足条件，则它被添加到第一个子列表中；否则，被添加到第二个子列表中。
 * @returns 一个包含两个子列表的元组。第一个子列表包含满足条件的元素，第二个子列表包含不满足条件的元素。
 */
export const fork = <T>(
  list: readonly T[],
  condition: (item: T) => boolean
): [T[], T[]] => {
  // 如果输入列表为空，则直接返回两个空列表
  if (!list) return [[], []]

  // 使用 reduce 方法遍历列表，根据条件将元素分割到两个列表中
  return list.reduce((acc, item) => {
    const [a, b] = acc
    // 如果当前元素满足条件，则将其添加到第一个列表 a 中，同时返回更新后的 a 和不变的 b
    if (condition(item)) {
      return [[...a, item], b]
    } else {
      // 如果当前元素不满足条件，则将其添加到第二个列表 b 中，同时返回不变的 a 和更新后的 b
      return [a, [...b, item]]
    }
  }, [[], []] as [T[], T[]]) // 初始化为两个空列表的元组
}
// #endregion fork

// #region merge
/**
 * 将两个数组合并为一个新数组，其中第二个数组的元素会根据matcher函数的结果与第一个数组进行匹配。
 * 如果第一个数组中的元素在第二个数组中找到匹配项，则只保留第二个数组中的元素。
 *
 * @param root 第一个数组，作为合并的基础数组。
 * @param others 第二个数组，其元素将与第一个数组进行匹配和合并。
 * @param matcher 一个函数，用于根据某个属性或值判断两个元素是否匹配。
 * @returns 返回一个新数组，包含匹配和合并后的结果。
 */
export const merge = <T>(
  root: readonly T[],
  others: readonly T[],
  matcher: (item: T) => any
) => {
  // 当两个输入数组都为空时，返回一个空数组
  if (!others && !root) return []
  // 当只有第一个数组存在时，直接返回第一个数组
  if (!others) return root
  // 当只有第二个数组存在时，返回一个空数组
  if (!root) return []
  // 当没有提供matcher函数时，直接返回第一个数组
  if (!matcher) return root

  // 使用reduce方法遍历第一个数组，根据matcher函数匹配第二个数组中的元素，
  // 如果找到匹配项，则将匹配项添加到结果数组中，否则将原元素添加到结果数组中
  return root.reduce((acc, r) => {
    const matched = others.find(o => matcher(r) === matcher(o))
    if (matched) acc.push(matched)
    else acc.push(r)
    return acc
  }, [] as T[])
}
// #endregion merge

// #region replaceOrAppend
/**
 * 替换或追加元素到列表中。
 *
 * @param list 一个只读的列表数组，类型为 T。
 * @param newItem 要加入列表的新元素，类型为 T。
 * @param match 一个函数，用于判断列表中的元素是否应该被替换。该函数接收两个参数：列表中的元素和元素的索引，并返回一个布尔值。
 * @returns 返回一个新的列表，如果匹配成功，则新列表中匹配的元素被 newItem 替换；如果没有匹配的元素，则将 newItem 追加到列表末尾。如果没有提供列表或新元素，则返回一个空列表或只包含新元素的列表。
 */
export const replaceOrAppend = <T>(
  list: readonly T[],
  newItem: T,
  match: (a: T, idx: number) => boolean
) => {
  // 如果列表和新元素都不存在，返回空数组
  if (!list && !newItem) return []
  // 如果只有列表存在，直接返回该列表的拷贝
  if (!newItem) return [...list]
  // 如果只有新元素存在，返回包含该元素的数组
  if (!list) return [newItem]
  // 遍历列表，寻找需要替换的元素
  for (let idx = 0; idx < list.length; idx++) {
    if (match(list[idx], idx)) {
      // 如果找到匹配的元素，返回替换或追加新元素后的新列表
      return [
        ...list.slice(0, idx), // 匹配元素前的列表部分
        newItem, // 新元素
        ...list.slice(idx + 1, list.length) // 匹配元素后的列表部分
      ]
    }
  }
  return [...list, newItem]
}
// #endregion replaceOrAppend

// #region toggle
/**
 * 切换列表中特定项目的可见性或位置。
 * 如果项目存在，则移除它；如果不存在，则根据策略添加到列表中。
 * @param list 一个只读的数组，代表初始列表。
 * @param item 要切换可见性或位置的项目。
 * @param toKey 一个可选的函数，用于通过返回一个键值来确定项目是否匹配。如果提供，它应该接受一个项目和索引作为参数，并返回一个数字、字符串或符号。如果未提供，则直接比较项目是否相等。
 * @param options 一个可选的对象，包含以下属性：
 * - strategy 指定添加新项目时的策略，可以是 'prepend'（预置，即添加到列表开头）或 'append' （追加，即添加到列表末尾），默认为 'append'。
 * @returns 返回一个新列表，根据条件和策略对项目进行了切换或添加。
 */
export const toggle = <T>(
  list: readonly T[],
  item: T,
  toKey?: null | ((item: T, idx: number) => number | string | symbol),
  options?: {
    strategy?: 'prepend' | 'append'
  }
) => {
  // 如果列表和项目都不存在，返回空数组
  if (!list && !item) return []
  // 如果只有项目不存在，返回列表本身
  if (!list) return [item]
  // 如果只有列表不存在，返回包含单个项目的数组
  if (!item) return [...list]

  // 根据是否提供了toKey函数，定义匹配逻辑
  const matcher = toKey ?
    (x: T, idx: number) => toKey(x, idx) === toKey(item, idx)
    : (x: T) => x === item
  // 查找列表中与给定项目匹配的项目
  const existing = list.find(matcher)

  // 如果找到了匹配的项目，则返回移除该项目的列表
  if (existing) return list.filter((x, idx) => !matcher(x, idx))

  // 确定添加新项目的策略，默认为追加
  const strategy = options?.strategy ?? 'append'
  // 根据策略添加项目到列表，并返回新列表
  return strategy === 'prepend' ? [item, ...list] : [...list, item]
}
// #endregion toggle

// #region sift
type Falsy = null | undefined | false | '' | 0 | 0n
/**
 * 从给定列表中筛选出非Falsy值。
 * @param list 一个由T类型或Falsy类型值组成的只读数组。
 * @returns 返回一个由非Falsy值组成的T类型数组。如果没有非Falsy值，则返回空数组。
 */
export const sift = <T>(
  list: readonly (T | Falsy)[]
): T[] => {
  // 通过filter方法筛选出非Falsy值，并强制类型转换为T类型的数组
  return (list?.filter((x): x is T => !!x) as T[]) ?? []
}
// #endregion sift

// #region iterate
/**
 * 对给定的函数进行指定次数的迭代。
 * @param count 迭代的次数。
 * @param func 一个函数，接受当前值和当前迭代次数作为参数，并返回一个新的值。
 * @param initValue 初始值，迭代的起点。
 * @returns 经过指定次数迭代后的最终值。
 */
export const iterate = <T>(
  count: number,
  func: (currentValue: T, iteration: number) => T,
  initValue: T
) => {
  let value = initValue // 初始化迭代值为初始值
  // 迭代指定次数
  for (let i = 1; i <= count; i++) {
    value = func(value, i) // 对当前值进行函数操作，并更新值
  }
  return value // 返回最终迭代结果
}
// #endregion iterate

// #region diff
/**
 * 比较两个数组的差异，并返回在第一个数组中存在，但在第二个数组中不存在的元素数组。
 * @param root 第一个数组，作为比较的基础。
 * @param other 第二个数组，与第一个数组进行比较。
 * @param identity 一个函数，用于生成数组项的唯一标识。默认情况下，数组项直接被转换为字符串、数字或符号作为标识。
 * @returns 返回一个数组，包含在第一个数组中存在，但在第二个数组中不存在的元素。
 */
export const diff = <T>(
  root: readonly T[],
  other: readonly T[],
  identity: (item: T) => string | number | symbol = (t: T) =>
    t as unknown as string | number | symbol
): T[] => {
  // 如果两个数组都为空，则直接返回空数组
  if (!root?.length && !other?.length) return []
  // 如果第一个数组未定义长度，则认为它为空，返回第二个数组的全部元素
  if (root?.length === undefined) return [...other]
  // 如果第二个数组为空，则认为第一个数组中的所有元素都是唯一的，返回第一个数组
  if (!other?.length) return [...root]

  // 使用第二个数组生成一个记录，其键为根据identity函数生成的标识，值始终为true
  const bKeys = other.reduce((acc, item) => {
    acc[identity(item)] = true
    return acc
  }, {} as Record<string | number | symbol, boolean>)

  // 过滤第一个数组，仅保留那些在第二个数组的记录中没有标识的元素
  return root.filter(item => !bKeys[identity(item)])
}
// #endregion diff

// #region shift
/**
 * 将数组中的元素向右移动指定的次数。
 * @param arr - 要移动元素的数组。
 * @param n - 元素移动的次数。如果此数值大于数组长度，则取其模。
 * @returns 返回移动后的数组。如果输入的数组为空，则直接返回该数组。
 */
export const shift = <T>(
  arr: Array<T>,
  n: number
) => {
  // 如果数组为空，直接返回空数组
  if (arr.length === 0) return arr
  const shiftNumber = n % arr.length  // 计算实际需要移动的次数

  // 如果需要移动的次数为0，直接返回原数组
  if (shiftNumber === 0) return arr

  // 使用数组的slice方法分别获取需要移动到尾部的元素和需要移动到头部的元素，然后合并这两部分
  return [...arr.slice(-shiftNumber, arr.length), ...arr.slice(0, -shiftNumber)]
}
// #endregion shift
