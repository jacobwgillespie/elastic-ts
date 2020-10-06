import {AggregationType, AllAggregations} from '../types/aggregations'
import {SortType} from '../types/common'
import {AllFieldQueryConfigs, AllQueries, FieldQueryType, QueryType} from '../types/queries'
import {Optional, PlainObject, Primitive} from './utils'

/** Represents a function that returns a builder of arbitrary type */
export type BuilderFn = () => ESBaseBuilder

/** Takes a tuple type and replaces ES builder functions with `BuilderFn` */
export type WithBuilderFns<T> = {
  [K in keyof T]: Extract<T[K], ESSubAggregationBuilderFn | ESSubFilterBuilderFn | ESSubQueryBuilderFn> extends never
    ? T[K]
    : Exclude<T[K], ESSubAggregationBuilderFn | ESSubFilterBuilderFn | ESSubQueryBuilderFn> | BuilderFn
}

export interface QueryData {
  aggregations: WithBuilderFns<AggregationArgs>[]
  filter: {
    and: WithBuilderFns<FilterArgs>[]
    or: WithBuilderFns<FilterArgs>[]
    not: WithBuilderFns<FilterArgs>[]
    minimumShouldMatch?: number | string
  }
  from?: number
  inChildContext: boolean
  parent?: 'filter' | 'query'
  size?: number
  sort: SortArgs[]
  query: {
    and: WithBuilderFns<QueryArgs>[]
    or: WithBuilderFns<QueryArgs>[]
    not: WithBuilderFns<QueryArgs>[]
    minimumShouldMatch?: number | string
  }
  rawOption: {
    [key: string]: unknown
  }
}

export interface BuiltQuery {
  aggs?: {
    [name: string]: object
  }
  filter?: object
  from?: number
  size?: number
  sort?: object[]
  query?: object
}

/** Represents all the different argument variations to the aggregation methods */
export type AggregationArgs =
  | [string, string, string | PlainObject]
  | [string, string, string, ESSubAggregationBuilderFn]
  | [string, string, string, PlainObject]
  | [string, string, PlainObject, ESSubAggregationBuilderFn]
  | [string, string, string, PlainObject, ESSubAggregationBuilderFn]

export interface ESAggregationBuilder<B = ESBuilder> {
  agg<K extends AggregationType>(name: string, type: K, field: string): B
  agg<K extends AggregationType>(name: string, type: K, config: AllAggregations[K]): B
  agg<K extends AggregationType>(name: string, type: K, field: string, subBuilder: ESSubAggregationBuilderFn): B
  agg<K extends AggregationType>(name: string, type: K, field: string, config: Omit<AllAggregations[K], 'field'>): B
  agg<K extends AggregationType>(
    name: string,
    type: K,
    config: AllAggregations[K],
    subBuilder: ESSubAggregationBuilderFn,
  ): B
  agg<K extends AggregationType>(
    name: string,
    type: K,
    field: string,
    config: Omit<AllAggregations[K], 'field'>,
    subBuilder: ESSubAggregationBuilderFn,
  ): B

  aggregation<K extends AggregationType>(name: string, type: K, field: string): B
  aggregation<K extends AggregationType>(name: string, type: K, config: AllAggregations[K]): B
  aggregation<K extends AggregationType>(name: string, type: K, field: string, subBuilder: ESSubAggregationBuilderFn): B
  aggregation<K extends AggregationType>(
    name: string,
    type: K,
    field: string,
    config: Omit<AllAggregations[K], 'field'>,
  ): B
  aggregation<K extends AggregationType>(
    name: string,
    type: K,
    config: AllAggregations[K],
    subBuilder: ESSubAggregationBuilderFn,
  ): B
  aggregation<K extends AggregationType>(
    name: string,
    type: K,
    field: string,
    config: Omit<AllAggregations[K], 'field'>,
    subBuilder: ESSubAggregationBuilderFn,
  ): B
}

export interface ESBaseBuilder {
  build(): BuiltQuery
}

/** Represents all the different argument variations to the filter methods */
export type FilterArgs =
  | [ESSubFilterBuilderFn]
  | [string, string | PlainObject]
  | [string, string, Primitive | Primitive[] | PlainObject | ESSubFilterBuilderFn]
  | [string, PlainObject, ESSubFilterBuilderFn]
  | [string, string, Primitive | Primitive[], PlainObject | ESSubFilterBuilderFn]
  | [string, string, Primitive | Primitive[], PlainObject, ESSubFilterBuilderFn]

export interface ESFilterBuilder<B = ESBuilder> {
  filter(subBuilder: ESSubFilterBuilderFn): B
  filter<K extends QueryType>(type: K, field: string): B
  filter<K extends QueryType>(type: K, config: AllQueries[K]): B
  filter<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[]): B
  filter<K extends QueryType>(type: K, field: string, subBuilder: ESSubFilterBuilderFn): B
  filter<K extends QueryType>(type: K, field: string, config: Omit<AllQueries[K], 'field'>): B
  filter<K extends QueryType>(
    type: K,
    config: Optional<AllQueries[K], keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B
  filter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubFilterBuilderFn,
  ): B
  filter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[K], 'field'>,
  ): B
  filter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[K], 'field'>, keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  andFilter(subBuilder: ESSubFilterBuilderFn): B
  andFilter<K extends QueryType>(type: K, field: string): B
  andFilter<K extends QueryType>(type: K, config: AllQueries[K]): B
  andFilter<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[]): B
  andFilter<K extends QueryType>(type: K, field: string, subBuilder: ESSubFilterBuilderFn): B
  andFilter<K extends QueryType>(type: K, field: string, config: Omit<AllQueries[K], 'field'>): B
  andFilter<K extends QueryType>(
    type: K,
    config: Optional<AllQueries[K], keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B
  andFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubFilterBuilderFn,
  ): B
  andFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[K], 'field'>,
  ): B
  andFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[K], 'field'>, keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  orFilter(subBuilder: ESSubFilterBuilderFn): B
  orFilter<K extends QueryType>(type: K, field: string): B
  orFilter<K extends QueryType>(type: K, config: AllQueries[K]): B
  orFilter<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[]): B
  orFilter<K extends QueryType>(type: K, field: string, subBuilder: ESSubFilterBuilderFn): B
  orFilter<K extends QueryType>(type: K, field: string, config: Omit<AllQueries[K], 'field'>): B
  orFilter<K extends QueryType>(
    type: K,
    config: Optional<AllQueries[K], keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B
  orFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubFilterBuilderFn,
  ): B
  orFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[K], 'field'>,
  ): B
  orFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[K], 'field'>, keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  notFilter(subBuilder: ESSubFilterBuilderFn): B
  notFilter<K extends QueryType>(type: K, field: string): B
  notFilter<K extends QueryType>(type: K, config: AllQueries[K]): B
  notFilter<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[]): B
  notFilter<K extends QueryType>(type: K, field: string, subBuilder: ESSubFilterBuilderFn): B
  notFilter<K extends QueryType>(type: K, field: string, config: Omit<AllQueries[K], 'field'>): B
  notFilter<K extends QueryType>(
    type: K,
    config: Optional<AllQueries[K], keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B
  notFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubFilterBuilderFn,
  ): B
  notFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[K], 'field'>,
  ): B
  notFilter<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[K], 'field'>, keyof BuiltQuery>,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  filterMinimumShouldMatch(param: string | number): B
}

/** Represents all the different argument variations to the query methods */
export type QueryArgs =
  | [ESSubQueryBuilderFn]
  | [string, string | PlainObject]
  | [string, string, Primitive | Primitive[] | PlainObject | ESSubQueryBuilderFn]
  | [string, PlainObject, ESSubQueryBuilderFn]
  | [string, string, Primitive | Primitive[], PlainObject | ESSubFilterBuilderFn]
  | [string, string, Primitive | Primitive[], PlainObject, ESSubQueryBuilderFn]

export interface ESQueryBuilder<B = ESBuilder> {
  query(subBuilder: ESSubQueryBuilderFn): B
  query<K extends QueryType>(type: K, field: string): B
  query<K extends QueryType>(type: K, config: AllQueries[K]): B
  query<K extends FieldQueryType>(type: K, field: string, config: AllFieldQueryConfigs[K]): B
  query<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[]): B
  query<K extends QueryType>(type: K, field: string, subBuilder: ESSubQueryBuilderFn): B
  query<K extends QueryType>(
    type: K,
    config: Optional<AllQueries[K], keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B
  query<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[], subBuilder: ESSubQueryBuilderFn): B
  query<K extends QueryType, F extends string>(
    type: K,
    field: F,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[K], F>,
  ): B
  query<K extends QueryType, F extends string>(
    type: K,
    field: F,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[K], F>, keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  andQuery(subBuilder: ESSubQueryBuilderFn): B
  andQuery<K extends QueryType>(type: K, field: string): B
  andQuery<K extends QueryType>(type: K, config: AllQueries[K]): B
  andQuery<K extends FieldQueryType>(type: K, field: string, config: AllFieldQueryConfigs[K]): B
  andQuery<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[]): B
  andQuery<K extends QueryType>(type: K, field: string, subBuilder: ESSubQueryBuilderFn): B
  andQuery<K extends QueryType>(
    type: K,
    config: Optional<AllQueries[K], keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B
  andQuery<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubQueryBuilderFn,
  ): B
  andQuery<K extends QueryType, F extends string>(
    type: K,
    field: F,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[K], F>,
  ): B
  andQuery<K extends QueryType, F extends string>(
    type: K,
    field: F,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[K], F>, keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  orQuery(subBuilder: ESSubQueryBuilderFn): B
  orQuery<K extends QueryType>(type: K, field: string): B
  orQuery<K extends QueryType>(type: K, config: AllQueries[K]): B
  orQuery<K extends FieldQueryType>(type: K, field: string, config: AllFieldQueryConfigs[K]): B
  orQuery<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[]): B
  orQuery<K extends QueryType>(type: K, field: string, subBuilder: ESSubQueryBuilderFn): B
  orQuery<K extends QueryType>(
    type: K,
    config: Optional<AllQueries[K], keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B
  orQuery<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubQueryBuilderFn,
  ): B
  orQuery<K extends QueryType, F extends string>(
    type: K,
    field: F,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[K], F>,
  ): B
  orQuery<K extends QueryType, F extends string>(
    type: K,
    field: F,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[K], F>, keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  notQuery(subBuilder: ESSubQueryBuilderFn): B
  notQuery<K extends QueryType>(type: K, field: string): B
  notQuery<K extends QueryType>(type: K, config: AllQueries[K]): B
  notQuery<K extends FieldQueryType>(type: K, field: string, config: AllFieldQueryConfigs[K]): B
  notQuery<K extends QueryType>(type: K, field: string, value: Primitive | Primitive[]): B
  notQuery<K extends QueryType>(type: K, field: string, subBuilder: ESSubQueryBuilderFn): B
  notQuery<K extends QueryType>(
    type: K,
    config: Optional<AllQueries[K], keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B
  notQuery<K extends QueryType>(
    type: K,
    field: string,
    value: Primitive | Primitive[],
    subBuilder: ESSubQueryBuilderFn,
  ): B
  notQuery<K extends QueryType, F extends string>(
    type: K,
    field: F,
    value: Primitive | Primitive[],
    config: Omit<AllQueries[K], F>,
  ): B
  notQuery<K extends QueryType, F extends string>(
    type: K,
    field: F,
    value: Primitive | Primitive[],
    config: Optional<Omit<AllQueries[K], F>, keyof BuiltQuery>,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  queryMinimumShouldMatch(param: string | number): B
}

/** Represents all the different argument variations to the sort method */
export type SortArgs = [string] | [SortType[]] | [string, string] | [string, PlainObject]

export interface ESBuilder extends ESBaseBuilder, ESAggregationBuilder, ESFilterBuilder, ESQueryBuilder {
  from(quantity: number): ESBuilder
  rawOption(key: string, value: unknown): ESBuilder
  size(quantity: number): ESBuilder
  sort(field: string): ESBuilder
  sort(field: string, direction: string): ESBuilder
  sort(field: string, body: object): ESBuilder
  sort(fields: SortType[]): ESBuilder
}

export interface ESSubAggregationBuilder
  extends ESBaseBuilder,
    ESAggregationBuilder<ESSubAggregationBuilder>,
    ESFilterBuilder<ESSubAggregationBuilder> {}
export type ESSubAggregationBuilderFn = (builder: ESSubAggregationBuilder) => ESSubAggregationBuilder

export interface ESSubFilterBuilder
  extends ESBaseBuilder,
    ESFilterBuilder<ESSubFilterBuilder>,
    ESQueryBuilder<ESSubFilterBuilder> {}
export type ESSubFilterBuilderFn = (builder: ESSubFilterBuilder) => ESSubFilterBuilder

export interface ESSubQueryBuilder
  extends ESBaseBuilder,
    ESFilterBuilder<ESSubQueryBuilder>,
    ESQueryBuilder<ESSubQueryBuilder> {}
export type ESSubQueryBuilderFn = (builder: ESSubQueryBuilder) => ESSubQueryBuilder
