import {esBuilder} from '../src'

describe('esBuilder - Filters', () => {
  it('filter term', () => {
    const result = esBuilder()
      .filter('term', 'field', 'value')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          filter: {
            term: {field: 'value'},
          },
        },
      },
    })
  })

  it('filter nested', () => {
    const result = esBuilder()
      .filter('constant_score', {}, f => f.filter('term', 'field', 'value'))
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          filter: {
            constant_score: {filter: {term: {field: 'value'}}},
          },
        },
      },
    })
  })
})
