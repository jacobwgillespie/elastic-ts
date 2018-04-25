import {FilterBuilder, FilterData} from './types'
import {pushQuery} from './utils'

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
