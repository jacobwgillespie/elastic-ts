/**
 * The following query examples were taken from the Elasticsearch documentation
 */

import {SearchBody} from '../../src'

// @ts-ignore
let body: SearchBody // eslint-disable-line @typescript-eslint/no-unused-vars

// ******************************************
// * Match all query                        *
// ******************************************

// Match All Query

body = {
  query: {
    match_all: {},
  },
}

body = {
  query: {
    match_all: {boost: 1.2},
  },
}

// Match None Query

body = {
  query: {
    match_none: {},
  },
}

// ******************************************
// * Full text queries                      *
// ******************************************

// Match Query

body = {
  query: {
    match: {
      message: 'this is a test',
    },
  },
}

body = {
  query: {
    match: {
      message: {
        query: 'this is a test',
        operator: 'and',
      },
    },
  },
}

body = {
  query: {
    match: {
      message: {
        query: 'to be or not to be',
        operator: 'and',
        zero_terms_query: 'all',
      },
    },
  },
}

body = {
  query: {
    match: {
      message: {
        query: 'to be or not to be',
        cutoff_frequency: 0.001,
      },
    },
  },
}

body = {
  query: {
    match: {
      message: {
        query: 'ny city',
        auto_generate_synonyms_phrase_query: false,
      },
    },
  },
}

// Match Phrase Query

body = {
  query: {
    match_phrase: {
      message: 'this is a test',
    },
  },
}

body = {
  query: {
    match_phrase: {
      message: {
        query: 'this is a test',
        analyzer: 'my_analyzer',
      },
    },
  },
}

// Match Phrase Prefix Query

body = {
  query: {
    match_phrase_prefix: {
      message: 'quick brown f',
    },
  },
}

body = {
  query: {
    match_phrase_prefix: {
      message: {
        query: 'quick brown f',
        max_expansions: 10,
      },
    },
  },
}

// Multi Match Query

body = {
  query: {
    multi_match: {
      query: 'this is a test',
      fields: ['subject', 'message'],
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'Will Smith',
      fields: ['title', '*_name'],
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'this is a test',
      fields: ['subject^3', 'message'],
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'brown fox',
      type: 'best_fields',
      fields: ['subject', 'message'],
      tie_breaker: 0.3,
    },
  },
}

body = {
  query: {
    dis_max: {
      queries: [{match: {subject: 'brown fox'}}, {match: {message: 'brown fox'}}],
      tie_breaker: 0.3,
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'Will Smith',
      type: 'best_fields',
      fields: ['first_name', 'last_name'],
      operator: 'and',
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'quick brown fox',
      type: 'most_fields',
      fields: ['title', 'title.original', 'title.shingles'],
    },
  },
}

body = {
  query: {
    bool: {
      should: [
        {match: {title: 'quick brown fox'}},
        {match: {'title.original': 'quick brown fox'}},
        {match: {'title.shingles': 'quick brown fox'}},
      ],
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'quick brown f',
      type: 'phrase_prefix',
      fields: ['subject', 'message'],
    },
  },
}

body = {
  query: {
    dis_max: {
      queries: [{match_phrase_prefix: {subject: 'quick brown f'}}, {match_phrase_prefix: {message: 'quick brown f'}}],
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'Will Smith',
      type: 'cross_fields',
      fields: ['first_name', 'last_name'],
      operator: 'and',
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'Jon',
      type: 'cross_fields',
      fields: ['first', 'first.edge', 'last', 'last.edge'],
    },
  },
}

body = {
  query: {
    bool: {
      should: [
        {
          multi_match: {
            query: 'Will Smith',
            type: 'cross_fields',
            fields: ['first', 'last'],
            minimum_should_match: '50%',
          },
        },
        {
          multi_match: {
            query: 'Will Smith',
            type: 'cross_fields',
            fields: ['*.edge'],
          },
        },
      ],
    },
  },
}

body = {
  query: {
    multi_match: {
      query: 'Jon',
      type: 'cross_fields',
      analyzer: 'standard',
      fields: ['first', 'last', '*.edge'],
    },
  },
}

// Common Terms Query

body = {
  query: {
    common: {
      body: {
        query: 'this is bonsai cool',
        cutoff_frequency: 0.001,
      },
    },
  },
}

body = {
  query: {
    common: {
      body: {
        query: 'nelly the elephant as a cartoon',
        cutoff_frequency: 0.001,
        low_freq_operator: 'and',
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: [{term: {body: 'nelly'}}, {term: {body: 'elephant'}}, {term: {body: 'cartoon'}}],
      should: [{term: {body: 'the'}}, {term: {body: 'as'}}, {term: {body: 'a'}}],
    },
  },
}

body = {
  query: {
    common: {
      body: {
        query: 'nelly the elephant as a cartoon',
        cutoff_frequency: 0.001,
        minimum_should_match: 2,
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        bool: {
          should: [{term: {body: 'nelly'}}, {term: {body: 'elephant'}}, {term: {body: 'cartoon'}}],
          minimum_should_match: 2,
        },
      },
      should: [{term: {body: 'the'}}, {term: {body: 'as'}}, {term: {body: 'a'}}],
    },
  },
}

body = {
  query: {
    common: {
      body: {
        query: 'nelly the elephant not as a cartoon',
        cutoff_frequency: 0.001,
        minimum_should_match: {
          low_freq: 2,
          high_freq: 3,
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        bool: {
          should: [{term: {body: 'nelly'}}, {term: {body: 'elephant'}}, {term: {body: 'cartoon'}}],
          minimum_should_match: 2,
        },
      },
      should: {
        bool: {
          should: [{term: {body: 'the'}}, {term: {body: 'not'}}, {term: {body: 'as'}}, {term: {body: 'a'}}],
          minimum_should_match: 3,
        },
      },
    },
  },
}

body = {
  query: {
    common: {
      body: {
        query: 'how not to be',
        cutoff_frequency: 0.001,
        minimum_should_match: {
          low_freq: 2,
          high_freq: 3,
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      should: [{term: {body: 'how'}}, {term: {body: 'not'}}, {term: {body: 'to'}}, {term: {body: 'be'}}],
      minimum_should_match: '3<50%',
    },
  },
}

// Query String Query

body = {
  query: {
    query_string: {
      default_field: 'content',
      query: 'this AND that OR thus',
    },
  },
}

body = {
  query: {
    query_string: {
      default_field: 'content',
      query: '(new york city) OR (big apple)',
    },
  },
}

body = {
  query: {
    query_string: {
      fields: ['content', 'name'],
      query: 'this AND that',
    },
  },
}

body = {
  query: {
    query_string: {
      query: '(content:this OR name:this) AND (content:that OR name:that)',
    },
  },
}

body = {
  query: {
    query_string: {
      fields: ['content', 'name^5'],
      query: 'this AND that OR thus',
      tie_breaker: 0,
    },
  },
}

body = {
  query: {
    query_string: {
      fields: ['city.*'],
      query: 'this AND that OR thus',
    },
  },
}

body = {
  query: {
    query_string: {
      query: 'city.\\*:(this AND that OR thus)',
    },
  },
}

body = {
  query: {
    query_string: {
      fields: ['content', 'name.*^5'],
      query: 'this AND that OR thus',
    },
  },
}

body = {
  query: {
    query_string: {
      default_field: 'title',
      query: 'ny city',
      auto_generate_synonyms_phrase_query: false,
    },
  },
}

// Simple Query String Query

body = {
  query: {
    simple_query_string: {
      query: '"fried eggs" +(eggplant | potato) -frittata',
      fields: ['title^5', 'body'],
      default_operator: 'and',
    },
  },
}

body = {
  query: {
    simple_query_string: {
      fields: ['content'],
      query: 'foo bar -baz',
    },
  },
}

body = {
  query: {
    simple_query_string: {
      fields: ['content', 'name.*^5'],
      query: 'foo bar baz',
    },
  },
}

body = {
  query: {
    simple_query_string: {
      query: 'foo | bar + baz*',
      flags: 'OR|AND|PREFIX',
    },
  },
}

body = {
  query: {
    simple_query_string: {
      query: 'ny city',
      auto_generate_synonyms_phrase_query: false,
    },
  },
}

// ******************************************
// * Term level queries                     *
// ******************************************

// Term Query

body = {
  query: {
    term: {user: 'Kimchy'},
  },
}

body = {
  query: {
    bool: {
      should: [
        {
          term: {
            status: {
              value: 'urgent',
              boost: 2.0,
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
}

body = {
  query: {
    terms: {user: ['kimchy', 'elasticsearch']},
  },
}

body = {
  query: {
    terms: {
      user: {
        index: 'users',
        type: '_doc',
        id: '2',
        path: 'followers',
      },
    },
  },
}

// Terms Set Query

body = {
  query: {
    terms_set: {
      codes: {
        terms: ['abc', 'def', 'ghi'],
        minimum_should_match_field: 'required_matches',
      },
    },
  },
}

body = {
  query: {
    terms_set: {
      codes: {
        terms: ['abc', 'def', 'ghi'],
        minimum_should_match_script: {
          source: "Math.min(params.num_terms, doc['required_matches'].value)",
        },
      },
    },
  },
}

// Range Query

body = {
  query: {
    range: {
      age: {
        gte: 10,
        lte: 20,
        boost: 2.0,
      },
    },
  },
}

body = {
  query: {
    range: {
      date: {
        gte: 'now-1d/d',
        lt: 'now/d',
      },
    },
  },
}

body = {
  query: {
    range: {
      born: {
        gte: '01/01/2012',
        lte: '2013',
        format: 'dd/MM/yyyy||yyyy',
      },
    },
  },
}

body = {
  query: {
    range: {
      timestamp: {
        gte: '2015-01-01 00:00:00',
        lte: 'now',
        time_zone: '+01:00',
      },
    },
  },
}

// Exists Query

body = {
  query: {
    exists: {field: 'user'},
  },
}

body = {
  query: {
    bool: {
      must_not: {
        exists: {
          field: 'user',
        },
      },
    },
  },
}

// Prefix Query

body = {
  query: {
    prefix: {user: 'ki'},
  },
}

body = {
  query: {
    prefix: {user: {value: 'ki', boost: 2.0}},
  },
}

// Wildcard Query

body = {
  query: {
    wildcard: {user: 'ki*y'},
  },
}

body = {
  query: {
    wildcard: {user: {value: 'ki*y', boost: 2.0}},
  },
}

body = {
  query: {
    wildcard: {user: {wildcard: 'ki*y', boost: 2.0}},
  },
}

// Regexp Query

body = {
  query: {
    regexp: {
      'name.first': 's.*y',
    },
  },
}

body = {
  query: {
    regexp: {
      'name.first': {
        value: 's.*y',
        boost: 1.2,
      },
    },
  },
}

body = {
  query: {
    regexp: {
      'name.first': {
        value: 's.*y',
        flags: 'INTERSECTION|COMPLEMENT|EMPTY',
      },
    },
  },
}

body = {
  query: {
    regexp: {
      'name.first': {
        value: 's.*y',
        flags: 'INTERSECTION|COMPLEMENT|EMPTY',
        max_determinized_states: 20000,
      },
    },
  },
}

// Fuzzy Query

body = {
  query: {
    fuzzy: {user: 'ki'},
  },
}

body = {
  query: {
    fuzzy: {
      user: {
        value: 'ki',
        boost: 1.0,
        fuzziness: 2,
        prefix_length: 0,
        max_expansions: 100,
      },
    },
  },
}

// Type Query

body = {
  query: {
    type: {
      value: '_doc',
    },
  },
}

// Ids Query

body = {
  query: {
    ids: {
      type: '_doc',
      values: ['1', '4', '100'],
    },
  },
}

// ******************************************
// * Compound queries                       *
// ******************************************

// Constant Score Query

body = {
  query: {
    constant_score: {
      filter: {
        term: {user: 'kimchy'},
      },
      boost: 1.2,
    },
  },
}

// Bool Query

body = {
  query: {
    bool: {
      must: {
        term: {user: 'kimchy'},
      },
      filter: {
        term: {tag: 'tech'},
      },
      must_not: {
        range: {
          age: {gte: 10, lte: 20},
        },
      },
      should: [{term: {tag: 'wow'}}, {term: {tag: 'elasticsearch'}}],
      minimum_should_match: 1,
      boost: 1.0,
    },
  },
}

body = {
  query: {
    bool: {
      filter: {
        term: {
          status: 'active',
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        term: {
          status: 'active',
        },
      },
    },
  },
}

body = {
  query: {
    constant_score: {
      filter: {
        term: {
          status: 'active',
        },
      },
    },
  },
}

// Dis Max Query

body = {
  query: {
    dis_max: {
      tie_breaker: 0.7,
      boost: 1.2,
      queries: [
        {
          term: {age: 34},
        },
        {
          term: {age: 35},
        },
      ],
    },
  },
}

// Function Score Query

body = {
  query: {
    function_score: {
      query: {match_all: {}},
      boost: '5',
      random_score: {},
      boost_mode: 'multiply',
    },
  },
}

body = {
  query: {
    function_score: {
      query: {match_all: {}},
      boost: '5',
      functions: [
        {
          filter: {match: {test: 'bar'}},
          random_score: {},
          weight: 23,
        },
        {
          filter: {match: {test: 'cat'}},
          weight: 42,
        },
      ],
      max_boost: 42,
      score_mode: 'max',
      boost_mode: 'multiply',
      min_score: 42,
    },
  },
}

body = {
  query: {
    function_score: {
      query: {
        match: {message: 'elasticsearch'},
      },
      script_score: {
        script: {
          source: "Math.log(2 + doc['likes'].value)",
        },
      },
    },
  },
}

body = {
  query: {
    function_score: {
      query: {
        match: {message: 'elasticsearch'},
      },
      script_score: {
        script: {
          params: {
            a: 5,
            b: 1.2,
          },
          source: "params.a / Math.pow(params.b, doc['likes'].value)",
        },
      },
    },
  },
}

body = {
  query: {
    function_score: {
      random_score: {
        seed: 10,
        field: '_seq_no',
      },
    },
  },
}

body = {
  query: {
    function_score: {
      field_value_factor: {
        field: 'likes',
        factor: 1.2,
        modifier: 'sqrt',
        missing: 1,
      },
    },
  },
}

body = {
  query: {
    function_score: {
      gauss: {
        date: {
          origin: '2013-09-17',
          scale: '10d',
          offset: '5d',
          decay: 0.5,
        },
      },
    },
  },
}

body = {
  query: {
    function_score: {
      functions: [
        {
          gauss: {
            price: {
              origin: '0',
              scale: '20',
            },
          },
        },
        {
          gauss: {
            location: {
              origin: '11, 12',
              scale: '2km',
            },
          },
        },
      ],
      query: {
        match: {
          properties: 'balcony',
        },
      },
      score_mode: 'multiply',
    },
  },
}

// Boosting Query

body = {
  query: {
    boosting: {
      positive: {
        term: {
          field1: 'value1',
        },
      },
      negative: {
        term: {
          field2: 'value2',
        },
      },
      negative_boost: 0.2,
    },
  },
}

// ******************************************
// * Joining queries                        *
// ******************************************

// Nested Query

body = {
  query: {
    nested: {
      path: 'obj1',
      score_mode: 'avg',
      query: {
        bool: {
          must: [{match: {'obj1.name': 'blue'}}, {range: {'obj1.count': {gt: 5}}}],
        },
      },
    },
  },
}

// Has Child Query

body = {
  query: {
    has_child: {
      type: 'blog_tag',
      query: {
        term: {
          tag: 'something',
        },
      },
    },
  },
}

body = {
  query: {
    has_child: {
      type: 'blog_tag',
      score_mode: 'min',
      query: {
        term: {
          tag: 'something',
        },
      },
    },
  },
}

body = {
  query: {
    has_child: {
      type: 'blog_tag',
      score_mode: 'min',
      min_children: 2,
      max_children: 10,
      query: {
        term: {
          tag: 'something',
        },
      },
    },
  },
}

body = {
  query: {
    has_child: {
      type: 'blog_tag',
      score_mode: 'max',
      query: {
        function_score: {
          script_score: {
            script: "_score * doc['click_count'].value",
          },
        },
      },
    },
  },
}

// Has Parent Query

body = {
  query: {
    has_parent: {
      parent_type: 'blog',
      query: {
        term: {
          tag: 'something',
        },
      },
    },
  },
}

body = {
  query: {
    has_parent: {
      parent_type: 'blog',
      score: true,
      query: {
        term: {
          tag: 'something',
        },
      },
    },
  },
}

body = {
  query: {
    has_parent: {
      parent_type: 'blog',
      score: true,
      query: {
        function_score: {
          script_score: {
            script: "_score * doc['view_count'].value",
          },
        },
      },
    },
  },
}

// Parent Id Query

body = {
  query: {
    parent_id: {
      type: 'my_child',
      id: '1',
    },
  },
}

// ******************************************
// * Geo queries                            *
// ******************************************

// GeoShape Query

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_shape: {
          location: {
            shape: {
              type: 'envelope',
              coordinates: [
                [13.0, 53.0],
                [14.0, 52.0],
              ],
            },
            relation: 'within',
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      filter: {
        geo_shape: {
          location: {
            indexed_shape: {
              index: 'shapes',
              type: '_doc',
              id: 'deu',
              path: 'location',
            },
          },
        },
      },
    },
  },
}

// Geo Bounding Box Query

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_bounding_box: {
          'pin.location': {
            top_left: {
              lat: 40.73,
              lon: -74.1,
            },
            bottom_right: {
              lat: 40.01,
              lon: -71.12,
            },
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_bounding_box: {
          'pin.location': {
            top_left: {
              lat: 40.73,
              lon: -74.1,
            },
            bottom_right: {
              lat: 40.01,
              lon: -71.12,
            },
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_bounding_box: {
          'pin.location': {
            top_left: [-74.1, 40.73],
            bottom_right: [-71.12, 40.01],
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_bounding_box: {
          'pin.location': {
            top_left: '40.73, -74.1',
            bottom_right: '40.01, -71.12',
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_bounding_box: {
          'pin.location': {
            wkt: 'BBOX (-74.1, -71.12, 40.73, 40.01)',
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_bounding_box: {
          'pin.location': {
            top_left: 'dr5r9ydj2y73',
            bottom_right: 'drj7teegpus6',
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_bounding_box: {
          'pin.location': {
            top: 40.73,
            left: -74.1,
            bottom: 40.01,
            right: -71.12,
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_bounding_box: {
          'pin.location': {
            top_left: {
              lat: 40.73,
              lon: -74.1,
            },
            bottom_right: {
              lat: 40.1,
              lon: -71.12,
            },
          },
          type: 'indexed',
        },
      },
    },
  },
}

// Geo Distance Query

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_distance: {
          distance: '200km',
          'pin.location': {
            lat: 40,
            lon: -70,
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_distance: {
          distance: '12km',
          'pin.location': {
            lat: 40,
            lon: -70,
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_distance: {
          distance: '12km',
          'pin.location': [-70, 40],
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_distance: {
          distance: '12km',
          'pin.location': '40,-70',
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_distance: {
          distance: '12km',
          'pin.location': 'drm3btev3e86',
        },
      },
    },
  },
}

// Geo Polygon Query

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
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
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_polygon: {
          'person.location': {
            points: [
              [-70, 40],
              [-80, 30],
              [-90, 20],
            ],
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_polygon: {
          'person.location': {
            points: ['40, -70', '30, -80', '20, -90'],
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        match_all: {},
      },
      filter: {
        geo_polygon: {
          'person.location': {
            points: ['drn5x1g8cu2y', '30, -80', '20, -90'],
          },
        },
      },
    },
  },
}

// ******************************************
// * Specialized queries                    *
// ******************************************

// More Like This Query

body = {
  query: {
    more_like_this: {
      fields: ['title', 'description'],
      like: 'Once upon a time',
      min_term_freq: 1,
      max_query_terms: 12,
    },
  },
}

body = {
  query: {
    more_like_this: {
      fields: ['title', 'description'],
      like: [
        {
          _index: 'imdb',
          _type: 'movies',
          _id: '1',
        },
        {
          _index: 'imdb',
          _type: 'movies',
          _id: '2',
        },
        'and potentially some more text here as well',
      ],
      min_term_freq: 1,
      max_query_terms: 12,
    },
  },
}

body = {
  query: {
    more_like_this: {
      fields: ['name.first', 'name.last'],
      like: [
        {
          _index: 'marvel',
          _type: 'quotes',
          doc: {
            name: {
              first: 'Ben',
              last: 'Grimm',
            },
            _doc: "You got no idea what I'd... what I'd give to be invisible.",
          },
        },
        {
          _index: 'marvel',
          _type: 'quotes',
          _id: '2',
        },
      ],
      min_term_freq: 1,
      max_query_terms: 12,
    },
  },
}

// Script Query

body = {
  query: {
    bool: {
      must: {
        script: {
          script: {
            source: "doc['num1'].value > 1",
            lang: 'painless',
          },
        },
      },
    },
  },
}

body = {
  query: {
    bool: {
      must: {
        script: {
          script: {
            source: "doc['num1'].value > params.param1",
            lang: 'painless',
            params: {
              param1: 5,
            },
          },
        },
      },
    },
  },
}

// Percolate Query

body = {
  query: {
    percolate: {
      field: 'query',
      document: {
        message: 'A new bonsai tree in the office',
      },
    },
  },
}

body = {
  query: {
    constant_score: {
      filter: {
        percolate: {
          field: 'query',
          document: {
            message: 'A new bonsai tree in the office',
          },
        },
      },
    },
  },
}

body = {
  query: {
    percolate: {
      field: 'query',
      documents: [
        {
          message: 'bonsai tree',
        },
        {
          message: 'new tree',
        },
        {
          message: 'the office',
        },
        {
          message: 'office tree',
        },
      ],
    },
  },
}

body = {
  query: {
    percolate: {
      field: 'query',
      index: 'my-index',
      type: '_doc',
      id: '2',
      version: 1,
    },
  },
}

body = {
  query: {
    percolate: {
      field: 'query',
      document: {
        message: 'The quick brown fox jumps over the lazy dog',
      },
    },
  },
  highlight: {
    fields: {
      message: {},
    },
  },
}

body = {
  query: {
    percolate: {
      field: 'query',
      documents: [
        {
          message: 'bonsai tree',
        },
        {
          message: 'new tree',
        },
        {
          message: 'the office',
        },
        {
          message: 'office tree',
        },
      ],
    },
  },
  highlight: {
    fields: {
      message: {},
    },
  },
}

body = {
  query: {
    bool: {
      should: [
        {
          percolate: {
            field: 'query',
            document: {
              message: 'bonsai tree',
            },
            name: 'query1',
          },
        },
        {
          percolate: {
            field: 'query',
            document: {
              message: 'tulip flower',
            },
            name: 'query2',
          },
        },
      ],
    },
  },
}

body = {
  query: {
    term: {
      'query.extraction_result': 'failed',
    },
  },
}

// Wrapper Query

body = {
  query: {
    wrapper: {
      query: 'eyJ0ZXJtIiA6IHsgInVzZXIiIDogIktpbWNoeSIgfX0=',
    },
  },
}

// Rank Feature Query

body = {
  query: {
    bool: {
      must: [
        {
          match: {
            content: '2016',
          },
        },
      ],
      should: [
        {
          rank_feature: {
            field: 'pagerank',
          },
        },
        {
          rank_feature: {
            field: 'url_length',
            boost: 0.1,
          },
        },
        {
          rank_feature: {
            field: 'topics.sports',
            boost: 0.4,
          },
        },
      ],
    },
  },
}

body = {
  query: {
    rank_feature: {
      field: 'pagerank',
      saturation: {
        pivot: 8,
      },
    },
  },
}

body = {
  query: {
    rank_feature: {
      field: 'pagerank',
      saturation: {},
    },
  },
}

body = {
  query: {
    rank_feature: {
      field: 'pagerank',
      log: {
        scaling_factor: 4,
      },
    },
  },
}

body = {
  query: {
    rank_feature: {
      field: 'pagerank',
      sigmoid: {
        pivot: 7,
        exponent: 0.6,
      },
    },
  },
}
