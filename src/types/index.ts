import {Aggregations} from './aggregations'
import {Query} from './queries'
import {Sort, Script, PrimitiveValue} from './common'

export interface Highlight {
  type?: 'unified' | 'plain' | 'fvh'
  boundary_chars?: string
  boundary_max_scan?: number
  boundary_scanner?: 'chars' | 'sentence' | 'word'
  boundary_scanner_locale?: 'string'
  encoder?: 'default' | 'html'
  fields?: {[field: string]: Highlight} | {[field: string]: Highlight}[]
  force_source?: boolean
  fragmenter?: 'span' | 'simple'
  fragment_offset?: number
  fragment_size?: number
  highlight_query?: Query
  matched_fields?: string[]
  no_match_size?: number
  number_of_fragments?: number
  order?: 'score'
  phrase_limit?: number
  pre_tags?: string[]
  post_tags?: string[]
  require_field_match?: boolean
  tags_schema?: 'styled'
}

export interface Rescore {
  window_size?: number
  query: {
    score_mode?: 'total' | 'multiply' | 'avg' | 'max' | 'min'
    rescore_query: Query
    query_weight?: number
    rescore_query_weight?: number
  }
}

export interface SearchBody {
  from?: number
  size?: number
  aggregations?: Aggregations
  aggs?: Aggregations
  query?: Query
  highlight?: Highlight
  track_total_hits?: boolean
  track_scores?: boolean
  sort?: Sort
  rescore?: Rescore | Rescore[]
  search_type?: 'query_then_fetch' | 'dfs_query_then_fetch'
  stored_fields?: '_none_' | string[]
  script_fields?: {
    [field: string]: Script
  }
  docvalue_fields?: string[]
  post_filter?: Query
  _source?:
    | false
    | string
    | string[]
    | {includes: string[]}
    | {excludes: string[]}
    | {includes: string[]; excludes: string[]}
  slide?: {
    field?: string
    id: number
    max: number
  }
  version?: boolean
  indices_boost?: {[index: string]: number}[]
  min_score?: number
  collapse?: {
    field: string
    inner_hits?: {name: string; size: number; sort: Sort}[]
    max_concurrent_group_searches?: number
  }
  search_after?: PrimitiveValue[]
}
