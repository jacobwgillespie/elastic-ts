import is from '@sindresorhus/is'

import {Aggregations} from '../types/aggregations'
import {AggregationBuilder} from './types'

function buildAggregationBuilder<B>(this: B, initialData?: Aggregations): AggregationBuilder<B> {
  const aggregations: Aggregations = initialData || {}

  return Object.assign({}, this, {
    agg(name: any, typeOrAggregation?: any, config?: any) {
      return this.aggregation(name, typeOrAggregation, config)
    },

    aggregation(name: any, typeOrAggregation?: any, config?: any): B {
      if (is.string(typeOrAggregation)) {
        return buildAggregationBuilder.call(this, {
          ...aggregations,
          [name]: {
            [typeOrAggregation]: config,
          },
        })
      } else if (is.plainObject(typeOrAggregation)) {
        return buildAggregationBuilder.call(this, {
          ...aggregations,
          [name]: typeOrAggregation,
        })
      } else if (is.nullOrUndefined(typeOrAggregation)) {
        return buildAggregationBuilder.call(this, {
          ...aggregations,
          ...name,
        })
      }

      throw new TypeError('invalid arguments')
    },

    getAggregations() {
      return aggregations as Aggregations
    },

    hasAggregations() {
      return !is.empty(aggregations)
    },
  })
}

export function aggregationBuilder<B>(this: B) {
  return buildAggregationBuilder.apply(this)
}
