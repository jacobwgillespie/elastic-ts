import is from '@sindresorhus/is'

import {Query, AllQueries, AllFieldQueryConfigs, FieldQueryConfig} from '../types/queries'
import {FilterData} from './utils'

export interface FilterBuilder<B> {
  filter<K extends keyof AllFieldQueryConfigs>(type: K, field: string, config: AllFieldQueryConfigs[K]): B
  filter<K extends keyof AllQueries>(type: K, config: AllQueries[K]): B
  filter(filter: Query): B

  andFilter<K extends keyof AllFieldQueryConfigs>(type: K, field: string, config: AllFieldQueryConfigs[K]): B
  andFilter<K extends keyof AllQueries>(type: K, config: AllQueries[K]): B
  andFilter(filter: Query): B

  orFilter<K extends keyof AllFieldQueryConfigs>(type: K, field: string, config: AllFieldQueryConfigs[K]): B
  orFilter<K extends keyof AllQueries>(type: K, config: AllQueries[K]): B
  orFilter(filter: Query): B

  notFilter<K extends keyof AllFieldQueryConfigs>(type: K, field: string, config: AllFieldQueryConfigs[K]): B
  notFilter<K extends keyof AllQueries>(type: K, config: AllQueries[K]): B
  notFilter(filter: Query): B

  getFilter(): Query
  hasFilter(): boolean
}

const isKeyofFieldQuery = (v: any): v is keyof AllFieldQueryConfigs => is.string(v)
const isKeyofQuery = (v: any): v is keyof AllQueries => is.string(v)
const isFieldConfig = <T extends keyof AllFieldQueryConfigs>(_v: any): _v is AllFieldQueryConfigs[T] => true

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
