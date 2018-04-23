import {Query} from './queries'

export type Script =
  | string
  | {
      source: string
      lang?: string
      params?: {
        [param: string]: any
      }
    }
  | {
      id: string
      params?: {
        [param: string]: any
      }
    }

export type PrimitiveValue = null | number | string | boolean
export type PrimitiveValueArray = null[] | number[] | string[] | boolean[]

export type Coordinate =
  | string
  | number
  | [number, number]
  | {
      lat: number
      lon: number
    }

export type SortOrder = 'asc' | 'desc'

export interface NestedSort {
  path: string
  filter: Query
  nested?: NestedSort
}

export interface FieldSortOptions {
  order?: SortOrder
  mode?: 'min' | 'max' | 'sum' | 'avg' | 'median'
  nested?: NestedSort
  missing?: PrimitiveValue
  unmapped_type?: string
}

export type SortType =
  | string
  | {
      _geo_distance:
        | {
            order?: SortOrder
            distance_type?: 'arc' | 'plane'
            mode: 'min' | 'max' | 'median' | 'avg'
            unit?: string
            distance: string
            _name?: string
            validation_method?: 'strict' | 'ignore_malformed' | 'coerce'
            ignore_unmapped?: boolean
          }
        | {
            [field: string]: Coordinate | Coordinate[]
          }
    }
  | {
      _script: {
        type: string
        script: Script
        order: SortOrder
      }
    }
  | {
      [field: string]: SortOrder | FieldSortOptions
    }

export type Sort = SortType | SortType[]
