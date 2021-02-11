import {Coordinate, PrimitiveValue, PrimitiveValueArray, Script} from './common'

// Match all queries

export interface MatchAllQuery {
  match_all: {
    boost?: number
  }
}

export interface MatchNoneQuery {
  match_none: {}
}

// Full text queries

export interface MatchQueryFieldConfig {
  match:
    | string
    | {
        query: string

        analyzer?: string
        boost?: number
        auto_generate_synonyms_phrase_query?: boolean
        cutoff_frequency?: number
        fuzziness?: number | string
        fuzzy_transpositions?: boolean
        lenient?: boolean
        max_expansions?: number
        minimum_should_match?: number | string
        operator?: 'and' | 'or'
        prefix_length?: number
        rewrite?: any
        zero_terms_query?: 'none' | 'all'
      }
}
export interface MatchQuery {
  match: {
    [field: string]: MatchQueryFieldConfig['match']
  }
}

export interface MatchPhraseFieldConfig {
  match_phrase:
    | string
    | {
        query: string
        analyzer?: string
        boost?: number
        slop?: number
      }
}
export interface MatchPhraseQuery {
  match_phrase: {
    [field: string]: MatchPhraseFieldConfig['match_phrase']
  }
}

export interface MatchPhrasePrefixFieldConfig {
  match_phrase_prefix:
    | string
    | {
        query: string
        analyzer?: string
        slop?: number
        max_expansions?: number
      }
}
export interface MatchPhrasePrefixQuery {
  match_phrase_prefix: {
    [field: string]: MatchPhrasePrefixFieldConfig['match_phrase_prefix']
  }
}

export interface MultiMatchQuery {
  multi_match: {
    query: string
    fields: string[]
    analyzer?: string
    auto_generate_synonyms_phrase_query?: boolean
    boost?: number
    cutoff_frequency?: number
    fuzziness?: number | string
    fuzzy_transpositions?: boolean
    lenient?: boolean
    max_expansions?: number
    minimum_should_match?: number | string
    operator?: 'and' | 'or'
    prefix_length?: number
    rewrite?: any
    slop?: number
    tie_breaker?: number | string
    type?: 'best_fields' | 'most_fields' | 'cross_fields' | 'phrase' | 'phrase_prefix' | 'bool_prefix'
    zero_terms_query?: 'none' | 'all'
  }
}

export interface CommonTermsFieldConfig {
  common: {
    query: string
    cutoff_frequency?: number
    analyzer?: string
    boost?: number
    minimum_should_match?:
      | number
      | string
      | {
          low_freq: number | string
          high_freq: number | string
        }
    low_freq_operator?: 'and' | 'or'
    high_freq_operator?: 'and' | 'or'
  }
}
export interface CommonTermsQuery {
  common: {
    [field: string]: CommonTermsFieldConfig['common']
  }
}

export interface QueryStringQuery {
  query_string: {
    default_field?: string
    query: string
    analyzer?: string
    quote_analyzer?: string
    allow_leading_wildcard?: boolean
    enable_position_increments?: boolean
    fuzzy_match_expansions?: number
    fuzziness?: number | string
    fuzzy_prefix_length?: number
    fuzzy_transpositions?: boolean
    phrase_slop?: number
    boost?: number
    auto_generate_phrase_queries?: boolean
    analyze_wildcard?: boolean
    max_determined_states?: number
    minimum_should_match?: number | string
    lenient?: boolean
    time_zone?: string
    quote_field_suffix?: string
    auto_generate_synonyms_phrase_query?: boolean
    rewrite?: any
    fields?: string[]
    tie_breaker?: number
  }
}

export interface SimpleQueryStringQuery {
  simple_query_string: {
    query: string
    fields?: string[]
    default_operator?: 'and' | 'or'
    analyzer?: string
    flags?: string
    analyze_wildcard?: boolean
    lenient?: boolean
    minimum_should_match?: number | string
    quote_field_suffix?: string
    auto_generate_synonyms_phrase_query?: boolean
    fuzzy_prefix_length?: number
    fuzzy_max_expansions?: number
    fuzzy_transpositions?: boolean
  }
}

export type FullTextQuery =
  | MatchQuery
  | MatchPhraseQuery
  | MatchPhrasePrefixQuery
  | MultiMatchQuery
  | CommonTermsQuery
  | QueryStringQuery
  | SimpleQueryStringQuery
export type AllFullTextQueries = MatchQuery &
  MatchPhraseQuery &
  MatchPhrasePrefixQuery &
  MultiMatchQuery &
  CommonTermsQuery &
  QueryStringQuery &
  SimpleQueryStringQuery

// Term level queries

export interface TermFieldConfig {
  term:
    | PrimitiveValue
    | {
        value: PrimitiveValue
        boost?: number
      }
}
export interface TermQuery {
  term: {
    [field: string]: TermFieldConfig['term']
  }
}

export interface TermsFieldConfig {
  terms:
    | PrimitiveValueArray
    | {
        index: string
        type: string
        id: string
        path: string
        routing?: string
      }
}
export interface TermsQuery {
  terms: {
    [field: string]: TermsFieldConfig['terms']
  }
}

export interface TermsSetFieldConfig {
  terms_set: {
    terms: PrimitiveValueArray
    minimum_should_match_field?: string
    minimum_should_match_script?: {
      source?: string
    }
  }
}
export interface TermsSetQuery {
  terms_set: {
    [field: string]: TermsSetFieldConfig['terms_set']
  }
}

export interface RangeFieldConfig {
  range: {
    gt?: string | number
    gte?: string | number
    lt?: string | number
    lte?: string | number
    from?: string | number
    to?: string | number
    format?: string
    time_zone?: string
    boost?: number
  }
}
export interface RangeQuery {
  range: {
    [field: string]: RangeFieldConfig['range']
  }
}

export interface ExistsQuery {
  exists: {
    field: string
  }
}

export interface PrefixFieldConfig {
  prefix:
    | string
    | {
        value: string
        boost?: number
      }
}
export interface PrefixQuery {
  prefix: {
    [field: string]: PrefixFieldConfig['prefix']
  }
}

export interface WildcardFieldConfig {
  wildcard:
    | string
    | {
        value: string
        boost?: number
      }
    | {
        wildcard: string
        boost?: number
      }
}
export interface WildcardQuery {
  wildcard: {
    [field: string]: WildcardFieldConfig['wildcard']
  }
}

export interface RegexpFieldConfig {
  regexp:
    | string
    | {
        value: string
        flags?: string
        boost?: number
        max_determinized_states?: number
      }
}
export interface RegexpQuery {
  regexp: {
    [field: string]: RegexpFieldConfig['regexp']
  }
}

export interface FuzzyFieldConfig {
  fuzzy:
    | string
    | {
        value: string
        boost?: number
        fuzziness: number | string
        prefix_length?: number
        max_expansions?: number
        transpositions?: boolean
      }
}
export interface FuzzyQuery {
  fuzzy: {
    [field: string]: FuzzyFieldConfig['fuzzy']
  }
}

export interface TypeQuery {
  type: {
    value: string
  }
}

export interface IdsQuery {
  ids: {
    type?: string | string[]
    values: string[]
  }
}

export type TermLevelQuery =
  | TermQuery
  | TermsQuery
  | TermsSetQuery
  | RangeQuery
  | ExistsQuery
  | PrefixQuery
  | WildcardQuery
  | RegexpQuery
  | FuzzyQuery
  | TypeQuery
  | IdsQuery
export type AllTermLevelQueries = TermQuery &
  TermsQuery &
  TermsSetQuery &
  RangeQuery &
  ExistsQuery &
  PrefixQuery &
  WildcardQuery &
  RegexpQuery &
  FuzzyQuery &
  TypeQuery &
  IdsQuery

// Compound Queries

export interface ConstantScoreQuery {
  constant_score: {
    filter: Query
    boost?: number
  }
}

export interface BoolQueryConfig {
  must?: Query | Query[]
  filter?: Query | Query[]
  should?: Query | Query[]
  must_not?: Query | Query[]
  minimum_should_match?: number | string
  boost?: number
}

export interface BoolQuery {
  bool: BoolQueryConfig
}

export interface DisMaxQuery {
  dis_max: {
    tie_breaker?: number | string
    boost?: number
    queries: Query[]
  }
}

/** @deprecated Deprecated in Elasticsearch 7.9 */
export interface FunctionScoreQuery {
  function_score: {
    functions?: (FunctionScoreQuery['function_score'] & {filter?: Query})[]
    query?: Query
    max_boost?: number
    boost?: number | string
    score_mode?: 'multiply' | 'sum' | 'avg' | 'first' | 'max' | 'min'
    boost_mode?: 'multiply' | 'replace' | 'sum' | 'avg' | 'max' | 'min'
    min_score?: number
    script_score?: {
      script: Script
    }
    weight?: number
    random_score?: {
      seed?: number
      field?: string
    }
    field_value_factor?: {
      field: string
      factor?: number
      modifier?: 'none' | 'log' | 'log1p' | 'log2p' | 'ln' | 'ln1p' | 'ln2p' | 'square' | 'sqrt' | 'reciprocal'
      missing?: PrimitiveValue
    }
    gauss?: {
      [field: string]: {
        origin?: string
        scale: string
        offset?: string | number
        decay?: number
      }
    }
    linear?: {
      [field: string]: {
        origin?: string
        scale: string
        offset?: string | number
        decay?: number
      }
    }
    exp?: {
      [field: string]: {
        origin?: string
        scale: string
        offset?: string | number
        decay?: number
      }
    }
  }
}

export interface BoostingQuery {
  boosting: {
    positive: Query
    negative: Query
    negative_boost: number
  }
}

export type CompoundQuery = ConstantScoreQuery | BoolQuery | DisMaxQuery | FunctionScoreQuery | BoostingQuery
export type AllCompoundQueries = ConstantScoreQuery & BoolQuery & DisMaxQuery & FunctionScoreQuery & BoostingQuery

// Joining Queries

export interface NestedQuery {
  nested: {
    path: string
    query: Query
    score_mode?: 'avg' | 'sum' | 'min' | 'max' | 'none'
    ignore_unmapped?: boolean
  }
}

export interface HasChildQuery {
  has_child: {
    type: string
    query: Query
    score_mode?: 'none' | 'min' | 'max' | 'sum' | 'avg'
    min_children?: number
    max_children?: number
    ignore_unmapped?: boolean
  }
}

export interface HasParentQuery {
  has_parent: {
    parent_type: string
    query: Query
    score?: boolean
    ignore_unmapped?: boolean
  }
}

export interface ParentIdQuery {
  parent_id: {
    type: string
    id: string
    ignore_unmapped?: boolean
  }
}

export type JoiningQuery = NestedQuery | HasChildQuery | HasParentQuery | ParentIdQuery
export type AllJoiningQueries = NestedQuery & HasChildQuery & HasParentQuery & ParentIdQuery

// Geo Queries

export interface GeoShapeQuery {
  geo_shape: {
    location: {
      shape?: {
        type: string
        coordinates: [number, number][]
      }
      indexed_shape?: {
        index: string
        type: string
        id: string
        path: string
      }
      relation?: 'intersects' | 'disjoint' | 'within' | 'contains'
      ignore_unmapped?: boolean
    }
  }
}

export interface GeoBoundingBoxFieldConfig {
  geo_bounding_box: {
    _name?: string
    type?: 'memory' | 'indexed'
    validation_method?: 'strict' | 'ignore_malformed' | 'coerce'
    bottom_left?: Coordinate
    bottom_right?: Coordinate
    bottom?: Coordinate
    bottomLeft?: Coordinate
    bottomRight?: Coordinate
    left?: Coordinate
    right?: Coordinate
    top_left?: Coordinate
    top_right?: Coordinate
    top?: Coordinate
    topLeft?: Coordinate
    topRight?: Coordinate
    wkt?: string
  }
}

export interface GeoBoundingBoxQuery {
  geo_bounding_box: {
    [field: string]: GeoBoundingBoxFieldConfig['geo_bounding_box']
  }
}

export interface GeoDistanceQuery {
  geo_distance:
    | {
        distance: string
        distance_type?: 'arc' | 'plane'
        _name?: string
        validation_method?: 'strict' | 'ignore_malformed' | 'coerce'
        ignore_unmapped?: boolean
      }
    | {
        [field: string]: Coordinate
      }
}

export interface GeoPolygonFieldConfig {
  geo_polygon: {
    points: Coordinate[]
    _name?: string
    validation_method?: 'strict' | 'ignore_malformed' | 'coerce'
    ignore_unmapped?: boolean
  }
}

export interface GeoPolygonQuery {
  geo_polygon: {
    [field: string]: GeoPolygonFieldConfig['geo_polygon']
  }
}

export type GeoQuery = GeoShapeQuery | GeoBoundingBoxQuery | GeoDistanceQuery | GeoPolygonQuery
export type AllGeoQueries = GeoShapeQuery & GeoBoundingBoxQuery & GeoDistanceQuery & GeoPolygonQuery

// Specialized Queries

export interface MoreLikeThisQuery {
  more_like_this: {
    fields?: string[]
    like: string | (object | string)[]
    like_text?: string
    unlike?: string | (object | string)[]
    ids?: string[]
    docs?: object[]
    max_query_terms?: number
    min_term_freq?: number
    min_doc_freq?: number
    max_doc_freq?: number
    min_word_length?: number
    max_word_length?: number
    stop_words?: string[]
    analyzer?: string
    minimum_should_match?: string
    boost_terms?: number
    include?: boolean
    boost?: number
  }
}

export interface ScriptQuery {
  script: {
    script: Script
  }
}

export interface ScriptScoreQuery {
  script_score: {
    query: Query
    script: Script
  }
}

export interface PercolateQuery {
  percolate: {
    field: string
    name?: string
  } & (
    | {
        document?: object
        documents?: object[]
      }
    | {
        index: string
        type: string
        id: string
        routing?: string
        preference?: string
        version?: string | number
      }
  )
}

export interface WrapperQuery {
  wrapper: {
    query: string
  }
}

export interface RankFeatureQuery {
  rank_feature: {
    field: string
    boost?: number
  } & (
    | {
        saturation: {
          pivot?: number
        }
      }
    | {
        log: {
          scaling_factor: number
        }
      }
    | {
        sigmoid: {
          pivot: number
          exponent: number
        }
      }
    | {}
  )
}

export type SpecializedQuery =
  | MoreLikeThisQuery
  | ScriptQuery
  | ScriptScoreQuery
  | PercolateQuery
  | WrapperQuery
  | RankFeatureQuery
export type AllSpecializedQueries = MoreLikeThisQuery &
  ScriptQuery &
  ScriptScoreQuery &
  PercolateQuery &
  WrapperQuery &
  RankFeatureQuery

export type Query =
  | MatchAllQuery
  | MatchNoneQuery
  | FullTextQuery
  | TermLevelQuery
  | CompoundQuery
  | JoiningQuery
  | GeoQuery
  | SpecializedQuery

export type AllQueries = MatchAllQuery &
  MatchNoneQuery &
  AllFullTextQueries &
  AllTermLevelQueries &
  AllCompoundQueries &
  AllJoiningQueries &
  AllGeoQueries &
  AllSpecializedQueries

export type QueryType = keyof AllQueries

export type FieldQueryConfig =
  | MatchQueryFieldConfig
  | MatchPhraseFieldConfig
  | MatchPhrasePrefixFieldConfig
  | CommonTermsFieldConfig
  | TermFieldConfig
  | TermsFieldConfig
  | TermsSetFieldConfig
  | RangeFieldConfig
  | PrefixFieldConfig
  | WildcardFieldConfig
  | RegexpFieldConfig
  | FuzzyFieldConfig
  | GeoBoundingBoxFieldConfig
  | GeoPolygonFieldConfig

export type AllFieldQueryConfigs = MatchQueryFieldConfig &
  MatchPhraseFieldConfig &
  MatchPhrasePrefixFieldConfig &
  CommonTermsFieldConfig &
  TermFieldConfig &
  TermsFieldConfig &
  TermsSetFieldConfig &
  RangeFieldConfig &
  PrefixFieldConfig &
  WildcardFieldConfig &
  RegexpFieldConfig &
  FuzzyFieldConfig &
  GeoBoundingBoxFieldConfig &
  GeoPolygonFieldConfig

export type FieldQueryType = keyof AllFieldQueryConfigs
