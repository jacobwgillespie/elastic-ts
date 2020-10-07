export interface BinaryField {
  binary: {
    doc_values?: boolean
    store?: boolean
  }
}

export interface BooleanField {
  boolean: {
    boost?: number
    doc_values?: boolean
    index?: boolean
    null_value?: boolean
    store?: boolean
    meta?: Record<string, string>
  }
}

export interface KeywordFieldParameters {
  boost?: number
  doc_values?: boolean
  eager_global_ordinals?: boolean
  fields: Record<string, unknown> // TODO: write this
  ignore_above?: number
  index?: boolean
  index_options?: 'docs' | 'freqs'
  norms?: boolean
  null_value?: string
  store?: boolean
  similarity?: 'BM25' | 'classic' | 'boolean'
  normalizer?: string
  split_queries_on_whitespace?: boolean
  meta?: Record<string, string>
}

export interface KeywordField {
  keyword: KeywordFieldParameters
}

export interface ConstantKeywordField {
  constant_keyword: {
    meta?: Record<string, string>
    value?: string
  }
}

export interface WildcardField {
  wildcard: {
    ignore_above?: number
  }
}

export interface NumericFieldParameters {
  coerce?: boolean
  boost?: number
  doc_values?: boolean
  ignore_malformed?: boolean
  index?: boolean
  null_value?: number
  store?: boolean
  meta?: Record<string, string>
}

export interface LongField {
  long: NumericFieldParameters
}

export interface IntegerField {
  integer: NumericFieldParameters
}

export interface ShortField {
  short: NumericFieldParameters
}

export interface ByteField {
  byte: NumericFieldParameters
}

export interface DoubleField {
  double: NumericFieldParameters
}

export interface FloatField {
  float: NumericFieldParameters
}

export interface HalfFloatField {
  half_float: NumericFieldParameters
}

export interface ScaledFloatField {
  scaled_float: NumericFieldParameters & {scaling_factor?: number}
}

export interface DateField {
  date: {
    boost?: number
    doc_values?: boolean
    format?: string
    locale?: string
    ignore_malformed?: boolean
    index?: boolean
    null_value?: string
    store?: boolean
    meta?: Record<string, string>
  }
}

export interface DateNanosField {
  date_nanos: {
    boost?: number
    doc_values?: boolean
    format?: string
    locale?: string
    ignore_malformed?: boolean
    index?: boolean
    null_value?: string
    store?: boolean
    meta?: Record<string, string>
  }
}

export interface AliasField {
  alias: {
    path: string
  }
}

export interface ObjectField {
  object: {
    dynamic?: boolean
    enabled?: boolean
    properties?: Record<string, FieldMapping>
  }
}

export interface FlattenedField {
  flattened: {
    boost?: number
    depth_limit?: number
    doc_values?: boolean
    eager_global_ordinals?: boolean
    ignore_above?: number
    index?: boolean
    index_options?: 'docs' | 'freqs'
    null_value?: string
    similarity?: 'BM25' | 'classic' | 'boolean'
    split_queries_on_whitespace?: boolean
  }
}

export interface NestedField {
  nested: {
    dynamic?: boolean
    properties?: Record<string, FieldMapping>
    include_in_parent?: boolean
    include_in_root?: boolean
  }
}

export interface JoinField {
  join: {
    relations: Record<string, string | string[]>
    eager_global_ordinals?: boolean
  }
}

export interface RangeFieldParameters {
  coerce?: boolean
  boost?: number
  index?: boolean
  store?: boolean
}

export interface IntegerRangeField {
  integer_range: RangeFieldParameters
}

export interface FloatRangeField {
  float_range: RangeFieldParameters
}

export interface LongRangeField {
  long_range: RangeFieldParameters
}

export interface DoubleRangeField {
  double_range: RangeFieldParameters
}

export interface DateRangeField {
  date_range: RangeFieldParameters
}

export interface IpRangeField {
  ip_range: RangeFieldParameters
}

export interface IpField {
  ip: {
    boost?: number
    doc_values?: boolean
    index?: boolean
    null_value?: string
    store?: boolean
  }
}

export interface HistogramField {
  histogram: {}
}

export interface TextField {
  text: {
    analyzer?: string
    boost?: number
    eager_global_ordinals?: boolean
    fielddata?: boolean
    fielddata_frequency_filter?: {min?: number; max?: number; min_segment_size?: number}
    fields?: unknown
    index?: boolean
    index_options?: 'docs' | 'freq' | 'positions' | 'offsets'
    index_prefixes?: {min_chars?: number; max_chars?: number}
    index_phrases?: boolean
    norms?: boolean
    position_increment_gap?: number
    store?: boolean
    search_analyzer?: string
    search_quote_analyzer?: string
    similarity?: 'BM25' | 'classic' | 'boolean'
    term_vector?: boolean
    meta?: Record<string, string>
  }
}

export interface AnnotatedTextField {
  annotated_text: {}
}

export interface CompletionField {
  completion: {
    analyzer?: string
    search_analyzer?: string
    preserve_separators?: boolean
    preserve_position_increments?: boolean
    max_input_length?: number
  }
}

export interface SearchAsYouTypeField {
  search_as_you_type: {
    max_shingle_size?: number
    analyzer?: string
    index?: boolean
    index_options?: 'docs' | 'freq' | 'positions' | 'offsets'
    norms?: boolean
    store?: boolean
    search_analyzer?: string
    search_quote_analyzer?: string
    similarity?: 'BM25' | 'classic' | 'boolean'
    term_vector?: boolean
  }
}

export interface TokenCountField {
  token_count: {
    analyzer?: string
    enable_position_increments?: boolean
    boost?: number
    doc_values?: boolean
    index?: boolean
    null_value?: number
    store?: boolean
  }
}

export interface DenseVectorField {
  dense_vector: {
    dims: number
  }
}

export interface RankFeatureField {
  rank_feature: {
    positive_score_impact?: boolean
  }
}

export interface RankFeaturesField {
  rank_features: {}
}

export interface GeoPointField {
  geo_point: {
    ignore_malformed?: boolean
    ignore_z_value?: boolean
    null_value?: unknown
  }
}

export interface GeoShapeField {
  geo_shape: {
    tree?: 'quadtree' | 'geohash'
    precision?: string
    tree_levels?: number
    strategy?: 'recursive' | 'term'
    distance_error_pct?: number
    orientation?: 'right' | 'ccw' | 'counterclockwise' | 'left' | 'cw' | 'clockwise'
    points_only?: boolean
    ignore_malformed?: boolean
    ignore_z_value?: boolean
    coerce?: boolean
  }
}

export interface PointField {
  point: {
    ignore_malformed?: boolean
    ignore_z_value?: boolean
    null_value?: unknown
  }
}

export interface ShapeField {
  shape: {
    orientation?: 'right' | 'ccw' | 'counterclockwise' | 'left' | 'cw' | 'clockwise'
    ignore_malformed?: boolean
    ignore_z_value?: boolean
    coerce?: boolean
  }
}

export type Fields =
  | BinaryField
  | BooleanField
  | KeywordField
  | ConstantKeywordField
  | WildcardField
  | LongField
  | IntegerField
  | ShortField
  | ByteField
  | DoubleField
  | FloatField
  | HalfFloatField
  | ScaledFloatField
  | DateField
  | DateNanosField
  | AliasField
  | ObjectField
  | FlattenedField
  | NestedField
  | JoinField
  | IntegerRangeField
  | FloatRangeField
  | LongRangeField
  | DoubleRangeField
  | DateRangeField
  | IpRangeField
  | IpField
  | HistogramField
  | TextField
  | AnnotatedTextField
  | CompletionField
  | SearchAsYouTypeField
  | TokenCountField
  | DenseVectorField
  | RankFeatureField
  | RankFeaturesField
  | GeoPointField
  | GeoShapeField
  | PointField
  | ShapeField

export type AllFields = BinaryField &
  BooleanField &
  KeywordField &
  ConstantKeywordField &
  WildcardField &
  LongField &
  IntegerField &
  ShortField &
  ByteField &
  DoubleField &
  FloatField &
  HalfFloatField &
  ScaledFloatField &
  DateField &
  DateNanosField &
  AliasField &
  ObjectField &
  FlattenedField &
  NestedField &
  JoinField &
  IntegerRangeField &
  FloatRangeField &
  LongRangeField &
  DoubleRangeField &
  DateRangeField &
  IpRangeField &
  IpField &
  HistogramField &
  TextField &
  AnnotatedTextField &
  CompletionField &
  SearchAsYouTypeField &
  TokenCountField &
  DenseVectorField &
  RankFeatureField &
  RankFeaturesField &
  GeoPointField &
  GeoShapeField &
  PointField &
  ShapeField

export type FieldType = keyof AllFields

export type FieldMapping<T extends FieldType = FieldType> = {type: T} & AllFields[T]
