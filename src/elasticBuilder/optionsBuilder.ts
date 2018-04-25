import is from '@sindresorhus/is'
import {Sort} from '../types/common'
import {SearchBody} from '../types'
import {OptionsBuilder} from './types'
import {mergeSort} from './utils'

function buildOptionsBuilder<B>(this: B, initialData?: SearchBody): OptionsBuilder<B> {
  const options: SearchBody = initialData || {}

  return Object.assign({}, this, {
    sort(field: any, order?: any) {
      let currentSort = options.sort
      let nextSort: Sort

      if (is.string(field)) {
        if (order != null) {
          nextSort = {[field]: order}
          nextSort = mergeSort(currentSort, nextSort)
        } else {
          nextSort = mergeSort(currentSort, field)
        }
      } else {
        nextSort = mergeSort(currentSort, field)
      }

      return buildOptionsBuilder.call(this, {
        ...options,
        sort: nextSort,
      })
    },

    from(quantity: number | undefined) {
      if (options.from !== quantity) {
        return buildOptionsBuilder.call(this, {
          ...options,
          from: quantity,
        })
      }
      return this
    },

    size(quantity: number | undefined) {
      if (options.size !== quantity) {
        return buildOptionsBuilder.call(this, {
          ...options,
          size: quantity,
        })
      }
      return this
    },

    rawOption(k: any, v: any) {
      return buildOptionsBuilder.call(this, {
        ...options,
        [k]: v,
      })
    },

    getOptions() {
      return options
    },

    hasOptions() {
      return !is.empty(options)
    },
  })
}

export function optionsBuilder<B>(this: B) {
  return buildOptionsBuilder.apply(this)
}
