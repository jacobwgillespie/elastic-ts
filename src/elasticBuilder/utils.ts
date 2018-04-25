import is from '@sindresorhus/is'

import {Sort} from '../types/common'
import {Query, AllFieldQueryConfigs, AllQueries} from '../types/queries'
// import {filterBuilder} from './filterBuilder'
// import {queryBuilder} from './queryBuilder'

export function isKeyofFieldQuery(v: any): v is keyof AllFieldQueryConfigs {
  return is.string(v)
}

export function isKeyofQuery(v: any): v is keyof AllQueries {
  return is.string(v)
}

export function isFieldConfig<T extends keyof AllFieldQueryConfigs>(_v: any): _v is AllFieldQueryConfigs[T] {
  return true
}

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

export function buildClause(field: any, value: any, opts: any) {
  const hasField = !is.nullOrUndefined(field)
  const hasValue = !is.nullOrUndefined(value)
  let mainClause = {}

  if (hasValue) {
    mainClause = {[field]: value}
  } else if (is.object(field)) {
    mainClause = field
  } else if (hasField) {
    mainClause = {field}
  }

  return {
    ...mainClause,
    ...opts,
  }
}

function unwrap<T>(arr: T[]): undefined | T | T[] {
  return arr.length > 1 ? arr : arr[0]
}

export interface BoolQueryConfig {
  must?: Query | Query[]
  filter?: Query | Query[]
  should?: Query | Query[]
  must_not?: Query | Query[]
  minimum_should_match?: number
}

export function toBoolQuery(data: FilterData): Query {
  const unwrapped = {
    must: unwrap(data.filters.and),
    should: unwrap(data.filters.or),
    must_not: unwrap(data.filters.not),
  }

  if (data.filters.and.length === 1 && !unwrapped.should && !unwrapped.must_not) {
    return unwrapped.must as Query
  }

  const cleaned: BoolQueryConfig = {}

  if (unwrapped.must) {
    cleaned.must = unwrapped.must
  }

  if (unwrapped.should) {
    cleaned.should = unwrapped.should
  }

  if (unwrapped.must_not) {
    cleaned.must_not = unwrapped.must_not
  }

  if (data.minimum_should_match && data.filters.or.length > 1) {
    cleaned.minimum_should_match = data.minimum_should_match
  }

  return {
    bool: cleaned,
  }
}

/*
export function pushQuery(existing, boolKey, type, ...args) {
  const nested: any = {}

  if (is.function_(args[args.length - 1])) {
    const nestedCallback = args.pop()
    const nestedResult = nestedCallback(
      Object.assign(
        {},
        filterBuilder({isInFilterContext: this.isInFilterContext}),
        this.isInFilterContext ? {} : queryBuilder({isInFilterContext: this.isInFilterContext}),
      ),
    )
    if (!this.isInFilterContext && nestedResult.hasQuery()) {
      nested.query = nestedResult.getQuery()
    }
    if (nestedResult.hasFilter()) {
      nested.filter = nestedResult.getFilter()
    }
  }

  if (['bool', 'constant_score'].includes(type) && this.isInFilterContext && nested.filter && nested.filter.bool) {
    // nesting filters: We've introduced an unnecessary `filter.bool`
    existing[boolKey].push({[type]: Object.assign(buildClause(...args), nested.filter.bool)})
  } else if (type === 'bool' && nested.query && nested.query.bool) {
    existing[boolKey].push({[type]: Object.assign(buildClause(...args), nested.query.bool)})
  } else {
    // Usual case
    existing[boolKey].push({[type]: Object.assign(buildClause(...args), nested)})
  }
}
*/
