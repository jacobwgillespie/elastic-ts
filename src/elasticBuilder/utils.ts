import is from '@sindresorhus/is'

import {Sort} from '../types/common'
import {Query} from '../types/queries'
import {filterBuilder} from './filterBuilder'
import {queryBuilder} from './queryBuilder'

export interface FilterData {
  filters: {
    and: Query[]
    or: Query[]
    not: Query[]
  }
  minimum_should_match?: number
}

export function mergeSort(currentSort: Sort | undefined, sort: Sort): Sort {
  if (!currentSort) {
    return sort
  }

  if (currentSort === sort) {
    return currentSort
  }

  let nextSort = currentSort

  if (is.string(nextSort)) {
    nextSort = [{[nextSort]: nextSort === '_score' ? 'desc' : 'asc'}]
  }

  if (!is.array(nextSort)) {
    nextSort = [nextSort]
  }

  if (is.array(sort)) {
    return [...nextSort, ...sort]
  }

  return [...nextSort, sort]
}
