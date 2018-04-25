import {FilterData, QueryBuilder} from './types'
import {pushQuery} from './utils'

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
