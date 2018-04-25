import {SearchBody} from '../types'

import {aggregationBuilder} from './aggregationBuilder'
import {filterBuilder} from './filterBuilder'
import {optionsBuilder} from './optionsBuilder'
import {queryBuilder} from './queryBuilder'

import {
  AggregationBuilder,
  SubAggregationBuilder,
  SubAggregationFn,
  FilterBuilder,
  FilterSubFilterBuilder,
  FilterSubFilterFn,
  OptionsBuilder,
  QueryBuilder,
  QuerySubFilterBuilder,
  QuerySubFilterFn,
} from './types'

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
