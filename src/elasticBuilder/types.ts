import {PlainObject, Primitive} from './utils'

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
  agg(name: string, type: string, field: string): B
  agg(name: string, type: string, config: PlainObject): B
  agg(name: string, type: string, field: string, subBuilder: ESSubAggregationBuilderFn): B
  agg(name: string, type: string, field: string, config: PlainObject): B
  agg(name: string, type: string, config: PlainObject, subBuilder: ESSubAggregationBuilderFn): B
  agg(name: string, type: string, field: string, config: PlainObject, subBuilder: ESSubAggregationBuilderFn): B

  aggregation(name: string, type: string, field: string): B
  aggregation(name: string, type: string, config: PlainObject): B
  aggregation(name: string, type: string, field: string, subBuilder: ESSubAggregationBuilderFn): B
  aggregation(name: string, type: string, field: string, config: PlainObject): B
  aggregation(name: string, type: string, config: PlainObject, subBuilder: ESSubAggregationBuilderFn): B
  aggregation(name: string, type: string, field: string, config: PlainObject, subBuilder: ESSubAggregationBuilderFn): B
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
  filter(type: string, field: string): B
  filter(type: string, config: object): B
  filter(type: string, field: string, value: Primitive | Primitive[]): B
  filter(type: string, field: string, subBuilder: ESSubFilterBuilderFn): B
  filter(type: string, field: string, config: PlainObject): B
  filter(type: string, config: object, subBuilder: ESSubFilterBuilderFn): B
  filter(type: string, field: string, value: Primitive | Primitive[], subBuilder: ESSubFilterBuilderFn): B
  filter(type: string, field: string, value: Primitive | Primitive[], config: PlainObject): B
  filter(
    type: string,
    field: string,
    value: Primitive | Primitive[],
    config: PlainObject,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  andFilter(subBuilder: ESSubFilterBuilderFn): B
  andFilter(type: string, field: string): B
  andFilter(type: string, config: object): B
  andFilter(type: string, field: string, value: Primitive | Primitive[]): B
  andFilter(type: string, field: string, subBuilder: ESSubFilterBuilderFn): B
  andFilter(type: string, field: string, config: PlainObject): B
  andFilter(type: string, config: object, subBuilder: ESSubFilterBuilderFn): B
  andFilter(type: string, field: string, value: Primitive | Primitive[], subBuilder: ESSubFilterBuilderFn): B
  andFilter(type: string, field: string, value: Primitive | Primitive[], config: PlainObject): B
  andFilter(
    type: string,
    field: string,
    value: Primitive | Primitive[],
    config: PlainObject,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  orFilter(subBuilder: ESSubFilterBuilderFn): B
  orFilter(type: string, field: string): B
  orFilter(type: string, config: object): B
  orFilter(type: string, field: string, value: Primitive | Primitive[]): B
  orFilter(type: string, field: string, subBuilder: ESSubFilterBuilderFn): B
  orFilter(type: string, field: string, config: PlainObject): B
  orFilter(type: string, config: object, subBuilder: ESSubFilterBuilderFn): B
  orFilter(type: string, field: string, value: Primitive | Primitive[], subBuilder: ESSubFilterBuilderFn): B
  orFilter(type: string, field: string, value: Primitive | Primitive[], config: PlainObject): B
  orFilter(
    type: string,
    field: string,
    value: Primitive | Primitive[],
    config: PlainObject,
    subBuilder: ESSubFilterBuilderFn,
  ): B

  notFilter(subBuilder: ESSubFilterBuilderFn): B
  notFilter(type: string, field: string): B
  notFilter(type: string, config: object): B
  notFilter(type: string, field: string, value: Primitive | Primitive[]): B
  notFilter(type: string, field: string, subBuilder: ESSubFilterBuilderFn): B
  notFilter(type: string, field: string, config: PlainObject): B
  notFilter(type: string, config: object, subBuilder: ESSubFilterBuilderFn): B
  notFilter(type: string, field: string, value: Primitive | Primitive[], subBuilder: ESSubFilterBuilderFn): B
  notFilter(type: string, field: string, value: Primitive | Primitive[], config: PlainObject): B
  notFilter(
    type: string,
    field: string,
    value: Primitive | Primitive[],
    config: PlainObject,
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
  query(type: string, field: string): B
  query(type: string, config: object): B
  query(type: string, field: string, value: Primitive | Primitive[]): B
  query(type: string, field: string, subBuilder: ESSubQueryBuilderFn): B
  query(type: string, field: string, config: PlainObject): B
  query(type: string, config: object, subBuilder: ESSubQueryBuilderFn): B
  query(type: string, field: string, value: Primitive | Primitive[], subBuilder: ESSubQueryBuilderFn): B
  query(type: string, field: string, value: Primitive | Primitive[], config: PlainObject): B
  query(
    type: string,
    field: string,
    value: Primitive | Primitive[],
    config: PlainObject,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  andQuery(subBuilder: ESSubQueryBuilderFn): B
  andQuery(type: string, field: string): B
  andQuery(type: string, config: object): B
  andQuery(type: string, field: string, value: Primitive | Primitive[]): B
  andQuery(type: string, field: string, subBuilder: ESSubQueryBuilderFn): B
  andQuery(type: string, field: string, config: PlainObject): B
  andQuery(type: string, config: object, subBuilder: ESSubQueryBuilderFn): B
  andQuery(type: string, field: string, value: Primitive | Primitive[], subBuilder: ESSubQueryBuilderFn): B
  andQuery(type: string, field: string, value: Primitive | Primitive[], config: PlainObject): B
  andQuery(
    type: string,
    field: string,
    value: Primitive | Primitive[],
    config: PlainObject,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  orQuery(subBuilder: ESSubQueryBuilderFn): B
  orQuery(type: string, field: string): B
  orQuery(type: string, config: object): B
  orQuery(type: string, field: string, value: Primitive | Primitive[]): B
  orQuery(type: string, field: string, subBuilder: ESSubQueryBuilderFn): B
  orQuery(type: string, field: string, config: PlainObject): B
  orQuery(type: string, config: object, subBuilder: ESSubQueryBuilderFn): B
  orQuery(type: string, field: string, value: Primitive | Primitive[], subBuilder: ESSubQueryBuilderFn): B
  orQuery(type: string, field: string, value: Primitive | Primitive[], config: PlainObject): B
  orQuery(
    type: string,
    field: string,
    value: Primitive | Primitive[],
    config: PlainObject,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  notQuery(subBuilder: ESSubQueryBuilderFn): B
  notQuery(type: string, field: string): B
  notQuery(type: string, config: object): B
  notQuery(type: string, field: string, value: Primitive | Primitive[]): B
  notQuery(type: string, field: string, subBuilder: ESSubQueryBuilderFn): B
  notQuery(type: string, field: string, config: PlainObject): B
  notQuery(type: string, config: object, subBuilder: ESSubQueryBuilderFn): B
  notQuery(type: string, field: string, value: Primitive | Primitive[], subBuilder: ESSubQueryBuilderFn): B
  notQuery(type: string, field: string, value: Primitive | Primitive[], config: PlainObject): B
  notQuery(
    type: string,
    field: string,
    value: Primitive | Primitive[],
    config: PlainObject,
    subBuilder: ESSubQueryBuilderFn,
  ): B

  queryMinimumShouldMatch(param: string | number): B
}

export type FieldSortConfig = {[field: string]: 'asc' | 'desc' | object}

/** Represents all the different argument variations to the sort method */
export type SortArgs = [string] | [(string | FieldSortConfig)[]] | [string, string] | [string, PlainObject]

export interface ESBuilder extends ESBaseBuilder, ESAggregationBuilder, ESFilterBuilder, ESQueryBuilder {
  from(quantity: number): ESBuilder
  rawOption(key: string, value: unknown): ESBuilder
  size(quantity: number): ESBuilder
  sort(field: string): ESBuilder
  sort(field: string, direction: string): ESBuilder
  sort(field: string, body: object): ESBuilder
  sort(fields: (string | FieldSortConfig)[]): ESBuilder
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
