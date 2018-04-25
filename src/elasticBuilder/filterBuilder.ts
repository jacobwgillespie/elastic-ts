import {Query, AllQueries, AllFieldQueryConfigs} from '../types/queries'
import {FilterData, pushQuery} from './utils'
import {QueryBuilder} from './queryBuilder'

export interface FilterSubFilterBuilder
  extends QueryBuilder<FilterSubFilterBuilder>,
    FilterBuilder<FilterSubFilterBuilder> {}

export type FilterSubFilterFn = (sub: FilterSubFilterBuilder) => FilterSubFilterBuilder

export interface FilterBuilder<B> {
  filter<K extends keyof AllFieldQueryConfigs>(
    type: K,
    field: string,
    config: AllFieldQueryConfigs[K],
    subfilters?: FilterSubFilterFn,
  ): B
  filter<K extends keyof AllQueries>(type: K, config: AllQueries[K], subfilters?: FilterSubFilterFn): B
  filter(filter: Query): B

  andFilter<K extends keyof AllFieldQueryConfigs>(
    type: K,
    field: string,
    config: AllFieldQueryConfigs[K],
    subfilters?: FilterSubFilterFn,
  ): B
  andFilter<K extends keyof AllQueries>(type: K, config: AllQueries[K], subfilters?: FilterSubFilterFn): B
  andFilter(filter: Query): B

  orFilter<K extends keyof AllFieldQueryConfigs>(
    type: K,
    field: string,
    config: AllFieldQueryConfigs[K],
    subfilters?: FilterSubFilterFn,
  ): B
  orFilter<K extends keyof AllQueries>(type: K, config: AllQueries[K], subfilters?: FilterSubFilterFn): B
  orFilter(filter: Query): B

  notFilter<K extends keyof AllFieldQueryConfigs>(
    type: K,
    field: string,
    config: AllFieldQueryConfigs[K],
    subfilters?: FilterSubFilterFn,
  ): B
  notFilter<K extends keyof AllQueries>(type: K, config: AllQueries[K], subfilters?: FilterSubFilterFn): B
  notFilter(filter: Query): B

  getFilter(): FilterData
  hasFilter(): boolean
}

export function buildFilterBuilder<B>(this: B, isInFilterContext: boolean, initialData?: FilterData): FilterBuilder<B> {
  const data: FilterData = initialData || {
    clauses: {
      and: [],
      or: [],
      not: [],
    },
  }

  const makeQuery = pushQuery.bind(undefined, isInFilterContext, data)

  function next(this: B, nextData: FilterData) {
    return buildFilterBuilder.call(this, isInFilterContext, nextData)
  }

  return Object.assign({}, this, {
    filter(one: any, two?: any, three?: any, four?: any) {
      return next.call(this, makeQuery('and', one, two, three, four))
    },

    andFilter(one: any, two?: any, three?: any, four?: any) {
      return next.call(this, makeQuery('and', one, two, three, four))
    },

    orFilter(one: any, two?: any, three?: any, four?: any) {
      return next.call(this, makeQuery('or', one, two, three, four))
    },

    notFilter(one: any, two?: any, three?: any, four?: any) {
      return next.call(this, makeQuery('not', one, two, three, four))
    },

    getFilter() {
      return data
    },

    hasFilter() {
      return !!(data.clauses.and.length || data.clauses.or.length || data.clauses.not.length)
    },
  })
}

export function filterBuilder<B>(this: B, isInFilterContext: boolean) {
  return buildFilterBuilder.call(this, isInFilterContext)
}
