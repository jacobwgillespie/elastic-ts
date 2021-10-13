import {Coordinate, PrimitiveValue, PrimitiveValueArray, Script, Sort, SortOrder} from './common'
import {Query} from './queries'

export type CollectMode = 'breadth_first' | 'depth_first'

// Metrics Aggregations

export interface AvgAggregation {
  avg: ({field: string} | {script: Script}) & {
    missing?: PrimitiveValue
  }
}

export interface CardinalityAggregation {
  cardinality: ({field: string} | {script: Script}) & {
    precision_threshold?: number
    missing?: PrimitiveValue
  }
}

export interface ExtendedStatsAggregation {
  extended_stats: ({field: string} | {script: Script}) & {
    sigma?: number
    missing?: PrimitiveValue
  }
}

export interface GeoBoundsAggregation {
  geo_bounds: {
    field: string
    wrap_longitude?: boolean
  }
}

export interface GeoCentroidAggregation {
  geo_centroid: {
    field: string
  }
}

export interface MaxAggregation {
  max: ({field: string} | {script: Script}) & {
    missing?: PrimitiveValue
  }
}

export interface MinAggregation {
  min: ({field: string} | {script: Script}) & {
    missing?: PrimitiveValue
  }
}

export interface PercentilesAggregation {
  percentiles: ({field: string} | {script: Script}) & {
    percents?: number[]
    keyed?: boolean
    tdigest?: {
      compression?: number
    }
    hdr?: {
      number_of_significant_value_digits?: number
    }
    missing?: PrimitiveValue
  }
}

export interface PercentileRanksAggregation {
  percentile_ranks: ({field: string} | {script: Script}) & {
    values: number[]
    keyed?: boolean
    hdr?: {
      number_of_significant_value_digits?: number
    }
    missing?: PrimitiveValue
  }
}

export interface ScriptedMetricAggregation {
  scripted_metric: {
    init_script?: Script
    map_script: Script
    combine_script?: Script
    reduce_script?: Script
    params?: {
      [param: string]: any
    }
  }
}

export interface StatsAggregation {
  stats: ({field?: string} | {script?: Script}) & {
    sigma?: number
    missing?: PrimitiveValue
  }
}

export interface SumAggregation {
  sum: ({field: string} | {script: Script}) & {
    missing?: PrimitiveValue
  }
}

export interface TopHitsAggregation {
  top_hits: {
    from?: number
    size?: number
    sort?: Sort
    _source?: any
  }
}

export interface ValueCountAggregation {
  value_count: {field: string} | {script: Script}
}

export type MetricsAggregation =
  | AvgAggregation
  | CardinalityAggregation
  | ExtendedStatsAggregation
  | GeoBoundsAggregation
  | GeoCentroidAggregation
  | MaxAggregation
  | MinAggregation
  | PercentilesAggregation
  | PercentileRanksAggregation
  | ScriptedMetricAggregation
  | StatsAggregation
  | SumAggregation
  | TopHitsAggregation
  | ValueCountAggregation

export type AllMetricsAggregations = AvgAggregation &
  CardinalityAggregation &
  ExtendedStatsAggregation &
  GeoBoundsAggregation &
  GeoCentroidAggregation &
  MaxAggregation &
  MinAggregation &
  PercentilesAggregation &
  PercentileRanksAggregation &
  ScriptedMetricAggregation &
  StatsAggregation &
  SumAggregation &
  TopHitsAggregation &
  ValueCountAggregation

// Bucket Aggregations

export interface AdjacencyMatrixAggregation {
  adjacency_matrix: {
    filters: {[name: string]: Query}
    separator?: string
  }
}

export interface ChildrenAggregation {
  children: {
    type: string
  }
}

export interface CompositeAggregation {
  composite: {
    size?: number
    sources: {
      [name: string]:
        | {terms: ({field: string} | {script: Script}) & {order?: SortOrder}}
        | {
            histogram: ({field: string} | {script: Script}) & {
              interval: number
              order?: SortOrder
            }
          }
        | {
            date_histogram: ({field: string} | {script: Script}) & {
              interval: string
              time_zone?: string
              order?: SortOrder
            }
          }
    }[]
    after?: {[source: string]: PrimitiveValue}
  }
}

export interface DateHistogramAggregation {
  date_histogram: {
    field: string
    interval?: string
    calendar_interval?: string
    fixed_interval?: string
    offset?: string
    min_doc_count?: number
    format?: string
    time_zone?: string
    keyed?: boolean
    missing?: PrimitiveValue
  }
}

export interface DateRangeAggregation {
  date_range: {
    field: string
    ranges: ({from: string; key?: string} | {to: string; key?: string} | {from: string; to: string; key?: string})[]
    format?: string
    time_zone?: string
    keyed?: boolean
    missing?: string
  }
}

export interface DiversifiedSamplerAggregation {
  diversified_sampler: ({field: string} | {script: Script}) & {
    max_docs_per_value?: number
    shard_size?: number
    execution_hint?: 'map' | 'global_ordinals' | 'bytes_hash'
  }
}

export interface FilterAggregation {
  filter: Query
}

export interface FiltersAggregation {
  filters: {
    other_bucket_key?: string
    filters: {[name: string]: Query} | Query[]
  }
}

export interface GeoDistanceAggregation {
  geo_distance: {
    field: string
    origin: Coordinate
    unit?: string
    distance_type?: 'arc' | 'plane'
    keyed?: boolean
    ranges: ({to: number; key?: string} | {from: number; key?: string} | {from: number; to: number; key?: string})[]
  }
}

export interface GeoHashGridAggregation {
  geohash_grid: {
    field: string
    precision?: number
    size?: number
    shard_size?: number
  }
}

export interface GlobalAggregation {
  global: {}
}

export interface HistogramAggregation {
  histogram: {
    field: string
    interval: number
    offset?: number
    min_doc_count?: number
    extended_bounds?: {
      min: number
      max: number
    }
    order?: {[field: string]: SortOrder}
    missing?: PrimitiveValue
    keyed?: boolean
  }
}

export interface IPRangeAggregation {
  ip_range: {
    field: string
    ranges: ({to: string; key?: string} | {from: string; key?: string} | {mask: string; key?: string})[]
    keyed?: boolean
  }
}

export interface MissingAggregation {
  missing: {
    field: string
  }
}

export interface NestedAggregation {
  nested: {
    path: string
  }
}

export interface RangeAggregation {
  range: ({field: string} | {script: Script}) & {
    ranges: (
      | {from: string | number; key?: string}
      | {to: string | number; key?: string}
      | {from: string | number; to: string | number; key?: string}
    )[]
    keyed?: boolean
  }
}

export interface ReverseNestedAggregation {
  reverse_nested: {
    path?: string
  }
}

export interface SamplerAggregation {
  sampler: {
    field?: string
    size?: number
    exclude?: string[]
    shard_size?: number
  }
}

export interface SignificantTermsAggregation {
  significant_terms: {
    field: string
    script_heuristic?: Script
    min_doc_count?: number
    shard_min_doc_count?: number
    background_filter?: Query
    execution_hint?: 'global_ordinals' | 'map'
    include?: string | string[]
    exclude?: string | string[]
    size?: number
    shard_size?: number
  }
}

export interface SignificantTextAggregation {
  significant_text: {
    field: string
    filter_duplicate_text?: boolean
    size?: number
    shard_size?: number
    min_doc_count?: number
    shard_min_doc_count?: number
    background_filter?: Query
    source_fields?: string[]
    include?: PrimitiveValueArray
    exclude?: PrimitiveValueArray
  }
}

export interface TermsAggregation {
  terms: ({field?: string} | {script?: Script}) & {
    size?: number
    shard_size?: number
    show_term_doc_count_error?: boolean
    order?: {[field: string]: SortOrder} | {[field: string]: SortOrder}[]
    min_doc_count?: number
    shard_min_doc_count?: number
    include?: string | string[] | {partition: number; num_partitions: number}
    exclude?: string | string[]
    collect_mode?: CollectMode
    execution_hint?: 'map' | 'global_ordinals'
    missing?: any
  }
}

export type BucketAggregation =
  | AdjacencyMatrixAggregation
  | ChildrenAggregation
  | CompositeAggregation
  | DateHistogramAggregation
  | DateRangeAggregation
  | DiversifiedSamplerAggregation
  | FilterAggregation
  | FiltersAggregation
  | GeoDistanceAggregation
  | GeoHashGridAggregation
  | GlobalAggregation
  | HistogramAggregation
  | IPRangeAggregation
  | MissingAggregation
  | NestedAggregation
  | RangeAggregation
  | ReverseNestedAggregation
  | SamplerAggregation
  | SignificantTermsAggregation
  | SignificantTextAggregation
  | TermsAggregation

export type AllBucketAggregations = AdjacencyMatrixAggregation &
  ChildrenAggregation &
  CompositeAggregation &
  DateHistogramAggregation &
  DateRangeAggregation &
  DiversifiedSamplerAggregation &
  FilterAggregation &
  FiltersAggregation &
  GeoDistanceAggregation &
  GeoHashGridAggregation &
  GlobalAggregation &
  HistogramAggregation &
  IPRangeAggregation &
  MissingAggregation &
  NestedAggregation &
  RangeAggregation &
  ReverseNestedAggregation &
  SamplerAggregation &
  SignificantTermsAggregation &
  SignificantTextAggregation &
  TermsAggregation

// Pipeline Aggregations

export interface AvgBucketAggregation {
  avg_bucket: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
  }
}

export interface DerivativeAggregation {
  derivative: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
    unit?: string
  }
}

export interface MaxBucketAggregation {
  max_bucket: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
  }
}

export interface MinBucketAggregation {
  min_bucket: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
  }
}

export interface SumBucketAggregation {
  sum_bucket: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
  }
}

export interface StatsBucketAggregation {
  stats_bucket: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
  }
}

export interface ExtendedStatsBucketAggregation {
  extended_stats_bucket: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
    sigma?: number
  }
}

export interface PercentilesBucketAggregation {
  percentiles_bucket: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
    percents?: number[]
  }
}

export interface MovingAverageBucketAggregation {
  moving_avg: {
    buckets_path: string
    gap_policy?: 'skip' | 'insert_zeros'
    window?: number
    maximize?: boolean
    minimize?: boolean
    predict?: number
  } & (
    | {
        model?: 'simple'
      }
    | {
        model: 'linear'
      }
    | {
        model: 'ewma'
        settings?: {
          alpha?: number
        }
      }
    | {
        model: 'holt'
        settings?: {
          alpha?: number
          beta?: number
        }
      }
    | {
        model: 'holt_winters'
        settings?: {
          type?: 'add' | 'mult'
          alpha?: number
          beta?: number
          gamma?: number
          period?: number
          pad?: boolean
        }
      }
  )
}

export interface CumulativeSumAggregation {
  cumulative_sum: {
    buckets_path: string
    format?: string
  }
}

export interface BucketScriptAggregation {
  bucket_script: {
    script: Script
    buckets_path: {[variable: string]: string}
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
  }
}

export interface BucketSelectorAggregation {
  bucket_selector: {
    script: Script
    buckets_path: {[variable: string]: string}
    gap_policy?: 'skip' | 'insert_zeros'
  }
}

export interface BucketSortAggregation {
  bucket_sort: {
    sort?: Sort
    from?: number
    size?: number
    gap_policy?: 'skip' | 'insert_zeros'
  }
}

export interface SerialDifferencingAggregation {
  serial_diff: {
    buckets_path: string
    lag?: number
    gap_policy?: 'skip' | 'insert_zeros'
    format?: string
  }
}

export type PipelineAggregation =
  | AvgBucketAggregation
  | DerivativeAggregation
  | MaxBucketAggregation
  | MinBucketAggregation
  | SumBucketAggregation
  | StatsBucketAggregation
  | ExtendedStatsBucketAggregation
  | PercentilesBucketAggregation
  | MovingAverageBucketAggregation
  | CumulativeSumAggregation
  | BucketScriptAggregation
  | BucketSelectorAggregation
  | BucketSortAggregation
  | SerialDifferencingAggregation

export type AllPipelineAggregations = AvgBucketAggregation &
  DerivativeAggregation &
  MaxBucketAggregation &
  MinBucketAggregation &
  SumBucketAggregation &
  StatsBucketAggregation &
  ExtendedStatsBucketAggregation &
  PercentilesBucketAggregation &
  MovingAverageBucketAggregation &
  CumulativeSumAggregation &
  BucketScriptAggregation &
  BucketSelectorAggregation &
  BucketSortAggregation &
  SerialDifferencingAggregation

// Matrix Aggregations

export interface MatrixStatsAggregation {
  matrix_stats: {
    fields: string[]
    mode?: 'avg' | 'min' | 'max' | 'sum' | 'median'
    missing?: {[field: string]: PrimitiveValue}
  }
}

export type MatrixAggregation = MatrixStatsAggregation
export type AllMatrixAggregations = MatrixStatsAggregation

export type Aggregation = MetricsAggregation | BucketAggregation | PipelineAggregation | MatrixAggregation

export type AllAggregations = AllMetricsAggregations &
  AllBucketAggregations &
  AllPipelineAggregations &
  AllMatrixAggregations

export type AggregationType = keyof AllAggregations

export interface Aggregations {
  [name: string]: Aggregation & {
    filter?: Query
    aggs?: Aggregations
    aggregations?: Aggregations
  }
}
