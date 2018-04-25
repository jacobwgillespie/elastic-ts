import {SearchBody} from '../types'

import {AggregationBuilder, aggregationBuilder} from './aggregationBuilder'
import {FilterBuilder, filterBuilder} from './filterBuilder'
import {OptionsBuilder, optionsBuilder} from './optionsBuilder'
import {QueryBuilder, queryBuilder} from './queryBuilder'

export interface ElasticBuilder
  extends AggregationBuilder<ElasticBuilder>,
    FilterBuilder<ElasticBuilder>,
    OptionsBuilder<ElasticBuilder>,
    QueryBuilder<ElasticBuilder> {
  build(): SearchBody
}

const clone = (v: any) => JSON.parse(JSON.stringify(v))

function buildElasticBuilder(): ElasticBuilder {
  return {
    build() {
      return clone({
        query: this.getQuery(),
        aggs: this.getAggregations(),
        ...this.getOptions(),
      })
    },

    ...aggregationBuilder.apply({}),
    ...filterBuilder.apply({}),
    ...optionsBuilder.apply({}),
    ...queryBuilder.apply({}),
  }
}

export function elasticBuilder() {
  return buildElasticBuilder.call({})
}
