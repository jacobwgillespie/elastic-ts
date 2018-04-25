import {esBuilder} from '../src'

describe('esBuilder - Queries', () => {
  it('match_all', () => {
    const result = esBuilder()
      .query('match_all', {})
      .build()

    expect(result).toEqual({
      query: {
        match_all: {},
      },
    })
  })

  it('match_all with boost', () => {
    const result = esBuilder()
      .query('match_all', {boost: 1.2})
      .build()

    expect(result).toEqual({
      query: {
        match_all: {
          boost: 1.2,
        },
      },
    })
  })

  it('match_none', () => {
    const result = esBuilder()
      .query('match_none', {})
      .build()

    expect(result).toEqual({
      query: {
        match_none: {},
      },
    })
  })

  it('match', () => {
    const result = esBuilder()
      .query('match', 'message', 'this is a test')
      .build()

    expect(result).toEqual({
      query: {
        match: {
          message: 'this is a test',
        },
      },
    })
  })

  it('match empty string', () => {
    const result = esBuilder()
      .query('match', 'message', '')
      .build()

    expect(result).toEqual({
      query: {
        match: {
          message: '',
        },
      },
    })
  })

  it('match with options', () => {
    const result = esBuilder()
      .query('match', 'message', {
        query: 'this is a test',
        operator: 'and',
      })
      .build()

    expect(result).toEqual({
      query: {
        match: {
          message: {
            query: 'this is a test',
            operator: 'and',
          },
        },
      },
    })
  })

  it('match_phrase', () => {
    const result = esBuilder()
      .query('match_phrase', 'message', 'this is a test')
      .build()

    expect(result).toEqual({
      query: {
        match_phrase: {
          message: 'this is a test',
        },
      },
    })
  })

  it('match_phrase with options', () => {
    const result = esBuilder()
      .query('match_phrase', 'message', {
        query: 'this is a test',
        analyzer: 'my_analyzer',
      })
      .build()

    expect(result).toEqual({
      query: {
        match_phrase: {
          message: {
            query: 'this is a test',
            analyzer: 'my_analyzer',
          },
        },
      },
    })
  })

  it('common', () => {
    const result = esBuilder()
      .query('common', 'body', {
        query: 'this is bonsai cool',
        cutoff_frequency: 0.001,
      })
      .build()

    expect(result).toEqual({
      query: {
        common: {
          body: {
            query: 'this is bonsai cool',
            cutoff_frequency: 0.001,
          },
        },
      },
    })
  })

  it('query_string', () => {
    const result = esBuilder()
      .query('query_string', 'query', 'this AND that OR thus')
      .build()

    expect(result).toEqual({
      query: {
        query_string: {
          query: 'this AND that OR thus',
        },
      },
    })
  })

  it('query_string with options', () => {
    const result = esBuilder()
      .query('query_string', 'query', 'this AND that OR thus', {
        fields: ['content', 'name'],
      })
      .build()

    expect(result).toEqual({
      query: {
        query_string: {
          query: 'this AND that OR thus',
          fields: ['content', 'name'],
        },
      },
    })
  })

  it('query_string alternative', () => {
    const result = esBuilder()
      .query('query_string', {
        query: 'this AND that OR thus',
        fields: ['content', 'name'],
      })
      .build()

    expect(result).toEqual({
      query: {
        query_string: {
          query: 'this AND that OR thus',
          fields: ['content', 'name'],
        },
      },
    })
  })

  it('simple_query_string', () => {
    const result = esBuilder()
      .query('simple_query_string', 'query', 'foo bar baz')
      .build()

    expect(result).toEqual({
      query: {
        simple_query_string: {
          query: 'foo bar baz',
        },
      },
    })
  })

  it('term', () => {
    const result = esBuilder()
      .query('term', 'user', 'kimchy')
      .build()

    expect(result).toEqual({
      query: {
        term: {
          user: 'kimchy',
        },
      },
    })
  })

  it('term with boost', () => {
    const result = esBuilder()
      .query('term', 'status', {
        value: 'urgent',
        boost: '2.0',
      })
      .build()

    expect(result).toEqual({
      query: {
        term: {
          status: {
            value: 'urgent',
            boost: '2.0',
          },
        },
      },
    })
  })

  it('term multiple', () => {
    const result = esBuilder()
      .orQuery('term', 'status', {
        value: 'urgent',
        boost: '2.0',
      })
      .orQuery('term', 'status', 'normal')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          should: [
            {
              term: {
                status: {
                  value: 'urgent',
                  boost: '2.0',
                },
              },
            },
            {
              term: {
                status: 'normal',
              },
            },
          ],
        },
      },
    })
  })

  it('terms', () => {
    const result = esBuilder()
      .query('terms', 'user', ['kimchy', 'elastic'])
      .build()

    expect(result).toEqual({
      query: {
        terms: {
          user: ['kimchy', 'elastic'],
        },
      },
    })
  })

  it('range', () => {
    const result = esBuilder()
      .query('range', 'age', {gte: 10})
      .build()

    expect(result).toEqual({
      query: {
        range: {
          age: {gte: 10},
        },
      },
    })
  })

  it('exists', () => {
    const result = esBuilder()
      .query('exists', 'user')
      .build()

    expect(result).toEqual({
      query: {
        exists: {
          field: 'user',
        },
      },
    })
  })

  it('missing', () => {
    const result = esBuilder()
      .query('missing', 'user')
      .build()

    expect(result).toEqual({
      query: {
        missing: {
          field: 'user',
        },
      },
    })
  })

  it('prefix', () => {
    const result = esBuilder()
      .query('prefix', 'user', 'ki')
      .build()

    expect(result).toEqual({
      query: {
        prefix: {
          user: 'ki',
        },
      },
    })
  })

  it('prefix with boost', () => {
    const result = esBuilder()
      .query('prefix', 'user', {value: 'ki', boost: 2})
      .build()

    expect(result).toEqual({
      query: {
        prefix: {
          user: {
            value: 'ki',
            boost: 2,
          },
        },
      },
    })
  })

  it('wildcard', () => {
    const result = esBuilder()
      .query('wildcard', 'user', 'ki*y')
      .build()

    expect(result).toEqual({
      query: {
        wildcard: {
          user: 'ki*y',
        },
      },
    })
  })

  it('regexp', () => {
    const result = esBuilder()
      .query('regexp', 'name.first', 's.*y')
      .build()

    expect(result).toEqual({
      query: {
        regexp: {
          'name.first': 's.*y',
        },
      },
    })
  })

  it('fuzzy', () => {
    const result = esBuilder()
      .query('fuzzy', 'user', 'ki')
      .build()

    expect(result).toEqual({
      query: {
        fuzzy: {
          user: 'ki',
        },
      },
    })
  })

  it('type', () => {
    const result = esBuilder()
      .query('type', 'value', 'my_type')
      .build()

    expect(result).toEqual({
      query: {
        type: {
          value: 'my_type',
        },
      },
    })
  })

  it('ids', () => {
    const result = esBuilder()
      .query('ids', 'type', 'my_ids', {
        values: ['1', '4', '100'],
      })
      .build()

    expect(result).toEqual({
      query: {
        ids: {
          type: 'my_ids',
          values: ['1', '4', '100'],
        },
      },
    })
  })

  it('constant_score', () => {
    const result = esBuilder()
      .query('constant_score', {boost: 1.2}, q => {
        return q.filter('term', 'user', 'kimchy')
      })
      .build()

    expect(result).toEqual({
      query: {
        constant_score: {
          filter: {
            term: {user: 'kimchy'},
          },
          boost: 1.2,
        },
      },
    })
  })

  it('nested', () => {
    const result = esBuilder()
      .query('nested', {path: 'obj1', score_mode: 'avg'}, q => {
        return q.query('match', 'obj1.name', 'blue').query('range', 'obj1.count', {gt: 5})
      })
      .build()

    expect(result).toEqual({
      query: {
        nested: {
          path: 'obj1',
          score_mode: 'avg',
          query: {
            bool: {
              must: [
                {
                  match: {'obj1.name': 'blue'},
                },
                {
                  range: {'obj1.count': {gt: 5}},
                },
              ],
            },
          },
        },
      },
    })
  })

  it('has_child', () => {
    const result = esBuilder()
      .query('has_child', 'type', 'blog_tag', q => {
        return q.query('term', 'tag', 'something')
      })
      .build()

    expect(result).toEqual({
      query: {
        has_child: {
          type: 'blog_tag',
          query: {
            term: {tag: 'something'},
          },
        },
      },
    })
  })

  it('has_parent', () => {
    const result = esBuilder()
      .query('has_parent', 'parent_tag', 'blog', q => {
        return q.query('term', 'tag', 'something')
      })
      .build()

    expect(result).toEqual({
      query: {
        has_parent: {
          parent_tag: 'blog',
          query: {
            term: {tag: 'something'},
          },
        },
      },
    })
  })

  it('geo_bounding_box', () => {
    const result = esBuilder()
      .query('geo_bounding_box', {
        'pin.location': {top_left: {lat: 40, lon: -74}, bottom_right: {lat: 40, lon: -74}},
        relation: 'within',
      })
      .build()

    expect(result).toEqual({
      query: {
        geo_bounding_box: {
          relation: 'within',
          'pin.location': {
            top_left: {lat: 40, lon: -74},
            bottom_right: {lat: 40, lon: -74},
          },
        },
      },
    })
  })

  it('geo_distance', () => {
    const result = esBuilder()
      .query('geo_distance', {
        'pin.location': {
          lat: 40,
          lon: -74,
        },
        distance: '200km',
      })
      .build()

    expect(result).toEqual({
      query: {
        geo_distance: {
          distance: '200km',
          'pin.location': {
            lat: 40,
            lon: -74,
          },
        },
      },
    })
  })

  it('geo_distance_range', () => {
    const result = esBuilder()
      .query('geo_distance_range', {
        'pin.location': {lat: 40, lon: -74},
        from: '100km',
        to: '200km',
      })
      .build()

    expect(result).toEqual({
      query: {
        geo_distance_range: {
          from: '100km',
          to: '200km',
          'pin.location': {
            lat: 40,
            lon: -74,
          },
        },
      },
    })
  })

  it('geo_polygon', () => {
    const result = esBuilder()
      .query('geo_polygon', 'person.location', {
        points: [
          {lat: 40, lon: -70},
          {lat: 30, lon: -80},
          {lat: 20, lon: -90},
        ],
      })
      .build()

    expect(result).toEqual({
      query: {
        geo_polygon: {
          'person.location': {
            points: [
              {lat: 40, lon: -70},
              {lat: 30, lon: -80},
              {lat: 20, lon: -90},
            ],
          },
        },
      },
    })
  })

  it('geohash_cell', () => {
    const result = esBuilder()
      .query('geohash_cell', {
        pin: {lat: 13.408, lon: 52.5186},
        precision: 3,
        neighbors: true,
      })
      .build()

    expect(result).toEqual({
      query: {
        geohash_cell: {
          pin: {
            lat: 13.408,
            lon: 52.5186,
          },
          precision: 3,
          neighbors: true,
        },
      },
    })
  })

  it('more_like_this', () => {
    const result = esBuilder()
      .query('more_like_this', {
        fields: ['title', 'description'],
        like: 'Once upon a time',
        min_term_freq: 1,
        max_query_terms: 12,
      })
      .build()

    expect(result).toEqual({
      query: {
        more_like_this: {
          fields: ['title', 'description'],
          like: 'Once upon a time',
          min_term_freq: 1,
          max_query_terms: 12,
        },
      },
    })
  })

  it('template', () => {
    const result = esBuilder()
      .query('template', {
        inline: {match: {text: '{{query_string}}'}},
        params: {
          query_string: 'all about search',
        },
      })
      .build()

    expect(result).toEqual({
      query: {
        template: {
          inline: {match: {text: '{{query_string}}'}},
          params: {
            query_string: 'all about search',
          },
        },
      },
    })
  })

  it('script', () => {
    const result = esBuilder()
      .query('script', 'script', {
        inline: "doc['num1'].value > 1",
        lang: 'painless',
      })
      .build()

    expect(result).toEqual({
      query: {
        script: {
          script: {
            inline: "doc['num1'].value > 1",
            lang: 'painless',
          },
        },
      },
    })
  })

  it('minimum_should_match with one query ignores minimum', () => {
    const result = esBuilder()
      .orQuery('term', 'status', 'alert')
      .queryMinimumShouldMatch(2)
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          should: {
            term: {
              status: 'alert',
            },
          },
        },
      },
    })
  })

  it('minimum_should_match with multiple combination', () => {
    const result = esBuilder()
      .orQuery('term', 'status', 'alert')
      .orQuery('term', 'status', 'normal')
      .queryMinimumShouldMatch('2<-25% 9<-3')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          should: [
            {
              term: {
                status: 'alert',
              },
            },
            {
              term: {
                status: 'normal',
              },
            },
          ],
          minimum_should_match: '2<-25% 9<-3',
        },
      },
    })
  })

  it('minimum_should_match with multiple queries', () => {
    const result = esBuilder()
      .orQuery('term', 'status', 'alert')
      .orQuery('term', 'status', 'normal')
      .queryMinimumShouldMatch(2)
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          should: [
            {
              term: {
                status: 'alert',
              },
            },
            {
              term: {
                status: 'normal',
              },
            },
          ],
          minimum_should_match: 2,
        },
      },
    })
  })
})
