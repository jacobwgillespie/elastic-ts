import {Query, AllQueries, AllFieldQueryConfigs} from '../types/queries'
import {FilterData, pushQuery} from './utils'
import {FilterBuilder} from './filterBuilder'

export interface QuerySubFilterBuilder
  extends FilterBuilder<QuerySubFilterBuilder>,
    QueryBuilder<QuerySubFilterBuilder> {}

export type QuerySubFilterFn = (sub: QuerySubFilterBuilder) => QuerySubFilterBuilder

export interface QueryBuilder<B> {
  query<K extends keyof AllFieldQueryConfigs>(
    type: K,
    field: string,
    config: AllFieldQueryConfigs[K],
    subfilters?: QuerySubFilterFn,
  ): B
  query<K extends keyof AllQueries>(type: K, config: AllQueries[K], subfilters?: QuerySubFilterFn): B
  query(query: Query): B

  andQuery<K extends keyof AllFieldQueryConfigs>(
    type: K,
    field: string,
    config: AllFieldQueryConfigs[K],
    subfilters?: QuerySubFilterFn,
  ): B
  andQuery<K extends keyof AllQueries>(type: K, config: AllQueries[K], subfilters?: QuerySubFilterFn): B
  andQuery(query: Query): B

  orQuery<K extends keyof AllFieldQueryConfigs>(
    type: K,
    field: string,
    config: AllFieldQueryConfigs[K],
    subfilters?: QuerySubFilterFn,
  ): B
  orQuery<K extends keyof AllQueries>(type: K, config: AllQueries[K], subfilters?: QuerySubFilterFn): B
  orQuery(query: Query): B

  notQuery<K extends keyof AllFieldQueryConfigs>(
    type: K,
    field: string,
    config: AllFieldQueryConfigs[K],
    subfilters?: QuerySubFilterFn,
  ): B
  notQuery<K extends keyof AllQueries>(type: K, config: AllQueries[K], subfilters?: QuerySubFilterFn): B
  notQuery(query: Query): B

  getQuery(): FilterData
  hasQuery(): boolean
}

export function buildQueryBuilder<B>(this: B, isInFilterContext: boolean, initialData?: FilterData): QueryBuilder<B> {
  const data: FilterData = initialData || {
    clauses: {
      and: [],
      or: [],
      not: [],
    },
  }

  const makeQuery = pushQuery.bind(undefined, isInFilterContext, data)

  function next(this: B, nextData: FilterData) {
    return buildQueryBuilder.call(this, isInFilterContext, nextData)
  }

  return Object.assign({}, this, {
    query(one: any, two?: any, three?: any, four?: any) {
      return next.call(this, makeQuery('and', one, two, three, four))
    },

    andQuery(one: any, two?: any, three?: any, four?: any) {
      return next.call(this, makeQuery('and', one, two, three, four))
    },

    orQuery(one: any, two?: any, three?: any, four?: any) {
      return next.call(this, makeQuery('or', one, two, three, four))
    },

    notQuery(one: any, two?: any, three?: any, four?: any) {
      return next.call(this, makeQuery('not', one, two, three, four))
    },

    getQuery() {
      return data
    },

    hasQuery() {
      return !!(data.clauses.and.length || data.clauses.or.length || data.clauses.not.length)
    },
  })
}

export function queryBuilder<B>(this: B, isInFilterContext: boolean) {
  return buildQueryBuilder.call(this, isInFilterContext)
}
