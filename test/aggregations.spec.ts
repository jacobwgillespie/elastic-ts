import {esBuilder} from '..'

describe('esBuilder - Aggregations', () => {
  it('avg aggregation', () => {
    const result = esBuilder().aggregation('agg_avg_grade', 'avg', 'grade').build()

    expect(result).toEqual({
      aggs: {
        agg_avg_grade: {
          avg: {
            field: 'grade',
          },
        },
      },
    })
  })

  it('cardinality aggregation', () => {
    const result = esBuilder().aggregation('agg_cardinality_author', 'cardinality', 'author').build()

    expect(result).toEqual({
      aggs: {
        agg_cardinality_author: {
          cardinality: {
            field: 'author',
          },
        },
      },
    })
  })

  it('extended_stats aggregation', () => {
    const result = esBuilder().aggregation('agg_extended_stats_grade', 'extended_stats', 'grade').build()

    expect(result).toEqual({
      aggs: {
        agg_extended_stats_grade: {
          extended_stats: {
            field: 'grade',
          },
        },
      },
    })
  })

  it('geo_bounds aggregation', () => {
    const result = esBuilder().aggregation('agg_geo_bounds_location', 'geo_bounds', 'location').build()

    expect(result).toEqual({
      aggs: {
        agg_geo_bounds_location: {
          geo_bounds: {
            field: 'location',
          },
        },
      },
    })
  })

  it('geo_centroid aggregation', () => {
    const result = esBuilder().aggregation('agg_geo_centroid_location', 'geo_centroid', 'location').build()

    expect(result).toEqual({
      aggs: {
        agg_geo_centroid_location: {
          geo_centroid: {
            field: 'location',
          },
        },
      },
    })
  })

  it('max aggregation', () => {
    const result = esBuilder().aggregation('agg_max_price', 'max', 'price').build()

    expect(result).toEqual({
      aggs: {
        agg_max_price: {
          max: {
            field: 'price',
          },
        },
      },
    })
  })

  it('min aggregation', () => {
    const result = esBuilder().aggregation('agg_min_price', 'min', 'price').build()

    expect(result).toEqual({
      aggs: {
        agg_min_price: {
          min: {
            field: 'price',
          },
        },
      },
    })
  })

  it('percentiles aggregation', () => {
    const result = esBuilder()
      .aggregation('agg_percentiles_load_time', 'percentiles', 'load_time', {
        percents: [95, 99, 99.9],
      })
      .build()

    expect(result).toEqual({
      aggs: {
        agg_percentiles_load_time: {
          percentiles: {
            field: 'load_time',
            percents: [95, 99, 99.9],
          },
        },
      },
    })
  })

  it('percentiles script aggregation', () => {
    const result = esBuilder()
      .aggregation('agg_percentiles_load_time', 'percentiles', {
        script: {
          inline: "doc['load_time'].value / timeUnit",
          params: {
            timeUnit: 100,
          },
        },
      })
      .build()

    expect(result).toEqual({
      aggs: {
        agg_percentiles_load_time: {
          percentiles: {
            script: {
              inline: "doc['load_time'].value / timeUnit",
              params: {
                timeUnit: 100,
              },
            },
          },
        },
      },
    })
  })

  it('percentile_ranks aggregation', () => {
    const result = esBuilder()
      .aggregation('agg_percentile_ranks_load_time', 'percentile_ranks', 'load_time', {
        values: [15, 30],
      })
      .build()

    expect(result).toEqual({
      aggs: {
        agg_percentile_ranks_load_time: {
          percentile_ranks: {
            field: 'load_time',
            values: [15, 30],
          },
        },
      },
    })
  })

  it('scripted_metric aggregation', () => {
    const result = esBuilder()
      .aggregation('agg_scripted_metric', 'scripted_metric', {
        init_script: 'params._agg.transactions = []',
        map_script: "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)",
        combine_script: 'double profit = 0; for (t in params._agg.transactions) { profit += t } return profit',
        reduce_script: 'double profit = 0; for (a in params._aggs) { profit += a } return profit',
      })
      .build()

    expect(result).toEqual({
      aggs: {
        agg_scripted_metric: {
          scripted_metric: {
            init_script: 'params._agg.transactions = []',
            map_script:
              "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)",
            combine_script: 'double profit = 0; for (t in params._agg.transactions) { profit += t } return profit',
            reduce_script: 'double profit = 0; for (a in params._aggs) { profit += a } return profit',
          },
        },
      },
    })
  })

  it('stats aggregation', () => {
    const result = esBuilder().aggregation('agg_stats_grade', 'stats', 'grade').build()

    expect(result).toEqual({
      aggs: {
        agg_stats_grade: {
          stats: {
            field: 'grade',
          },
        },
      },
    })
  })

  it('sum aggregation', () => {
    const result = esBuilder().aggregation('agg_sum_change', 'sum', 'change').build()

    expect(result).toEqual({
      aggs: {
        agg_sum_change: {
          sum: {
            field: 'change',
          },
        },
      },
    })
  })

  it('value_count aggregation', () => {
    const result = esBuilder().aggregation('agg_value_count_grade', 'value_count', 'grade').build()

    expect(result).toEqual({
      aggs: {
        agg_value_count_grade: {
          value_count: {
            field: 'grade',
          },
        },
      },
    })
  })

  it('children aggregation', () => {
    const result = esBuilder()
      .aggregation('top-tags', 'terms', 'tags.keyword', {size: 10}, (a1) => {
        return a1.aggregation('to-answers', 'children', {type: 'answer'}, (a2) => {
          return a2.aggregation('top-names', 'terms', 'owner.display_name.keyword', {size: 10})
        })
      })
      .build()

    expect(result).toEqual({
      aggs: {
        'top-tags': {
          terms: {
            field: 'tags.keyword',
            size: 10,
          },
          aggs: {
            'to-answers': {
              children: {
                type: 'answer',
              },
              aggs: {
                'top-names': {
                  terms: {
                    field: 'owner.display_name.keyword',
                    size: 10,
                  },
                },
              },
            },
          },
        },
      },
    })
  })

  it('date_histogram aggregation', () => {
    const result = esBuilder().aggregation('agg_date_histogram_grade', 'date_histogram', 'grade').build()

    expect(result).toEqual({
      aggs: {
        agg_date_histogram_grade: {
          date_histogram: {
            field: 'grade',
          },
        },
      },
    })
  })

  it('date_range aggregation', () => {
    const result = esBuilder()
      .aggregation('agg_date_range_date', 'date_range', 'date', {
        format: 'MM-yyy',
        ranges: [{to: 'now-10M/M'}, {from: 'now-10M/M'}],
      })
      .build()

    expect(result).toEqual({
      aggs: {
        agg_date_range_date: {
          date_range: {
            field: 'date',
            format: 'MM-yyy',
            ranges: [{to: 'now-10M/M'}, {from: 'now-10M/M'}],
          },
        },
      },
    })
  })

  it('diversified_sampler aggregation', () => {
    const result = esBuilder()
      .aggregation(
        'agg_diversified_sampler_user.id',
        'diversified_sampler',
        'user.id',
        {
          shard_size: 200,
        },
        (a) => {
          return a.aggregation('keywords', 'significant_terms', 'text')
        },
      )
      .build()

    expect(result).toEqual({
      aggs: {
        'agg_diversified_sampler_user.id': {
          diversified_sampler: {
            field: 'user.id',
            shard_size: 200,
          },
          aggs: {
            keywords: {
              significant_terms: {
                field: 'text',
              },
            },
          },
        },
      },
    })
  })

  it('filter aggregation', () => {
    const result = esBuilder()
      .aggregation('agg_filter_red_products', 'filter', 'red_products', (a) => {
        return a.filter('term', 'color', 'red').aggregation('avg_price', 'avg', 'price')
      })
      .build()

    expect(result).toEqual({
      aggs: {
        agg_filter_red_products: {
          filter: {term: {color: 'red'}},
          aggs: {
            avg_price: {avg: {field: 'price'}},
          },
        },
      },
    })
  })

  it('filters aggregation', () => {
    const result = esBuilder()
      .aggregation('agg_name', 'filters', {
        filters: {
          users: {term: {user: 'John'}},
          errors: {term: {status: 'failure'}},
        },
      })
      .build()

    expect(result).toEqual({
      aggs: {
        agg_name: {
          filters: {
            filters: {
              users: {term: {user: 'John'}},
              errors: {term: {status: 'failure'}},
            },
          },
        },
      },
    })
  })

  it('pipeline aggregation', () => {
    const result = esBuilder()
      .aggregation('sales_per_month', 'date_histogram', 'date', {interval: 'month'}, (a) => {
        return a.aggregation('sales', 'sum', 'price')
      })
      .aggregation('max_monthly_sales', 'max_bucket', {buckets_path: 'sales_per_month>sales'})
      .build()

    expect(result).toEqual({
      aggs: {
        sales_per_month: {
          date_histogram: {
            field: 'date',
            interval: 'month',
          },
          aggs: {
            sales: {
              sum: {
                field: 'price',
              },
            },
          },
        },
        max_monthly_sales: {
          max_bucket: {
            buckets_path: 'sales_per_month>sales',
          },
        },
      },
    })
  })

  it('matrix stats', () => {
    const result = esBuilder()
      .aggregation('matrixstats', 'matrix_stats', {fields: ['poverty', 'income']})
      .build()

    expect(result).toEqual({
      aggs: {
        matrixstats: {
          matrix_stats: {
            fields: ['poverty', 'income'],
          },
        },
      },
    })
  })
})
