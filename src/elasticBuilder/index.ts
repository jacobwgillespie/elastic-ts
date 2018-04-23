import is from '@sindresorhus/is'

import {SearchBody} from '../types'
import {Sort, FieldSortOptions, SortOrder} from '../types/common'

import {mergeSort} from './utils'
import {AggregationBuilder, aggregationBuilder} from './aggregationBuilder'
import {QueryBuilder, queryBuilder} from './queryBuilder'

export interface ElasticBuilder extends AggregationBuilder<ElasticBuilder>, QueryBuilder<ElasticBuilder> {
  sort(field: string): ElasticBuilder
  sort(field: string, order: SortOrder): ElasticBuilder
  sort(field: string, config: FieldSortOptions): ElasticBuilder
  sort(config: Sort): ElasticBuilder

  from(quantity: number | undefined): ElasticBuilder

  size(quantity: number | undefined): ElasticBuilder

  build(): SearchBody
}

function buildElasticBuilder(
  initialData: SearchBody = {},
  aggregationBuilderInstance?: any,
  queryBuilderInstance?: any,
): ElasticBuilder {
  const body: SearchBody = initialData || {}

  var builder: ElasticBuilder = {
    sort(field: any, order?: any) {
      let currentSort = body.sort
      let nextSort: Sort

      if (is.string(field)) {
        if (order != null) {
          nextSort = {[field]: order}
          nextSort = mergeSort(currentSort, nextSort)
        } else {
          nextSort = mergeSort(currentSort, field)
        }
      } else {
        nextSort = mergeSort(currentSort, field)
      }

      return buildElasticBuilder({
        ...body,
        sort: nextSort,
      })
    },

    from(quantity: number | undefined) {
      if (body.from !== quantity) {
        return buildElasticBuilder({
          ...body,
          from: quantity,
        })
      }
      return this
    },

    size(quantity: number | undefined) {
      if (body.size !== quantity) {
        buildElasticBuilder({
          ...body,
          size: quantity,
        })
      }
      return this
    },

    build() {
      body.query = this.getQuery()
      return JSON.parse(JSON.stringify(body))
    },

    ...(aggregationBuilderInstance || aggregationBuilder()),
    ...(queryBuilderInstance || queryBuilder()),
  }

  return builder
}

export const elasticBuilder = () => buildElasticBuilder()
