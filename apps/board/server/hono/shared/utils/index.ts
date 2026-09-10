export const fz = Object.freeze

export const hasProp = <P extends string>(
  item: object,
  prop: P,
): item is { [key in P]: unknown } => {
  return Object.prototype.hasOwnProperty.call(item, prop)
}

export function isEmpty(value: unknown) {
  return value === undefined || value === null || value === ''
}

export function createSingleton<T, Args extends any[]>(
  factory: (...args: Args) => T,
): (...args: Args) => T {
  let instance: T | null = null

  return (...args: Args): T => {
    if (!instance) {
      instance = factory(...args)
    }
    return instance
  }
}

export const objectEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as {
    [K in keyof T]-?: [K extends string | number ? `${K}` : never, T[K]]
  }[keyof T][]
