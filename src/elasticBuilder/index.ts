import is from '@sindresorhus/is'
import {buildBody} from './buildBody'
import {AggregationArgs, ESBuilder, FilterArgs, QueryArgs, QueryData, SortArgs, WithBuilderFns} from './types'

/** Returns a new Elasticsearch query builder instance */
export function esBuilder() {
  return builderBuilder()
}

export * from './types'

function defaultData(): QueryData {
  return {
    aggregations: [],
    filter: {
      and: [],
      or: [],
      not: [],
      minimumShouldMatch: undefined,
    },
    from: undefined,
    inChildContext: false,
    size: undefined,
    sort: [],
    query: {
      and: [],
      or: [],
      not: [],
      minimumShouldMatch: undefined,
    },
    rawOption: {},
  }
}

function prepareSubBuilderArgs<T extends unknown[], R>(args: T, replacement: () => R): WithBuilderFns<T> {
  args.forEach((arg, i) => {
    if (is.function_(arg)) {
      args[i] = () => arg(replacement())
    }
  })

  return args as WithBuilderFns<T>
}

/** Returns the entire ES query builder */
function builderBuilder(data: QueryData = defaultData()): ESBuilder {
  return {
    from(quantity: number) {
      return builderBuilder({...data, from: quantity})
    },
    size(quantity: number) {
      return builderBuilder({...data, size: quantity})
    },
    rawOption(key: string, value: unknown) {
      return builderBuilder({...data, rawOption: {...data.rawOption, [key]: value}})
    },
    sort(...args: SortArgs) {
      return builderBuilder({...data, sort: [...data.sort, args]})
    },
    ...aggregationBuilder(data),
    ...baseBuilder(data),
    ...filterBuilder(data),
    ...queryBuilder(data),
  }
}

/** Returns builder functions for aggregations */
function aggregationBuilder(data: QueryData) {
  const {aggregations} = data

  function bindSubBuilder(args: AggregationArgs) {
    return prepareSubBuilderArgs(args, () => {
      const next: QueryData = {...defaultData(), inChildContext: true}
      return {...aggregationBuilder(next), ...baseBuilder(next), ...filterBuilder(next), ...queryBuilder(next)}
    })
  }

  const aggregation = (...args: AggregationArgs) => {
    return builderBuilder({
      ...data,
      aggregations: [...aggregations, bindSubBuilder(args)],
    })
  }

  return {
    agg: aggregation,
    aggregation,
  }
}

/** Returns base builder function */
function baseBuilder(data: QueryData) {
  return {
    build() {
      return buildBody(data)
    },
  }
}

/** Returns builder functions for filters */
function filterBuilder(data: QueryData) {
  const {filter} = data

  function bindSubBuilder(args: FilterArgs) {
    return prepareSubBuilderArgs(args, () => {
      const next: QueryData = {parent: 'filter', ...defaultData(), inChildContext: true}
      return {...baseBuilder(next), ...filterBuilder(next), ...(data.parent === 'query' ? queryBuilder(next) : {})}
    })
  }

  return {
    filter(...args: FilterArgs) {
      return builderBuilder({
        ...data,
        filter: {...filter, and: [...filter.and, bindSubBuilder(args)]},
      })
    },
    andFilter(...args: FilterArgs) {
      return builderBuilder({
        ...data,
        filter: {...filter, and: [...filter.and, bindSubBuilder(args)]},
      })
    },
    orFilter(...args: FilterArgs) {
      return builderBuilder({
        ...data,
        filter: {...filter, or: [...filter.or, bindSubBuilder(args)]},
      })
    },
    notFilter(...args: FilterArgs) {
      return builderBuilder({
        ...data,
        filter: {...filter, not: [...filter.not, bindSubBuilder(args)]},
      })
    },
    filterMinimumShouldMatch(minimumShouldMatch: number | string) {
      return builderBuilder({...data, filter: {...filter, minimumShouldMatch}})
    },
  }
}

/** Returns builder functions for queries */
function queryBuilder(data: QueryData) {
  const {query} = data

  function bindSubBuilder(args: QueryArgs) {
    return prepareSubBuilderArgs(args, () => {
      const next: QueryData = {parent: 'query', ...defaultData(), inChildContext: true}
      return {...baseBuilder(next), ...filterBuilder(next), ...queryBuilder(next)}
    })
  }

  return {
    query(...args: QueryArgs) {
      return builderBuilder({...data, query: {...query, and: [...query.and, bindSubBuilder(args)]}})
    },
    andQuery(...args: QueryArgs) {
      return builderBuilder({...data, query: {...query, and: [...query.and, bindSubBuilder(args)]}})
    },
    orQuery(...args: QueryArgs) {
      return builderBuilder({...data, query: {...query, or: [...query.or, bindSubBuilder(args)]}})
    },
    notQuery(...args: QueryArgs) {
      return builderBuilder({...data, query: {...query, not: [...query.not, bindSubBuilder(args)]}})
    },
    queryMinimumShouldMatch(minimumShouldMatch: number | string) {
      return builderBuilder({...data, query: {...query, minimumShouldMatch}})
    },
  }
}
