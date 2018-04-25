import is from '@sindresorhus/is'

import {Query, AllQueries, AllFieldQueryConfigs, FieldQueryConfig} from '../types/queries'
import {FilterData, isKeyofFieldQuery, isKeyofQuery, isFieldConfig} from './utils'
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

  getQuery(): Query
  hasQuery(): boolean
}

export function buildQueryBuilder<B>(this: B, initialData?: FilterData): QueryBuilder<B> {
  const data: FilterData = initialData || {
    filters: {
      and: [],
      or: [],
      not: [],
    },
  }

  function pushImmutable(this: B, bool: keyof typeof data['filters'], query: Query) {
    return buildQueryBuilder.call(this, {
      ...data,
      filters: {
        ...data.filters,
        [bool]: [...data.filters[bool], query],
      },
    })
  }

  function addQuery(
    this: B,
    bool: keyof typeof data['filters'],
    typeOrQuery: any,
    fieldOrConfig?: any,
    config?: any,
  ): B {
    if (isKeyofFieldQuery(typeOrQuery) && is.string(fieldOrConfig)) {
      if (isFieldConfig(config)) {
        // TODO: do we need to cast through any?
        const fieldQueryConfig = ({
          [fieldOrConfig]: config,
        } as any) as FieldQueryConfig

        // TODO: do we need to cast through any?
        const query = ({
          [typeOrQuery]: fieldQueryConfig,
        } as any) as Query

        return pushImmutable.call(this, bool, query)
      }
    } else if (isKeyofQuery(typeOrQuery) && is.plainObject(fieldOrConfig)) {
      const query = {
        [typeOrQuery]: fieldOrConfig,
      } as Query

      return pushImmutable.call(this, bool, query)
    }

    throw new TypeError('invalid arguments')
  }

  return Object.assign({}, this, {
    query(typeOrQuery: any, fieldOrConfig?: any, config?: any) {
      return addQuery.call(this, 'and', typeOrQuery, fieldOrConfig, config)
    },

    andQuery(typeOrQuery: any, fieldOrConfig?: any, config?: any) {
      return addQuery.call(this, 'and', typeOrQuery, fieldOrConfig, config)
    },

    orQuery(typeOrQuery: any, fieldOrConfig?: any, config?: any) {
      return addQuery.call(this, 'or', typeOrQuery, fieldOrConfig, config)
    },

    notQuery(typeOrQuery: any, fieldOrConfig?: any, config?: any) {
      return addQuery.call(this, 'not', typeOrQuery, fieldOrConfig, config)
    },

    getQuery() {
      return {bool: data} as Query
    },

    hasQuery() {
      return false
    },
  })
}

export function queryBuilder<B>(this: B) {
  return buildQueryBuilder.apply(this)
}
