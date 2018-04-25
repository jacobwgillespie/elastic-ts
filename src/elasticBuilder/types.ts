import {SearchBody} from '../types'
import {Aggregations, AllAggregations, Aggregation} from '../types/aggregations'
import {SortOrder, FieldSortOptions, Sort} from '../types/common'
import {Query, AllQueries, AllFieldQueryConfigs} from '../types/queries'

export interface FilterDataClause {
  query: Query
  nested?: {
    filter?: FilterData
    query?: FilterData
  }
}

export interface FilterData {
  clauses: {
    and: FilterDataClause[]
    or: FilterDataClause[]
    not: FilterDataClause[]
  }
  minimum_should_match?: number
}

export interface SubAggregationBuilder
  extends AggregationBuilder<SubAggregationBuilder>,
    FilterBuilder<SubAggregationBuilder> {}

export type SubAggregationFn = (sub: SubAggregationBuilder) => SubAggregationBuilder

export interface AggregationBuilder<B> {
  agg<K extends keyof AllAggregations>(
    name: string,
    type: K,
    config: AllAggregations[K],
    subaggregations?: SubAggregationFn,
  ): B
  agg(name: string, aggregation: Aggregation, subaggregations?: SubAggregationFn): B
  agg(aggregation: Aggregations): B

  aggregation<K extends keyof AllAggregations>(
    name: string,
    type: K,
    config: AllAggregations[K],
    subaggregations?: SubAggregationFn,
  ): B
  aggregation(name: string, aggregation: Aggregation, subaggregations?: SubAggregationFn): B
  aggregation(aggregation: Aggregations): B

  getAggregations(): Aggregations

  hasAggregations(): boolean
}

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

  getFilter(): FilterData
  hasFilter(): boolean
}

export interface OptionsBuilder<B> {
  sort(field: string): B
  sort(field: string, order: SortOrder): B
  sort(field: string, config: FieldSortOptions): B
  sort(config: Sort): B

  from(quantity: number | undefined): B

  size(quantity: number | undefined): B

  rawOption<K extends keyof SearchBody>(k: K, v: SearchBody[K]): B

  getOptions(): SearchBody

  hasOptions(): boolean
}

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
