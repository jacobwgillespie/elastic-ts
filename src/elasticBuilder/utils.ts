export type NotFunction<T> = T extends Function ? never : T

export type PlainObject = NotFunction<object>

export type Primitive = null | undefined | string | number | boolean | symbol

export function assertNever(value: never): never {
  throw new TypeError(`Unexpected value: ${value}`)
}

export function flatMap<U, T = any>(items: T[], callbackfn: (value: T, index: number, array: T[]) => U | U[]): U[] {
  const results: U[] = []
  let idx = 0

  for (const item of items) {
    const result = callbackfn(item, idx++, items)
    if (Array.isArray(result)) {
      for (const r of result) {
        results.push(r)
      }
    } else {
      results.push(result)
    }
  }

  return results
}
