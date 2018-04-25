import is from '@sindresorhus/is'

import {Aggregations, AllAggregations, Aggregation} from '../types/aggregations'
import {FilterBuilder} from './filterBuilder'

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
