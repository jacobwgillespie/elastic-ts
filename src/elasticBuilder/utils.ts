import is from '@sindresorhus/is'

import {Sort} from '../types/common'
import {Query, AllFieldQueryConfigs, AllQueries} from '../types/queries'
import {filterBuilder, FilterBuilder, FilterSubFilterBuilder} from './filterBuilder'
import {queryBuilder, QueryBuilder, QuerySubFilterBuilder} from './queryBuilder'

export function isKeyofFieldQuery(v: any): v is keyof AllFieldQueryConfigs {
  return is.string(v)
}

export function isKeyofQuery(v: any): v is keyof AllQueries {
  return is.string(v)
}

export function isFieldConfig<T extends keyof AllFieldQueryConfigs>(_v: any): _v is AllFieldQueryConfigs[T] {
  return true
}

export interface FilterDataClause {
  query: Query
  nested?: {
    filter?: FilterData
    query?: FilterData
  }
}

export interface FilterData {
  clauses: {
    and: FilterDataClause[]
    or: FilterDataClause[]
    not: FilterDataClause[]
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

export function unwrap<T>(arr: T[]): undefined | T | T[] {
  return arr.length > 1 ? arr : arr[0]
}

export interface BoolQueryConfig {
  must?: Query | Query[]
  filter?: Query | Query[]
  should?: Query | Query[]
  must_not?: Query | Query[]
  minimum_should_match?: number
}

// export function toBoolQuery(data: FilterData): Query {
//   const unwrapped = {
//     must: unwrap(data.clauses.and),
//     should: unwrap(data.clauses.or),
//     must_not: unwrap(data.clauses.not),
//   }

//   if (data.clauses.and.length === 1 && !unwrapped.should && !unwrapped.must_not) {
//     return unwrapped.must as Query
//   }

//   const cleaned: BoolQueryConfig = {}

//   if (unwrapped.must) {
//     cleaned.must = unwrapped.must
//   }

//   if (unwrapped.should) {
//     cleaned.should = unwrapped.should
//   }

//   if (unwrapped.must_not) {
//     cleaned.must_not = unwrapped.must_not
//   }

//   if (data.minimum_should_match && data.clauses.or.length > 1) {
//     cleaned.minimum_should_match = data.minimum_should_match
//   }

//   return {
//     bool: cleaned,
//   }
// }

export interface FilterContextSubBuilder extends FilterBuilder<FilterContextSubBuilder> {}
export interface QueryContextSubBuilder
  extends FilterBuilder<QueryContextSubBuilder>,
    QueryBuilder<QueryContextSubBuilder> {}

export type SubBuilder<C extends boolean> = C extends true ? FilterSubFilterBuilder : QuerySubFilterBuilder

export interface FilterContextSubFn {
  (builder: FilterContextSubBuilder): FilterContextSubBuilder
}

export interface QueryContextSubFn {
  (builder: QueryContextSubBuilder): QueryContextSubBuilder
}

export type SubFn<C extends boolean> = C extends true ? FilterContextSubFn : QueryContextSubFn

export function pushQuery<C extends boolean, K extends keyof AllFieldQueryConfigs>(
  isInFilterContext: C,
  existing: FilterData,
  bool: keyof FilterData['clauses'],
  type: K,
  field: string,
  config: AllFieldQueryConfigs[K],
  subfilterCallback?: SubFn<C>,
): FilterData

export function pushQuery<C extends boolean, K extends keyof AllQueries>(
  isInFilterContext: C,
  existing: FilterData,
  bool: keyof FilterData['clauses'],
  type: K,
  config: AllQueries[K],
  subfilterCallback?: SubFn<C>,
): FilterData

export function pushQuery<C extends boolean>(
  isInFilterContext: C,
  existing: FilterData,
  bool: keyof FilterData['clauses'],
  query: Query,
  subfilterCallback?: SubFn<C>,
): FilterData

export function pushQuery<C extends boolean>(
  isInFilterContext: C,
  existing: FilterData,
  bool: keyof FilterData['clauses'],
  one: any,
  two?: any,
  three?: any,
  four?: any,
): FilterData {
  const nested: {filter?: FilterData; query?: FilterData} = {}

  const nestedCallback: null | SubFn<C> = is.function_(four)
    ? four
    : is.function_(three)
      ? three
      : is.function_(two)
        ? two
        : null

  // If a nested callback was provided, compute the nested query
  if (nestedCallback) {
    if (isInFilterContext) {
      const filterNestedCallback: FilterContextSubFn = nestedCallback as FilterContextSubFn
      const subQueryFn: FilterSubFilterBuilder = Object.assign({}, filterBuilder(true))
      const nestedResult = filterNestedCallback(subQueryFn)
      if (nestedResult.hasFilter()) {
        nested.filter = nestedResult.getFilter()
      }
    } else {
      const filterNestedCallback: QueryContextSubFn = nestedCallback as QueryContextSubFn
      const subQueryFn: QueryContextSubBuilder = Object.assign({}, filterBuilder(false), queryBuilder(false))
      const nestedResult = filterNestedCallback(subQueryFn)
      if (nestedResult.hasQuery()) {
        nested.query = nestedResult.getQuery()
      }
      if (nestedResult.hasFilter()) {
        nested.filter = nestedResult.getFilter()
      }
    }
  }

  let query: Query

  if (is.plainObject(one)) {
    query = one
  } else {
    if (is.string(two)) {
      const type: keyof AllFieldQueryConfigs = one
      const field = two
      const config = three

      query = ({
        [type]: {
          [field]: config,
        },
      } as any) as Query
    } else {
      const type: keyof AllQueries = one
      const config = two

      query = {
        [type]: config,
      } as Query
    }
  }

  if (!query) {
    throw new TypeError('invalid params')
  }

  const insertedClause: FilterDataClause = {query}

  if (Object.keys(nested).length > 0) {
    insertedClause.nested = nested
  }

  return {
    ...existing,
    clauses: {
      ...existing.clauses,
      [bool]: [...existing.clauses[bool], insertedClause],
    },
  }
}
