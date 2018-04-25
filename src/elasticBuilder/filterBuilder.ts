import is from '@sindresorhus/is'

import {Query, AllQueries, AllFieldQueryConfigs, FieldQueryConfig} from '../types/queries'
import {FilterData, isKeyofFieldQuery, isKeyofQuery, isFieldConfig} from './utils'
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

  getFilter(): Query
  hasFilter(): boolean
}

export function buildFilterBuilder<B>(this: B, initialData?: FilterData): FilterBuilder<B> {
  const data: FilterData = initialData || {
    filters: {
      and: [],
      or: [],
      not: [],
    },
  }

  function pushImmutable(this: B, bool: keyof typeof data['filters'], filter: Query) {
    return buildFilterBuilder.call(this, {
      ...data,
      filters: {
        ...data.filters,
        [bool]: [...data.filters[bool], filter],
      },
    })
  }

  function addFilter(
    this: B,
    bool: keyof typeof data['filters'],
    typeOrFilter: any,
    fieldOrConfig?: any,
    config?: any,
  ): B {
    if (isKeyofFieldQuery(typeOrFilter) && is.string(fieldOrConfig)) {
      if (isFieldConfig(config)) {
        // TODO: do we need to cast through any?
        const fieldQueryConfig = ({
          [fieldOrConfig]: config,
        } as any) as FieldQueryConfig

        // TODO: do we need to cast through any?
        const filter = ({
          [typeOrFilter]: fieldQueryConfig,
        } as any) as Query

        return pushImmutable.call(this, bool, filter)
      }
    } else if (isKeyofQuery(typeOrFilter) && is.plainObject(fieldOrConfig)) {
      const filter = {
        [typeOrFilter]: fieldOrConfig,
      } as Query

      return pushImmutable.call(this, bool, filter)
    }

    throw new TypeError('invalid arguments')
  }

  return Object.assign({}, this, {
    filter(typeOrFilter: any, fieldOrConfig?: any, config?: any) {
      return addFilter.call(this, 'and', typeOrFilter, fieldOrConfig, config)
    },

    andFilter(typeOrFilter: any, fieldOrConfig?: any, config?: any) {
      return addFilter.call(this, 'and', typeOrFilter, fieldOrConfig, config)
    },

    orFilter(typeOrFilter: any, fieldOrConfig?: any, config?: any) {
      return addFilter.call(this, 'or', typeOrFilter, fieldOrConfig, config)
    },

    notFilter(typeOrFilter: any, fieldOrConfig?: any, config?: any) {
      return addFilter.call(this, 'not', typeOrFilter, fieldOrConfig, config)
    },

    getFilter() {
      return {bool: data.filters} as Query
    },

    hasFilter() {
      return false
    },
  })
}

export function filterBuilder<B>(this: B) {
  return buildFilterBuilder.apply(this)
}
