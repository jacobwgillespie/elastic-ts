import is from '@sindresorhus/is'
import {buildAggregation} from './buildAggregation'
import {buildClause} from './buildClause'
import {buildSort, deduplicateSort} from './buildSort'
import {BuiltQuery, FilterArgs, QueryArgs, QueryData, WithBuilderFns} from './types'
import {flatMap} from './utils'

interface BoolData {
  and: object[]
  or: object[]
  not: object[]
  filter?: object
  minimumShouldMatch?: number | string
}

/**
 * simplifyClauses transforms an array into a single value if length === 1,
 * otherwise it returns the original array.
 */
function simplifyClauses<T>(items: T[]): T | T[] {
  if (items.length === 1) {
    return items[0]
  }
  return items
}

function buildBool(data: BoolData): object | undefined {
  if (data.or.length === 0 && data.not.length === 0 && !data.filter) {
    if (data.and.length === 1) {
      return data.and[0]
    } else if (data.and.length === 0) {
      return undefined
    }
  }

  const totalCount = data.and.length + data.or.length + data.not.length

  return {
    bool: {
      ...(data.and.length ? {must: simplifyClauses(data.and)} : {}),
      ...(data.or.length ? {should: simplifyClauses(data.or)} : {}),
      ...(data.not.length ? {must_not: simplifyClauses(data.not)} : {}),
      ...(data.filter ? {filter: data.filter} : {}),
      ...(data.minimumShouldMatch != null && totalCount > 1 ? {minimum_should_match: data.minimumShouldMatch} : {}),
    },
  }
}

export function buildBody(data: QueryData) {
  const built: BuiltQuery = {}
  const {aggregations, filter, query} = data

  function buildClauses(clauses: WithBuilderFns<FilterArgs | QueryArgs>[]) {
    return clauses.map(args => buildClause(data, args)).filter(c => c)
  }

  const builtFilter = buildBool({
    and: buildClauses(filter.and),
    or: buildClauses(filter.or),
    not: buildClauses(filter.not),
    minimumShouldMatch: filter.minimumShouldMatch,
  })

  if (data.inChildContext) {
    if (builtFilter) {
      built.filter = builtFilter
    }
  }

  const builtQuery = buildBool({
    and: buildClauses(query.and),
    or: buildClauses(query.or),
    not: buildClauses(query.not),
    filter: data.inChildContext ? undefined : builtFilter,
    minimumShouldMatch: query.minimumShouldMatch,
  })

  if (builtQuery) {
    built.query = builtQuery
  }

  if (data.from != null) {
    built.from = data.from
  }

  if (data.size != null) {
    built.size = data.size
  }

  if (data.sort.length) {
    built.sort = deduplicateSort(flatMap(data.sort, args => buildSort(args)))
  }

  if (is.nonEmptyObject(aggregations)) {
    built.aggs = aggregations.reduce(
      (acc, args) => ({
        ...acc,
        ...buildAggregation(args),
      }),
      {},
    )
  }

  return {...built, ...data.rawOption}
}
