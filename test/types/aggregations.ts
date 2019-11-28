/**
 * The following aggregation examples were taken from the Elasticsearch documentation
 */

import {SearchBody} from '../../src'

// @ts-ignore
let body!: SearchBody // eslint-disable-line @typescript-eslint/no-unused-vars

// ******************************************
// * Metrics aggregations                   *
// ******************************************

// Avg Aggregation

body = {
  aggs: {
    avg_grade: {avg: {field: 'grade'}},
  },
}

body = {
  aggs: {
    avg_grade: {
      avg: {
        script: {
          source: 'doc.grade.value',
        },
      },
    },
  },
}

body = {
  aggs: {
    avg_grade: {
      avg: {
        script: {
          id: 'my_script',
          params: {
            field: 'grade',
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    avg_corrected_grade: {
      avg: {
        field: 'grade',
        script: {
          lang: 'painless',
          source: '_value * params.correction',
          params: {
            correction: 1.2,
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    grade_avg: {
      avg: {
        field: 'grade',
        missing: 10,
      },
    },
  },
}

// Cardinality Aggregation

body = {
  aggs: {
    type_count: {
      cardinality: {
        field: 'type',
      },
    },
  },
}

body = {
  aggs: {
    type_count: {
      cardinality: {
        field: '_doc',
        precision_threshold: 100,
      },
    },
  },
}

body = {
  aggs: {
    type_promoted_count: {
      cardinality: {
        script: {
          lang: 'painless',
          source: "doc['type'].value + ' ' + doc['promoted'].value",
        },
      },
    },
  },
}

body = {
  aggs: {
    type_promoted_count: {
      cardinality: {
        script: {
          id: 'my_script',
          params: {
            type_field: '_doc',
            promoted_field: 'promoted',
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    tag_cardinality: {
      cardinality: {
        field: 'tag',
        missing: 'N/A',
      },
    },
  },
}

// Extended Stats Aggregation

body = {
  size: 0,
  aggs: {
    grades_stats: {extended_stats: {field: 'grade'}},
  },
}

body = {
  size: 0,
  aggs: {
    grades_stats: {
      extended_stats: {
        field: 'grade',
        sigma: 3,
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    grades_stats: {
      extended_stats: {
        script: {
          source: "doc['grade'].value",
          lang: 'painless',
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    grades_stats: {
      extended_stats: {
        script: {
          id: 'my_script',
          params: {
            field: 'grade',
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    grades_stats: {
      extended_stats: {
        field: 'grade',
        script: {
          lang: 'painless',
          source: '_value * params.correction',
          params: {
            correction: 1.2,
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    grades_stats: {
      extended_stats: {
        field: 'grade',
        missing: 0,
      },
    },
  },
}

// Geo Bounds Aggregation

body = {
  query: {
    match: {name: 'musée'},
  },
  aggs: {
    viewport: {
      geo_bounds: {
        field: 'location',
        wrap_longitude: true,
      },
    },
  },
}

// Geo Centroid Aggregation

body = {
  aggs: {
    centroid: {
      geo_centroid: {
        field: 'location',
      },
    },
  },
}

body = {
  aggs: {
    cities: {
      terms: {field: 'city.keyword'},
      aggs: {
        centroid: {
          geo_centroid: {field: 'location'},
        },
      },
    },
  },
}

// Max Aggregation

body = {
  aggs: {
    max_price: {max: {field: 'price'}},
  },
}

body = {
  aggs: {
    max_price: {
      max: {
        script: {
          source: 'doc.price.value',
        },
      },
    },
  },
}

body = {
  aggs: {
    max_price: {
      max: {
        script: {
          id: 'my_script',
          params: {
            field: 'price',
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    max_price_in_euros: {
      max: {
        field: 'price',
        script: {
          source: '_value * params.conversion_rate',
          params: {
            conversion_rate: 1.2,
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    grade_max: {
      max: {
        field: 'grade',
        missing: 10,
      },
    },
  },
}

// Min Aggregation

body = {
  aggs: {
    min_price: {min: {field: 'price'}},
  },
}

body = {
  aggs: {
    min_price: {
      min: {
        script: {
          source: 'doc.price.value',
        },
      },
    },
  },
}

body = {
  aggs: {
    min_price: {
      min: {
        script: {
          id: 'my_script',
          params: {
            field: 'price',
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    min_price_in_euros: {
      min: {
        field: 'price',
        script: {
          source: '_value * params.conversion_rate',
          params: {
            conversion_rate: 1.2,
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    grade_min: {
      min: {
        field: 'grade',
        missing: 10,
      },
    },
  },
}

// Percentiles Aggregation

body = {
  size: 0,
  aggs: {
    load_time_outlier: {
      percentiles: {
        field: 'load_time',
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_outlier: {
      percentiles: {
        field: 'load_time',
        percents: [95, 99, 99.9],
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_outlier: {
      percentiles: {
        field: 'load_time',
        keyed: false,
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_outlier: {
      percentiles: {
        script: {
          lang: 'painless',
          source: "doc['load_time'].value / params.timeUnit",
          params: {
            timeUnit: 1000,
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_outlier: {
      percentiles: {
        script: {
          id: 'my_script',
          params: {
            field: 'load_time',
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_outlier: {
      percentiles: {
        field: 'load_time',
        tdigest: {
          compression: 200,
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_outlier: {
      percentiles: {
        field: 'load_time',
        percents: [95, 99, 99.9],
        hdr: {
          number_of_significant_value_digits: 3,
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    grade_percentiles: {
      percentiles: {
        field: 'grade',
        missing: 10,
      },
    },
  },
}

// Percentile Ranks Aggregation

body = {
  size: 0,
  aggs: {
    load_time_ranks: {
      percentile_ranks: {
        field: 'load_time',
        values: [500, 600],
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_ranks: {
      percentile_ranks: {
        field: 'load_time',
        values: [500, 600],
        keyed: false,
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_ranks: {
      percentile_ranks: {
        values: [500, 600],
        script: {
          lang: 'painless',
          source: "doc['load_time'].value / params.timeUnit",
          params: {
            timeUnit: 1000,
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_ranks: {
      percentile_ranks: {
        values: [500, 600],
        script: {
          id: 'my_script',
          params: {
            field: 'load_time',
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_ranks: {
      percentile_ranks: {
        field: 'load_time',
        values: [500, 600],
        hdr: {
          number_of_significant_value_digits: 3,
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    load_time_ranks: {
      percentile_ranks: {
        field: 'load_time',
        values: [500, 600],
        missing: 10,
      },
    },
  },
}

// Scripted Metric Aggregation

body = {
  query: {
    match_all: {},
  },
  aggs: {
    profit: {
      scripted_metric: {
        init_script: 'params._agg.transactions = []',
        map_script: "params._agg.transactions.add(doc.type.value == 'sale' ? doc.amount.value : -1 * doc.amount.value)",
        combine_script: 'double profit = 0; for (t in params._agg.transactions) { profit += t } return profit',
        reduce_script: 'double profit = 0; for (a in params._aggs) { profit += a } return profit',
      },
    },
  },
}

body = {
  aggs: {
    profit: {
      scripted_metric: {
        init_script: {
          id: 'my_init_script',
        },
        map_script: {
          id: 'my_map_script',
        },
        combine_script: {
          id: 'my_combine_script',
        },
        params: {
          field: 'amount',
          _agg: {},
        },
        reduce_script: {
          id: 'my_reduce_script',
        },
      },
    },
  },
}

// Stats Aggregation

body = {
  aggs: {
    grades_stats: {stats: {field: 'grade'}},
  },
}

body = {
  aggs: {
    grades_stats: {
      stats: {
        script: {
          lang: 'painless',
          source: "doc['grade'].value",
        },
      },
    },
  },
}

body = {
  aggs: {
    grades_stats: {
      stats: {
        script: {
          id: 'my_script',
          params: {
            field: 'grade',
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    grades_stats: {
      stats: {
        field: 'grade',
        script: {
          lang: 'painless',
          source: '_value * params.correction',
          params: {
            correction: 1.2,
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    grades_stats: {
      stats: {
        field: 'grade',
        missing: 0,
      },
    },
  },
}

// Sum Aggregation

body = {
  query: {
    constant_score: {
      filter: {
        match: {type: 'hat'},
      },
    },
  },
  aggs: {
    hat_prices: {sum: {field: 'price'}},
  },
}

body = {
  query: {
    constant_score: {
      filter: {
        match: {type: 'hat'},
      },
    },
  },
  aggs: {
    hat_prices: {
      sum: {
        script: {
          source: 'doc.price.value',
        },
      },
    },
  },
}

body = {
  query: {
    constant_score: {
      filter: {
        match: {type: 'hat'},
      },
    },
  },
  aggs: {
    hat_prices: {
      sum: {
        script: {
          id: 'my_script',
          params: {
            field: 'price',
          },
        },
      },
    },
  },
}

body = {
  query: {
    constant_score: {
      filter: {
        match: {type: 'hat'},
      },
    },
  },
  aggs: {
    square_hats: {
      sum: {
        field: 'price',
        script: {
          source: '_value * _value',
        },
      },
    },
  },
}

body = {
  query: {
    constant_score: {
      filter: {
        match: {type: 'hat'},
      },
    },
  },
  aggs: {
    hat_prices: {
      sum: {
        field: 'price',
        missing: 100,
      },
    },
  },
}

// Top Hits Aggregation

body = {
  aggs: {
    top_tags: {
      terms: {
        field: 'type',
        size: 3,
      },
      aggs: {
        top_sales_hits: {
          top_hits: {
            sort: [
              {
                date: {
                  order: 'desc',
                },
              },
            ],
            _source: {
              includes: ['date', 'price'],
            },
            size: 1,
          },
        },
      },
    },
  },
}

body = {
  query: {
    match: {
      body: 'elections',
    },
  },
  aggs: {
    top_sites: {
      terms: {
        field: 'domain',
        order: {
          top_hit: 'desc',
        },
      },
      aggs: {
        top_tags_hits: {
          top_hits: {},
        },
        top_hit: {
          max: {
            script: {
              source: '_score',
            },
          },
        },
      },
    },
  },
}

body = {
  query: {
    term: {tags: 'car'},
  },
  aggs: {
    by_sale: {
      nested: {
        path: 'comments',
      },
      aggs: {
        by_user: {
          terms: {
            field: 'comments.username',
            size: 1,
          },
          aggs: {
            by_nested: {
              top_hits: {},
            },
          },
        },
      },
    },
  },
}

// Value Count Aggregation

body = {
  aggs: {
    types_count: {value_count: {field: 'type'}},
  },
}

body = {
  aggs: {
    type_count: {
      value_count: {
        script: {
          source: "doc['type'].value",
        },
      },
    },
  },
}

body = {
  aggs: {
    types_count: {
      value_count: {
        script: {
          id: 'my_script',
          params: {
            field: 'type',
          },
        },
      },
    },
  },
}

// ******************************************
// * Bucket aggregations                    *
// ******************************************

// Adjacency Matrix Aggregation

body = {
  size: 0,
  aggs: {
    interactions: {
      adjacency_matrix: {
        filters: {
          grpA: {terms: {accounts: ['hillary', 'sidney']}},
          grpB: {terms: {accounts: ['donald', 'mitt']}},
          grpC: {terms: {accounts: ['vladimir', 'nigel']}},
        },
      },
    },
  },
}

// Children Aggregation

body = {
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
}

// Composite Aggregation

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [{product: {terms: {field: 'product'}}}],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [
          {
            product: {
              terms: {
                script: {
                  source: "doc['product'].value",
                  lang: 'painless',
                },
              },
            },
          },
        ],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [{histo: {histogram: {field: 'price', interval: 5}}}],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [
          {
            histo: {
              histogram: {
                interval: 5,
                script: {
                  source: "doc['price'].value",
                  lang: 'painless',
                },
              },
            },
          },
        ],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [{date: {date_histogram: {field: 'timestamp', interval: '1d'}}}],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [
          {date: {date_histogram: {field: 'timestamp', interval: '1d'}}},
          {product: {terms: {field: 'product'}}},
        ],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [
          {shop: {terms: {field: 'shop'}}},
          {product: {terms: {field: 'product'}}},
          {date: {date_histogram: {field: 'timestamp', interval: '1d'}}},
        ],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [
          {date: {date_histogram: {field: 'timestamp', interval: '1d', order: 'desc'}}},
          {product: {terms: {field: 'product', order: 'asc'}}},
        ],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        size: 2,
        sources: [
          {date: {date_histogram: {field: 'timestamp', interval: '1d'}}},
          {product: {terms: {field: 'product'}}},
        ],
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        size: 2,
        sources: [
          {date: {date_histogram: {field: 'timestamp', interval: '1d', order: 'desc'}}},
          {product: {terms: {field: 'product', order: 'asc'}}},
        ],
        after: {date: 1494288000000, product: 'mad max'},
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        sources: [
          {date: {date_histogram: {field: 'timestamp', interval: '1d', order: 'desc'}}},
          {product: {terms: {field: 'product'}}},
        ],
      },
      aggregations: {
        the_avg: {
          avg: {field: 'price'},
        },
      },
    },
  },
}

body = {
  aggs: {
    my_buckets: {
      composite: {
        size: 2,
        sources: [
          {date: {date_histogram: {field: 'timestamp', interval: '1d', order: 'asc'}}},
          {product: {terms: {field: 'product', order: 'asc'}}},
        ],
      },
    },
  },
}

body = {
  size: 0,
  track_total_hits: false,
  aggs: {
    my_buckets: {
      composite: {
        size: 2,
        sources: [
          {date: {date_histogram: {field: 'timestamp', interval: '1d'}}},
          {product: {terms: {field: 'product'}}},
        ],
      },
    },
  },
}

// Date Histogram Aggregation

body = {
  aggs: {
    sales_over_time: {
      date_histogram: {
        field: 'date',
        interval: 'month',
      },
    },
  },
}

body = {
  aggs: {
    sales_over_time: {
      date_histogram: {
        field: 'date',
        interval: '90m',
      },
    },
  },
}

body = {
  aggs: {
    sales_over_time: {
      date_histogram: {
        field: 'date',
        interval: '1M',
        format: 'yyyy-MM-dd',
      },
    },
  },
}

body = {
  aggs: {
    by_day: {
      date_histogram: {
        field: 'date',
        interval: 'day',
      },
    },
  },
}

body = {
  aggs: {
    by_day: {
      date_histogram: {
        field: 'date',
        interval: 'day',
        time_zone: '-01:00',
      },
    },
  },
}

body = {
  aggs: {
    by_day: {
      date_histogram: {
        field: 'date',
        interval: 'day',
        offset: '+6h',
      },
    },
  },
}

body = {
  aggs: {
    sales_over_time: {
      date_histogram: {
        field: 'date',
        interval: '1M',
        format: 'yyyy-MM-dd',
        keyed: true,
      },
    },
  },
}

body = {
  aggs: {
    dayOfWeek: {
      terms: {
        script: {
          lang: 'painless',
          source: "doc['date'].value.dayOfWeek",
        },
      },
    },
  },
}

// Date Range Aggregation

body = {
  aggs: {
    range: {
      date_range: {
        field: 'date',
        format: 'MM-yyy',
        ranges: [{to: 'now-10M/M'}, {from: 'now-10M/M'}],
      },
    },
  },
}

body = {
  aggs: {
    range: {
      date_range: {
        field: 'date',
        missing: '1976/11/30',
        ranges: [
          {
            key: 'Older',
            to: '2016/02/01',
          },
          {
            key: 'Newer',
            from: '2016/02/01',
            to: 'now/d',
          },
        ],
      },
    },
  },
}

body = {
  aggs: {
    range: {
      date_range: {
        field: 'date',
        time_zone: 'CET',
        ranges: [{to: '2016/02/01'}, {from: '2016/02/01', to: 'now/d'}, {from: 'now/d'}],
      },
    },
  },
}

body = {
  aggs: {
    range: {
      date_range: {
        field: 'date',
        format: 'MM-yyy',
        ranges: [{to: 'now-10M/M'}, {from: 'now-10M/M'}],
        keyed: true,
      },
    },
  },
}

body = {
  aggs: {
    range: {
      date_range: {
        field: 'date',
        format: 'MM-yyy',
        ranges: [
          {from: '01-2015', to: '03-2015', key: 'quarter_01'},
          {from: '03-2015', to: '06-2015', key: 'quarter_02'},
        ],
        keyed: true,
      },
    },
  },
}

// Diversified Sampler Aggregation

body = {
  query: {
    query_string: {
      query: 'tags:elasticsearch',
    },
  },
  aggs: {
    my_unbiased_sample: {
      diversified_sampler: {
        shard_size: 200,
        field: 'author',
      },
      aggs: {
        keywords: {
          significant_terms: {
            field: 'tags',
            exclude: ['elasticsearch'],
          },
        },
      },
    },
  },
}

body = {
  query: {
    query_string: {
      query: 'tags:kibana',
    },
  },
  aggs: {
    my_unbiased_sample: {
      diversified_sampler: {
        shard_size: 200,
        max_docs_per_value: 3,
        script: {
          lang: 'painless',
          source: "doc['tags'].values.hashCode()",
        },
      },
      aggs: {
        keywords: {
          significant_terms: {
            field: 'tags',
            exclude: ['kibana'],
          },
        },
      },
    },
  },
}

// Filter Aggregation

body = {
  aggs: {
    t_shirts: {
      filter: {term: {type: 't-shirt'}},
      aggs: {
        avg_price: {avg: {field: 'price'}},
      },
    },
  },
}

// Filters Aggregation

body = {
  size: 0,
  aggs: {
    messages: {
      filters: {
        filters: {
          errors: {match: {body: 'error'}},
          warnings: {match: {body: 'warning'}},
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    messages: {
      filters: {
        filters: [{match: {body: 'error'}}, {match: {body: 'warning'}}],
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    messages: {
      filters: {
        other_bucket_key: 'other_messages',
        filters: {
          errors: {match: {body: 'error'}},
          warnings: {match: {body: 'warning'}},
        },
      },
    },
  },
}

// Geo Distance Aggregation

body = {
  aggs: {
    rings_around_amsterdam: {
      geo_distance: {
        field: 'location',
        origin: '52.3760, 4.894',
        ranges: [{to: 100000}, {from: 100000, to: 300000}, {from: 300000}],
      },
    },
  },
}

body = {
  aggs: {
    rings: {
      geo_distance: {
        field: 'location',
        origin: '52.3760, 4.894',
        unit: 'km',
        ranges: [{to: 100}, {from: 100, to: 300}, {from: 300}],
      },
    },
  },
}

body = {
  aggs: {
    rings: {
      geo_distance: {
        field: 'location',
        origin: '52.3760, 4.894',
        unit: 'km',
        distance_type: 'plane',
        ranges: [{to: 100}, {from: 100, to: 300}, {from: 300}],
      },
    },
  },
}

body = {
  aggs: {
    rings_around_amsterdam: {
      geo_distance: {
        field: 'location',
        origin: '52.3760, 4.894',
        ranges: [{to: 100000}, {from: 100000, to: 300000}, {from: 300000}],
        keyed: true,
      },
    },
  },
}

body = {
  aggs: {
    rings_around_amsterdam: {
      geo_distance: {
        field: 'location',
        origin: '52.3760, 4.894',
        ranges: [
          {to: 100000, key: 'first_ring'},
          {from: 100000, to: 300000, key: 'second_ring'},
          {from: 300000, key: 'third_ring'},
        ],
        keyed: true,
      },
    },
  },
}

// GeoHash Grid Aggregation

body = {
  aggregations: {
    'large-grid': {
      geohash_grid: {
        field: 'location',
        precision: 3,
      },
    },
  },
}

body = {
  aggregations: {
    'zoomed-in': {
      filter: {
        geo_bounding_box: {
          location: {
            top_left: '52.4, 4.9',
            bottom_right: '52.3, 5.0',
          },
        },
      },
      aggregations: {
        zoom1: {
          geohash_grid: {
            field: 'location',
            precision: 8,
          },
        },
      },
    },
  },
}

// Global Aggregation

body = {
  query: {
    match: {type: 't-shirt'},
  },
  aggs: {
    all_products: {
      global: {},
      aggs: {
        avg_price: {avg: {field: 'price'}},
      },
    },
    t_shirts: {avg: {field: 'price'}},
  },
}

// Histogram Aggregation

body = {
  aggs: {
    prices: {
      histogram: {
        field: 'price',
        interval: 50,
      },
    },
  },
}

body = {
  aggs: {
    prices: {
      histogram: {
        field: 'price',
        interval: 50,
        min_doc_count: 1,
      },
    },
  },
}

body = {
  query: {
    constant_score: {filter: {range: {price: {to: '500'}}}},
  },
  aggs: {
    prices: {
      histogram: {
        field: 'price',
        interval: 50,
        extended_bounds: {
          min: 0,
          max: 500,
        },
      },
    },
  },
}

body = {
  aggs: {
    prices: {
      histogram: {
        field: 'price',
        interval: 50,
        keyed: true,
      },
    },
  },
}

body = {
  aggs: {
    quantity: {
      histogram: {
        field: 'quantity',
        interval: 10,
        missing: 0,
      },
    },
  },
}

// IP Range Aggregation

body = {
  size: 10,
  aggs: {
    ip_ranges: {
      ip_range: {
        field: 'ip',
        ranges: [{to: '10.0.0.5'}, {from: '10.0.0.5'}],
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    ip_ranges: {
      ip_range: {
        field: 'ip',
        ranges: [{mask: '10.0.0.0/25'}, {mask: '10.0.0.127/25'}],
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    ip_ranges: {
      ip_range: {
        field: 'ip',
        ranges: [{to: '10.0.0.5'}, {from: '10.0.0.5'}],
        keyed: true,
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    ip_ranges: {
      ip_range: {
        field: 'ip',
        ranges: [
          {key: 'infinity', to: '10.0.0.5'},
          {key: 'and-beyond', from: '10.0.0.5'},
        ],
        keyed: true,
      },
    },
  },
}

// Missing Aggregation

body = {
  aggs: {
    products_without_a_price: {
      missing: {field: 'price'},
    },
  },
}

// Nested Aggregation

body = {
  query: {
    match: {name: 'led tv'},
  },
  aggs: {
    resellers: {
      nested: {
        path: 'resellers',
      },
      aggs: {
        min_price: {min: {field: 'resellers.price'}},
      },
    },
  },
}

// Range Aggregation

body = {
  aggs: {
    price_ranges: {
      range: {
        field: 'price',
        ranges: [{to: 100.0}, {from: 100.0, to: 200.0}, {from: 200.0}],
      },
    },
  },
}

body = {
  aggs: {
    price_ranges: {
      range: {
        field: 'price',
        keyed: true,
        ranges: [{to: 100}, {from: 100, to: 200}, {from: 200}],
      },
    },
  },
}

body = {
  aggs: {
    price_ranges: {
      range: {
        field: 'price',
        keyed: true,
        ranges: [
          {key: 'cheap', to: 100},
          {key: 'average', from: 100, to: 200},
          {key: 'expensive', from: 200},
        ],
      },
    },
  },
}

body = {
  aggs: {
    price_ranges: {
      range: {
        script: {
          lang: 'painless',
          source: "doc['price'].value",
        },
        ranges: [{to: 100}, {from: 100, to: 200}, {from: 200}],
      },
    },
  },
}

body = {
  aggs: {
    price_ranges: {
      range: {
        script: {
          id: 'convert_currency',
          params: {
            field: 'price',
            conversion_rate: 0.835526591,
          },
        },
        ranges: [{from: 0, to: 100}, {from: 100}],
      },
    },
  },
}

body = {
  aggs: {
    price_ranges: {
      range: {
        field: 'price',
        script: {
          source: '_value * params.conversion_rate',
          params: {
            conversion_rate: 0.8,
          },
        },
        ranges: [{to: 35}, {from: 35, to: 70}, {from: 70}],
      },
    },
  },
}

body = {
  aggs: {
    price_ranges: {
      range: {
        field: 'price',
        ranges: [{to: 100}, {from: 100, to: 200}, {from: 200}],
      },
      aggs: {
        price_stats: {
          stats: {field: 'price'},
        },
      },
    },
  },
}

body = {
  aggs: {
    price_ranges: {
      range: {
        field: 'price',
        ranges: [{to: 100}, {from: 100, to: 200}, {from: 200}],
      },
      aggs: {
        price_stats: {
          stats: {},
        },
      },
    },
  },
}

// Reverse Nested Aggregation

body = {
  query: {
    match_all: {},
  },
  aggs: {
    comments: {
      nested: {
        path: 'comments',
      },
      aggs: {
        top_usernames: {
          terms: {
            field: 'comments.username',
          },
          aggs: {
            comment_to_issue: {
              reverse_nested: {},
              aggs: {
                top_tags_per_comment: {
                  terms: {
                    field: 'tags',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

// Sampler Aggregation

body = {
  query: {
    query_string: {
      query: 'tags:kibana OR tags:javascript',
    },
  },
  aggs: {
    sample: {
      sampler: {
        shard_size: 200,
      },
      aggs: {
        keywords: {
          significant_terms: {
            field: 'tags',
            exclude: ['kibana', 'javascript'],
          },
        },
      },
    },
  },
}

body = {
  query: {
    query_string: {
      query: 'tags:kibana OR tags:javascript',
    },
  },
  aggs: {
    low_quality_keywords: {
      significant_terms: {
        field: 'tags',
        size: 3,
        exclude: ['kibana', 'javascript'],
      },
    },
  },
}

// Significant Terms Aggregation

body = {
  query: {
    terms: {force: ['British Transport Police']},
  },
  aggregations: {
    significant_crime_types: {
      significant_terms: {field: 'crime_type'},
    },
  },
}

body = {
  aggregations: {
    forces: {
      terms: {field: 'force'},
      aggregations: {
        significant_crime_types: {
          significant_terms: {field: 'crime_type'},
        },
      },
    },
  },
}

body = {
  aggs: {
    hotspots: {
      geohash_grid: {
        field: 'location',
        precision: 5,
      },
      aggs: {
        significant_crime_types: {
          significant_terms: {field: 'crime_type'},
        },
      },
    },
  },
}

body = {
  aggs: {
    tags: {
      significant_terms: {
        field: 'tag',
        min_doc_count: 10,
      },
    },
  },
}

body = {
  query: {
    match: {
      city: 'madrid',
    },
  },
  aggs: {
    tags: {
      significant_terms: {
        field: 'tag',
        background_filter: {
          term: {text: 'spain'},
        },
      },
    },
  },
}

body = {
  aggs: {
    tags: {
      significant_terms: {
        field: 'tags',
        execution_hint: 'map',
      },
    },
  },
}

// Significant Text Aggregation

body = {
  query: {
    match: {content: 'Bird flu'},
  },
  aggregations: {
    my_sample: {
      sampler: {
        shard_size: 100,
      },
      aggregations: {
        keywords: {
          significant_text: {field: 'content'},
        },
      },
    },
  },
}

body = {
  query: {
    simple_query_string: {
      query: '+elasticsearch  +pozmantier',
    },
  },
  _source: ['title', 'source'],
  highlight: {
    fields: {
      content: {},
    },
  },
}

body = {
  query: {
    match: {
      content: 'elasticsearch',
    },
  },
  aggs: {
    sample: {
      sampler: {
        shard_size: 100,
      },
      aggs: {
        keywords: {
          significant_text: {
            field: 'content',
            filter_duplicate_text: true,
          },
        },
      },
    },
  },
}

body = {
  query: {
    match: {
      content: 'madrid',
    },
  },
  aggs: {
    tags: {
      significant_text: {
        field: 'content',
        background_filter: {
          term: {content: 'spain'},
        },
      },
    },
  },
}

body = {
  query: {
    match: {
      custom_all: 'elasticsearch',
    },
  },
  aggs: {
    tags: {
      significant_text: {
        field: 'custom_all',
        source_fields: ['content', 'title'],
      },
    },
  },
}

// Terms Aggregation

body = {
  aggs: {
    genres: {
      terms: {field: 'genre'},
    },
  },
}

body = {
  aggs: {
    products: {
      terms: {
        field: 'product',
        size: 5,
      },
    },
  },
}

body = {
  aggs: {
    products: {
      terms: {
        field: 'product',
        size: 5,
        show_term_doc_count_error: true,
      },
    },
  },
}

body = {
  aggs: {
    genres: {
      terms: {
        field: 'genre',
        order: {_count: 'asc'},
      },
    },
  },
}

body = {
  aggs: {
    genres: {
      terms: {
        field: 'genre',
        order: {_key: 'asc'},
      },
    },
  },
}

body = {
  aggs: {
    genres: {
      terms: {
        field: 'genre',
        order: {max_play_count: 'desc'},
      },
      aggs: {
        max_play_count: {max: {field: 'play_count'}},
      },
    },
  },
}

body = {
  aggs: {
    genres: {
      terms: {
        field: 'genre',
        order: {'playback_stats.max': 'desc'},
      },
      aggs: {
        playback_stats: {stats: {field: 'play_count'}},
      },
    },
  },
}

body = {
  aggs: {
    countries: {
      terms: {
        field: 'artist.country',
        order: {'rock>playback_stats.avg': 'desc'},
      },
      aggs: {
        rock: {
          filter: {term: {genre: 'rock'}},
          aggs: {
            playback_stats: {stats: {field: 'play_count'}},
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    countries: {
      terms: {
        field: 'artist.country',
        order: [{'rock>playback_stats.avg': 'desc'}, {_count: 'desc'}],
      },
      aggs: {
        rock: {
          filter: {term: {genre: 'rock'}},
          aggs: {
            playback_stats: {stats: {field: 'play_count'}},
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    tags: {
      terms: {
        field: 'tags',
        min_doc_count: 10,
      },
    },
  },
}

body = {
  aggs: {
    genres: {
      terms: {
        script: {
          source: "doc['genre'].value",
          lang: 'painless',
        },
      },
    },
  },
}

body = {
  aggs: {
    genres: {
      terms: {
        script: {
          id: 'my_script',
          params: {
            field: 'genre',
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    genres: {
      terms: {
        field: 'gender',
        script: {
          source: "'Genre: ' +_value",
          lang: 'painless',
        },
      },
    },
  },
}

body = {
  aggs: {
    tags: {
      terms: {
        field: 'tags',
        include: '.*sport.*',
        exclude: 'water_.*',
      },
    },
  },
}

body = {
  aggs: {
    JapaneseCars: {
      terms: {
        field: 'make',
        include: ['mazda', 'honda'],
      },
    },
    ActiveCarManufacturers: {
      terms: {
        field: 'make',
        exclude: ['rover', 'jensen'],
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    expired_sessions: {
      terms: {
        field: 'account_id',
        include: {
          partition: 0,
          num_partitions: 20,
        },
        size: 10000,
        order: {
          last_access: 'asc',
        },
      },
      aggs: {
        last_access: {
          max: {
            field: 'access_date',
          },
        },
      },
    },
  },
}

body = {
  aggs: {
    actors: {
      terms: {
        field: 'actors',
        size: 10,
      },
      aggs: {
        costars: {
          terms: {
            field: 'actors',
            size: 5,
          },
        },
      },
    },
  },
}

// ******************************************
// * Pipeline aggregations                  *
// ******************************************

// Avg Bucket Aggregation

body = {
  size: 0,
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
    avg_monthly_sales: {
      avg_bucket: {
        buckets_path: 'sales_per_month>sales',
      },
    },
  },
}

// Derivative Aggregation

body = {
  size: 0,
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
        sales_deriv: {
          derivative: {
            buckets_path: 'sales',
          },
        },
      },
    },
  },
}

body = {
  size: 0,
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
        sales_deriv: {
          derivative: {
            buckets_path: 'sales',
          },
        },
        sales_2nd_deriv: {
          derivative: {
            buckets_path: 'sales_deriv',
          },
        },
      },
    },
  },
}

body = {
  size: 0,
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
        sales_deriv: {
          derivative: {
            buckets_path: 'sales',
            unit: 'day',
          },
        },
      },
    },
  },
}

// Max Bucket Aggregation

body = {
  size: 0,
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
}

// Min Bucket Aggregation

body = {
  size: 0,
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
    min_monthly_sales: {
      min_bucket: {
        buckets_path: 'sales_per_month>sales',
      },
    },
  },
}

// Sum Bucket Aggregation

body = {
  size: 0,
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
    sum_monthly_sales: {
      sum_bucket: {
        buckets_path: 'sales_per_month>sales',
      },
    },
  },
}

// Stats Bucket Aggregation

body = {
  size: 0,
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
    stats_monthly_sales: {
      stats_bucket: {
        buckets_path: 'sales_per_month>sales',
      },
    },
  },
}

// Extended Stats Bucket

body = {
  size: 0,
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
    stats_monthly_sales: {
      extended_stats_bucket: {
        buckets_path: 'sales_per_month>sales',
      },
    },
  },
}

// Percentiles Bucket Aggregation

body = {
  size: 0,
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
    percentiles_monthly_sales: {
      percentiles_bucket: {
        buckets_path: 'sales_per_month>sales',
        percents: [25.0, 50.0, 75.0],
      },
    },
  },
}

// Moving Average Bucket

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {buckets_path: 'the_sum'},
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {
            buckets_path: 'the_sum',
            window: 30,
            model: 'simple',
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {
            buckets_path: 'the_sum',
            window: 30,
            model: 'linear',
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {
            buckets_path: 'the_sum',
            window: 30,
            model: 'ewma',
            settings: {
              alpha: 0.5,
            },
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {
            buckets_path: 'the_sum',
            window: 30,
            model: 'holt',
            settings: {
              alpha: 0.5,
              beta: 0.5,
            },
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {
            buckets_path: 'the_sum',
            window: 30,
            model: 'holt_winters',
            settings: {
              type: 'add',
              alpha: 0.5,
              beta: 0.5,
              gamma: 0.5,
              period: 7,
            },
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {
            buckets_path: 'the_sum',
            window: 30,
            model: 'holt_winters',
            settings: {
              type: 'mult',
              alpha: 0.5,
              beta: 0.5,
              gamma: 0.5,
              period: 7,
              pad: true,
            },
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {
            buckets_path: 'the_sum',
            window: 30,
            model: 'simple',
            predict: 10,
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'date',
        interval: '1M',
      },
      aggs: {
        the_sum: {
          sum: {field: 'price'},
        },
        the_movavg: {
          moving_avg: {
            buckets_path: 'the_sum',
            model: 'holt_winters',
            window: 30,
            minimize: true,
            settings: {
              period: 7,
            },
          },
        },
      },
    },
  },
}

// Cumulative Sum Aggregation

body = {
  size: 0,
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
        cumulative_sales: {
          cumulative_sum: {
            buckets_path: 'sales',
          },
        },
      },
    },
  },
}

// Bucket Script Aggregation

body = {
  size: 0,
  aggs: {
    sales_per_month: {
      date_histogram: {
        field: 'date',
        interval: 'month',
      },
      aggs: {
        total_sales: {
          sum: {
            field: 'price',
          },
        },
        't-shirts': {
          filter: {
            term: {
              type: 't-shirt',
            },
          },
          aggs: {
            sales: {
              sum: {
                field: 'price',
              },
            },
          },
        },
        't-shirt-percentage': {
          bucket_script: {
            buckets_path: {
              tShirtSales: 't-shirts>sales',
              totalSales: 'total_sales',
            },
            script: 'params.tShirtSales / params.totalSales * 100',
          },
        },
      },
    },
  },
}

// Bucket Selector Aggregation

body = {
  size: 0,
  aggs: {
    sales_per_month: {
      date_histogram: {
        field: 'date',
        interval: 'month',
      },
      aggs: {
        total_sales: {
          sum: {
            field: 'price',
          },
        },
        sales_bucket_filter: {
          bucket_selector: {
            buckets_path: {
              totalSales: 'total_sales',
            },
            script: 'params.totalSales > 200',
          },
        },
      },
    },
  },
}

// Bucket Sort Aggregation

body = {
  size: 0,
  aggs: {
    sales_per_month: {
      date_histogram: {
        field: 'date',
        interval: 'month',
      },
      aggs: {
        total_sales: {
          sum: {
            field: 'price',
          },
        },
        sales_bucket_sort: {
          bucket_sort: {
            sort: [{total_sales: {order: 'desc'}}],
            size: 3,
          },
        },
      },
    },
  },
}

body = {
  size: 0,
  aggs: {
    sales_per_month: {
      date_histogram: {
        field: 'date',
        interval: 'month',
      },
      aggs: {
        bucket_truncate: {
          bucket_sort: {
            from: 1,
            size: 1,
          },
        },
      },
    },
  },
}

// Serial Differencing Aggregation

body = {
  size: 0,
  aggs: {
    my_date_histo: {
      date_histogram: {
        field: 'timestamp',
        interval: 'day',
      },
      aggs: {
        the_sum: {
          sum: {
            field: 'lemmings',
          },
        },
        thirtieth_difference: {
          serial_diff: {
            buckets_path: 'the_sum',
            lag: 30,
          },
        },
      },
    },
  },
}

// ******************************************
// * Matrix aggregations                    *
// ******************************************

// Matrix Stats Aggregation

body = {
  aggs: {
    statistics: {
      matrix_stats: {
        fields: ['poverty', 'income'],
      },
    },
  },
}

body = {
  aggs: {
    matrixstats: {
      matrix_stats: {
        fields: ['poverty', 'income'],
        missing: {income: 50000},
      },
    },
  },
}
