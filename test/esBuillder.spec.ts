import {esBuilder} from '../src'

describe('esBuilder', () => {
  it('generates expected queries', () => {
    expect(
      esBuilder()
        .filter('term', 'field', 'value')
        .build(),
    ).toEqual({
      query: {
        bool: {
          filter: {
            term: {
              field: 'value',
            },
          },
        },
      },
    })
  })

  it('should build query with no field', () => {
    const result = esBuilder()
      .query('match_all', {})
      .build()

    expect(result).toEqual({
      query: {
        match_all: {},
      },
    })
  })

  it('should build query with field but no value', () => {
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

  it('should build filter without query', () => {
    const result = esBuilder()
      .filter('term', 'user', 'kimchy')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          filter: {
            term: {
              user: 'kimchy',
            },
          },
        },
      },
    })
  })

  it('should create query and filter', () => {
    const result = esBuilder()
      .query('exists', 'user')
      .filter('term', 'user', 'kimchy')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          must: {
            exists: {
              field: 'user',
            },
          },
          filter: {
            term: {
              user: 'kimchy',
            },
          },
        },
      },
    })
  })

  it('should build a filtered query', () => {
    const result = esBuilder()
      .query('match', 'message', 'this is a test')
      .filter('term', 'user', 'kimchy')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          must: {
            match: {
              message: 'this is a test',
            },
          },
          filter: {
            term: {
              user: 'kimchy',
            },
          },
        },
      },
    })
  })

  it('should sort with default sort direction', () => {
    const result = esBuilder()
      .sort('timestamp')
      .build()

    expect(result).toEqual({
      sort: [
        {
          timestamp: {
            order: 'asc',
          },
        },
      ],
    })
  })

  it('should handle string fields in multi-sort', () => {
    const result = esBuilder()
      .sort([{categories: 'desc'}, {content: 'desc'}, 'content'])
      .build()

    expect(result).toEqual({
      sort: [
        {
          categories: {
            order: 'desc',
          },
        },
        {
          content: {
            order: 'asc',
          },
        },
      ],
    })
  })

  it('should not de-depude _geo_distance', () => {
    const result = esBuilder()
      .sort([
        {
          _geo_distance: {
            'a.pin.location': [-70, 40],
            order: 'asc',
            unit: 'km',
            mode: 'min',
            distance_type: 'sloppy_arc',
          },
        },
        {
          _geo_distance: {
            'b.pin.location': [-70, 40],
            order: 'asc',
            unit: 'km',
            mode: 'min',
            distance_type: 'sloppy_arc',
          },
        },
      ])
      .sort([{categories: 'desc'}, {content: 'desc'}, {content: 'asc'}])
      .build()

    expect(result).toEqual({
      sort: [
        {
          _geo_distance: {
            'a.pin.location': [-70, 40],
            order: 'asc',
            unit: 'km',
            mode: 'min',
            distance_type: 'sloppy_arc',
          },
        },
        {
          _geo_distance: {
            'b.pin.location': [-70, 40],
            order: 'asc',
            unit: 'km',
            mode: 'min',
            distance_type: 'sloppy_arc',
          },
        },
        {
          categories: {
            order: 'desc',
          },
        },
        {
          content: {
            order: 'asc',
          },
        },
      ],
    })
  })

  it('should set from on body', () => {
    const result = esBuilder()
      .from(10)
      .build()

    expect(result).toEqual({
      from: 10,
    })
  })

  it('should set size on body', () => {
    const result = esBuilder()
      .size(10)
      .build()

    expect(result).toEqual({
      size: 10,
    })
  })

  it('should set any key-value on body', () => {
    const result = esBuilder()
      .rawOption('a', {b: 'c'})
      .build()

    expect(result).toEqual({
      a: {b: 'c'},
    })
  })

  it('should build query with field and value', () => {
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

  it('should build query with field and object value', () => {
    const result = esBuilder()
      .query('range', 'date', {gt: 'now-1d'})
      .build()

    expect(result).toEqual({
      query: {
        range: {
          date: {gt: 'now-1d'},
        },
      },
    })
  })

  it('should build query with more options', () => {
    const result = esBuilder()
      .query('geo_distance', {point: {lat: 40, lon: 20}, distance: '12km'})
      .build()

    expect(result).toEqual({
      query: {
        geo_distance: {
          distance: '12km',
          point: {
            lat: 40,
            lon: 20,
          },
        },
      },
    })
  })

  it('should build nested queries', () => {
    const result = esBuilder()
      .query('nested', 'path', 'obj1', q => q.query('match', 'obj1.color', 'blue'))
      .build()

    expect(result).toEqual({
      query: {
        nested: {
          path: 'obj1',
          query: {
            match: {
              'obj1.color': 'blue',
            },
          },
        },
      },
    })
  })

  it('should nest bool-merged queries', () => {
    const result = esBuilder()
      .query('nested', 'path', 'obj1', {score_mode: 'avg'}, q => {
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

  it('should make this chained nested query', () => {
    const result = esBuilder()
      .query('match', 'title', 'eggs')
      .query('nested', 'path', 'comments', {score_mode: 'max'}, q =>
        q.query('match', 'comments.name', 'john').query('match', 'comments.age', 28),
      )
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          must: [
            {
              match: {
                title: 'eggs',
              },
            },
            {
              nested: {
                path: 'comments',
                score_mode: 'max',
                query: {
                  bool: {
                    must: [
                      {
                        match: {
                          'comments.name': 'john',
                        },
                      },
                      {
                        match: {
                          'comments.age': 28,
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    })
  })

  it('should create this complex query', () => {
    const result = esBuilder()
      .query('constant_score', {}, q => {
        return q
          .orFilter('term', 'created_by.user_id', 'abc')
          .orFilter('nested', 'path', 'doc_meta', q2 => {
            return q2.query('constant_score', {}, q3 => {
              return q3.filter('term', 'doc_meta.user_id', 'abc')
            })
          })
          .orFilter('nested', 'path', 'tests', q2 => {
            return q2.query('constant_score', {}, q3 => {
              return q3.filter('term', 'tests.created_by.user_id', 'abc')
            })
          })
      })
      .build()

    expect(result).toEqual({
      query: {
        constant_score: {
          filter: {
            bool: {
              should: [
                {
                  term: {
                    'created_by.user_id': 'abc',
                  },
                },
                {
                  nested: {
                    path: 'doc_meta',
                    query: {
                      constant_score: {
                        filter: {
                          term: {
                            'doc_meta.user_id': 'abc',
                          },
                        },
                      },
                    },
                  },
                },
                {
                  nested: {
                    path: 'tests',
                    query: {
                      constant_score: {
                        filter: {
                          term: {
                            'tests.created_by.user_id': 'abc',
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    })
  })

  it('should combine queries, filters, aggregations', () => {
    const result = esBuilder()
      .query('match', 'message', 'this is a test')
      .filter('term', 'user', 'kimchy')
      .filter('term', 'user', 'herald')
      .orFilter('term', 'user', 'johnny')
      .notFilter('term', 'user', 'cassie')
      .aggregation('agg_terms_user', 'terms', 'user')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          must: {
            match: {
              message: 'this is a test',
            },
          },
          filter: {
            bool: {
              must: [{term: {user: 'kimchy'}}, {term: {user: 'herald'}}],
              should: {term: {user: 'johnny'}},
              must_not: {term: {user: 'cassie'}},
            },
          },
        },
      },
      aggs: {
        agg_terms_user: {
          terms: {
            field: 'user',
          },
        },
      },
    })
  })

  it('should add a not filter', () => {
    const result = esBuilder()
      .notFilter('match', 'message', 'this is a test')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          filter: {
            bool: {
              must_not: {
                match: {
                  message: 'this is a test',
                },
              },
            },
          },
        },
      },
    })
  })

  it('dynamic filter', () => {
    const result = esBuilder()
      .filter('constant_score', {}, f => f.filter('term', 'user', 'kimchy'))
      .filter('term', 'message', 'this is a test')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          filter: {
            bool: {
              must: [
                {
                  constant_score: {
                    filter: {
                      term: {
                        user: 'kimchy',
                      },
                    },
                  },
                },
                {term: {message: 'this is a test'}},
              ],
            },
          },
        },
      },
    })
  })

  it('complex dynamic filter', () => {
    const result = esBuilder()
      .orFilter(f => f.filter('terms', 'tags', ['Popular']).filter('terms', 'brands', ['A', 'B']))
      .orFilter(f => f.filter('terms', 'tags', ['Emerging']).filter('terms', 'brands', ['C']))
      .orFilter(f => f.filter('terms', 'tags', ['Rumor']).filter('terms', 'companies', ['A', 'C', 'D']))
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          filter: {
            bool: {
              should: [
                {
                  bool: {must: [{terms: {tags: ['Popular']}}, {terms: {brands: ['A', 'B']}}]},
                },
                {
                  bool: {must: [{terms: {tags: ['Emerging']}}, {terms: {brands: ['C']}}]},
                },
                {
                  bool: {must: [{terms: {tags: ['Rumor']}}, {terms: {companies: ['A', 'C', 'D']}}]},
                },
              ],
            },
          },
        },
      },
    })
  })

  it('minimum_should_match filter', () => {
    const result = esBuilder()
      .orFilter('term', 'user', 'kimchy')
      .orFilter('term', 'user', 'tony')
      .filterMinimumShouldMatch(2)
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          filter: {
            bool: {
              should: [{term: {user: 'kimchy'}}, {term: {user: 'tony'}}],
              minimum_should_match: 2,
            },
          },
        },
      },
    })
  })

  it('minimum_should_match query', () => {
    const result = esBuilder()
      .orQuery('term', 'user', 'kimchy')
      .orQuery('term', 'user', 'tony')
      .queryMinimumShouldMatch(2)
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          should: [{term: {user: 'kimchy'}}, {term: {user: 'tony'}}],
          minimum_should_match: 2,
        },
      },
    })
  })

  it('minimum_should_match query and filter', () => {
    const result = esBuilder()
      .orQuery('term', 'user', 'kimchy')
      .orQuery('term', 'user', 'tony')
      .orFilter('term', 'user', 'kimchy')
      .orFilter('term', 'user', 'tony')
      .filterMinimumShouldMatch(1)
      .queryMinimumShouldMatch(2)
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          should: [{term: {user: 'kimchy'}}, {term: {user: 'tony'}}],
          minimum_should_match: 2,
          filter: {
            bool: {
              should: [{term: {user: 'kimchy'}}, {term: {user: 'tony'}}],
              minimum_should_match: 1,
            },
          },
        },
      },
    })
  })

  it('Nested bool query with must', () => {
    const result = esBuilder()
      .query(b => b.orQuery('match', 'title', 'Solr').orQuery('match', 'title', 'Elasticsearch'))
      .query('match', 'authors', 'clinton gormely')
      .notQuery('match', 'authors', 'radu gheorge')
      .build()

    expect(result).toEqual({
      query: {
        bool: {
          must: [
            {
              bool: {
                should: [
                  {
                    match: {
                      title: 'Solr',
                    },
                  },
                  {
                    match: {
                      title: 'Elasticsearch',
                    },
                  },
                ],
              },
            },
            {
              match: {
                authors: 'clinton gormely',
              },
            },
          ],
          must_not: {
            match: {
              authors: 'radu gheorge',
            },
          },
        },
      },
    })
  })

  it('Invalid nested bool query with more "query"', () => {
    const body = esBuilder()
      .query(b =>
        b
          .query('term', 'field1', 1)
          .query('term', 'field2', 2)
          .orQuery('term', 'field3', 3),
      )
      .query(b =>
        b
          .query('term', 'field4', 10)
          .query('term', 'field5', 20)
          .orQuery('term', 'field6', 30),
      )
      .build()

    expect(body).toEqual({
      query: {
        bool: {
          must: [
            {
              bool: {
                must: [
                  {
                    term: {
                      field1: 1,
                    },
                  },
                  {
                    term: {
                      field2: 2,
                    },
                  },
                ],
                should: {
                  term: {
                    field3: 3,
                  },
                },
              },
            },
            {
              bool: {
                must: [
                  {
                    term: {
                      field4: 10,
                    },
                  },
                  {
                    term: {
                      field5: 20,
                    },
                  },
                ],
                should: {
                  term: {
                    field6: 30,
                  },
                },
              },
            },
          ],
        },
      },
    })
  })
})
