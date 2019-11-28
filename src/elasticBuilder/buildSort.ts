import is from '@sindresorhus/is'
import {FieldSortConfig, SortArgs} from './types'
import {PlainObject} from './utils'

interface SortObject {
  [field: string]: string | object
}

export function deduplicateSort(configs: SortObject[]) {
  const seenFields = new Set<string>()

  return configs
    .reverse()
    .filter(config => {
      const field = Object.keys(config)[0]
      if (seenFields.has(field) && field !== '_geo_distance') {
        return false
      }
      seenFields.add(field)
      return true
    })
    .reverse()
}

/** buildSort takes arguments passed to the sort function and transforms them into configs */
export function buildSort(args: SortArgs) {
  switch (args.length) {
    case 1:
      return buildSort1(args)
    case 2:
      return buildSort2(args)
    default:
      throw new TypeError('invalid arguments')
  }
}

function buildSort1([fieldOrConfigArray]: [string] | [(string | FieldSortConfig)[]]) {
  if (is.string(fieldOrConfigArray)) {
    const field = fieldOrConfigArray
    return {[field]: {order: 'asc'}}
  }

  const configArray = fieldOrConfigArray
  return configArray.map(item => {
    if (is.string(item)) {
      const field = item
      return {[field]: {order: 'asc'}}
    } else {
      const keys = Object.keys(item)
      if (keys.length !== 1) {
        throw new TypeError('invalid argument')
      }
      const field = keys[0]
      const orderOrConfig = item[field]
      if (is.string(orderOrConfig)) {
        const order = orderOrConfig
        return {[field]: {order}}
      } else {
        const config = orderOrConfig
        return {[field]: {...config}}
      }
    }
  })
}

function buildSort2([field, orderOrConfig]: [string, string] | [string, PlainObject]) {
  if (is.string(orderOrConfig)) {
    const order = orderOrConfig
    return {[field]: {order}}
  }
  const config = orderOrConfig
  return {[field]: {...config}}
}
