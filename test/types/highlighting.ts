/**
 * The following query examples were taken from the Elasticsearch documentation
 */

import {SearchBody} from '../../src'

// @ts-ignore
let body: SearchBody // eslint-disable-line @typescript-eslint/no-unused-vars

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    number_of_fragments: 3,
    fragment_size: 150,
    fields: {
      _all: {pre_tags: ['<em>'], post_tags: ['</em>']},
      'blog.title': {number_of_fragments: 0},
      'blog.author': {number_of_fragments: 0},
      'blog.comment': {number_of_fragments: 5, order: 'score'},
    },
  },
}

body = {
  stored_fields: ['_id'],
  query: {
    match: {
      comment: {
        query: 'foo bar',
      },
    },
  },
  rescore: {
    window_size: 50,
    query: {
      rescore_query: {
        match_phrase: {
          comment: {
            query: 'foo bar',
            slop: 1,
          },
        },
      },
      rescore_query_weight: 10,
    },
  },
  highlight: {
    order: 'score',
    fields: {
      comment: {
        fragment_size: 150,
        number_of_fragments: 3,
        highlight_query: {
          bool: {
            must: {
              match: {
                comment: {
                  query: 'foo bar',
                },
              },
            },
            should: {
              match_phrase: {
                comment: {
                  query: 'foo bar',
                  slop: 1,
                  boost: 10.0,
                },
              },
            },
            minimum_should_match: 0,
          },
        },
      },
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    fields: {
      comment: {type: 'plain'},
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    pre_tags: ['<tag1>'],
    post_tags: ['</tag1>'],
    fields: {
      _all: {},
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    pre_tags: ['<tag1>', '<tag2>'],
    post_tags: ['</tag1>', '</tag2>'],
    fields: {
      _all: {},
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    tags_schema: 'styled',
    fields: {
      comment: {},
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    fields: {
      comment: {force_source: true},
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    require_field_match: false,
    fields: {
      _all: {pre_tags: ['<em>'], post_tags: ['</em>']},
    },
  },
}

body = {
  query: {
    query_string: {
      query: 'comment.plain:running scissors',
      fields: ['comment'],
    },
  },
  highlight: {
    order: 'score',
    fields: {
      comment: {
        matched_fields: ['comment', 'comment.plain'],
        type: 'fvh',
      },
    },
  },
}

body = {
  query: {
    query_string: {
      query: 'running scissors',
      fields: ['comment', 'comment.plain^10'],
    },
  },
  highlight: {
    order: 'score',
    fields: {
      comment: {
        matched_fields: ['comment', 'comment.plain'],
        type: 'fvh',
      },
    },
  },
}

body = {
  query: {
    query_string: {
      query: 'running scissors',
      fields: ['comment', 'comment.plain^10'],
    },
  },
  highlight: {
    order: 'score',
    fields: {
      comment: {
        matched_fields: ['comment.plain'],
        type: 'fvh',
      },
    },
  },
}

body = {
  highlight: {
    fields: [{title: {}}, {text: {}}],
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    fields: {
      comment: {fragment_size: 150, number_of_fragments: 3},
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    order: 'score',
    fields: {
      comment: {fragment_size: 150, number_of_fragments: 3},
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    fields: {
      _all: {},
      'blog.title': {number_of_fragments: 0},
    },
  },
}

body = {
  query: {
    match: {user: 'kimchy'},
  },
  highlight: {
    fields: {
      comment: {
        fragment_size: 150,
        number_of_fragments: 3,
        no_match_size: 150,
      },
    },
  },
}

body = {
  query: {
    match_phrase: {message: 'number 1'},
  },
  highlight: {
    fields: {
      message: {
        type: 'plain',
        fragment_size: 15,
        number_of_fragments: 3,
        fragmenter: 'simple',
      },
    },
  },
}

body = {
  query: {
    match_phrase: {message: 'number 1'},
  },
  highlight: {
    fields: {
      message: {
        type: 'plain',
        fragment_size: 15,
        number_of_fragments: 3,
        fragmenter: 'span',
      },
    },
  },
}
