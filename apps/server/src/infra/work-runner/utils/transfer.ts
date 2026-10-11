import { isMarkedAsUntransferable } from 'node:worker_threads'

export interface TransferableResult<T> {
  value: T
  transferable?: ArrayBuffer
}

/**
 * 排除不需要遍历其属性的原生系统对象（交由 V8 结构化克隆内部处理）
 */
function isCloneableLeaf(value: unknown): boolean {
  return (
    value instanceof Date ||
    value instanceof RegExp ||
    value instanceof Error ||
    (typeof URL !== 'undefined' && value instanceof URL)
  )
}

/**
 * 转换 ArrayBufferView
 */
export function toTransferable<T extends ArrayBufferView>(view: T): TransferableResult<T> {
  const buffer = view.buffer

  // 1. SharedArrayBuffer 或已显式标记为不可转移的 Buffer，原样返回（由系统克隆）
  if (!(buffer instanceof ArrayBuffer) || isMarkedAsUntransferable(buffer)) {
    return { value: view }
  }

  // 2. 独占且干净的 Buffer：直接转移，零拷贝
  if (view.byteOffset === 0 && view.byteLength === buffer.byteLength) {
    return { value: view, transferable: buffer }
  }

  // 3. 处于切片/池化状态：切片降级，提取独立 ArrayBuffer
  const newBuffer = buffer.slice(view.byteOffset, view.byteOffset + view.byteLength)

  // 4. 重新包装 View，修复 Node.js Buffer 的构造函数废弃警告
  let newView: T
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(view)) {
    newView = Buffer.from(newBuffer) as unknown as T
  } else {
    const Ctor = view.constructor as new (buf: ArrayBuffer) => T
    newView = new Ctor(newBuffer)
  }

  return {
    value: newView,
    transferable: newBuffer,
  }
}

/**
 * 【主入口】：深层提取 Transferables
 */
export function extractTransferables(input: any): {
  input: any
  transferList: ArrayBuffer[]
} {
  const transferables = new Set<ArrayBuffer>()
  const extracted = new WeakMap<object, unknown>()

  function extract(value: any): any {
    if (!value || typeof value !== 'object') return value

    // 命中缓存（环状引用 / 重复对象）
    const cached = extracted.get(value)
    if (cached !== undefined) return cached

    // 裸 ArrayBuffer
    if (value instanceof ArrayBuffer) {
      if (!isMarkedAsUntransferable(value)) {
        transferables.add(value)
      }
      extracted.set(value, value)
      return value
    }

    // ArrayBufferView (Buffer, TypedArray, DataView)
    if (ArrayBuffer.isView(value)) {
      const { value: transferableView, transferable } = toTransferable(value)
      if (transferable) {
        transferables.add(transferable)
      }
      extracted.set(value, transferableView)
      return transferableView
    }

    // 遇到原生特殊对象，直接跳过深入遍历
    if (isCloneableLeaf(value)) {
      extracted.set(value, value)
      return value
    }

    // 场景 4：普通数组
    if (Array.isArray(value)) {
      const array: unknown[] = []
      extracted.set(value, array)
      for (let i = 0; i < value.length; i++) {
        array.push(extract(value[i]))
      }
      return array
    }

    // 场景 5：Map 和 Set
    if (value instanceof Map) {
      const map = new Map()
      extracted.set(value, map)
      for (const [k, v] of value) {
        map.set(extract(k), extract(v))
      }
      return map
    }
    if (value instanceof Set) {
      const set = new Set()
      extracted.set(value, set)
      for (const v of value) {
        set.add(extract(v))
      }
      return set
    }

    // 场景 6：普通对象 & 自定义类实例（支持 Symbol 键）
    const proto = Object.getPrototypeOf(value)
    if (proto === null || proto === Object.prototype || (proto && proto.constructor !== Object)) {
      const object: Record<string | symbol, unknown> = {}
      extracted.set(value, object)

      const keys = Reflect.ownKeys(value)
      for (const key of keys) {
        object[key] = extract(value[key as keyof typeof value])
      }
      return object
    }

    return value
  }

  return {
    input: extract(input),
    transferList: [...transferables],
  }
}
