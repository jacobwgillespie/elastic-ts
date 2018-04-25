import {SearchBody} from '../types'

import {AggregationBuilder, aggregationBuilder, SubAggregationBuilder, SubAggregationFn} from './aggregationBuilder'
import {FilterBuilder, filterBuilder, FilterSubFilterBuilder, FilterSubFilterFn} from './filterBuilder'
import {OptionsBuilder, optionsBuilder} from './optionsBuilder'
import {QueryBuilder, queryBuilder, QuerySubFilterBuilder, QuerySubFilterFn} from './queryBuilder'

export interface ElasticBuilder
  extends AggregationBuilder<ElasticBuilder>,
    FilterBuilder<ElasticBuilder>,
    OptionsBuilder<ElasticBuilder>,
    QueryBuilder<ElasticBuilder> {
  build(): SearchBody
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v))
}

function buildElasticBuilder(): ElasticBuilder {
  return {
    build() {
      return clone({
        query: this.getQuery(),
        aggs: this.getAggregations(),
        ...this.getOptions(),
      })
    },

    ...aggregationBuilder.call({}),
    ...filterBuilder.call({}),
    ...optionsBuilder.call({}),
    ...queryBuilder.call({}),
  }
}

export function elasticBuilder() {
  return buildElasticBuilder.call({})
}

export {
  AggregationBuilder,
  SubAggregationBuilder,
  SubAggregationFn,
  FilterBuilder,
  FilterSubFilterBuilder,
  FilterSubFilterFn,
  QueryBuilder,
  QuerySubFilterBuilder,
  QuerySubFilterFn,
}
