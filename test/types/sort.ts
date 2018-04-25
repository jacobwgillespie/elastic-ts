/**
 * The following query examples were taken from the Elasticsearch documentation
 */

import {SearchBody} from '../../src'

// @ts-ignore
let body: SearchBody // eslint-disable-line @typescript-eslint/no-unused-vars

body = {
  sort: [{post_date: {order: 'asc'}}, 'user', {name: 'desc'}, {age: 'desc'}, '_score'],
  query: {
    term: {user: 'kimchy'},
  },
}

body = {
  query: {
    term: {product: 'chocolate'},
  },
  sort: [{price: {order: 'asc', mode: 'avg'}}],
}

body = {
  query: {
    term: {product: 'chocolate'},
  },
  sort: [
    {
      'offer.price': {
        mode: 'avg',
        order: 'asc',
        nested: {
          path: 'offer',
          filter: {
            term: {'offer.color': 'blue'},
          },
        },
      },
    },
  ],
}

body = {
  query: {
    nested: {
      path: 'parent',
      query: {
        bool: {
          must: {range: {'parent.age': {gte: 21}}},
          filter: {
            nested: {
              path: 'parent.child',
              query: {match: {'parent.child.name': 'matt'}},
            },
          },
        },
      },
    },
  },
  sort: [
    {
      'parent.child.age': {
        mode: 'min',
        order: 'asc',
        nested: {
          path: 'parent',
          filter: {
            range: {'parent.age': {gte: 21}},
          },
          nested: {
            path: 'parent.child',
            filter: {
              match: {'parent.child.name': 'matt'},
            },
          },
        },
      },
    },
  ],
}

body = {
  sort: [{price: {missing: '_last'}}],
  query: {
    term: {product: 'chocolate'},
  },
}

body = {
  sort: [{price: {unmapped_type: 'long'}}],
  query: {
    term: {product: 'chocolate'},
  },
}

body = {
  sort: [
    {
      _geo_distance: {
        'pin.location': [-70, 40],
        order: 'asc',
        unit: 'km',
        mode: 'min',
        distance_type: 'arc',
      },
    },
  ],
  query: {
    term: {user: 'kimchy'},
  },
}

body = {
  sort: [
    {
      _geo_distance: {
        'pin.location': {
          lat: 40,
          lon: -70,
        },
        order: 'asc',
        unit: 'km',
      },
    },
  ],
  query: {
    term: {user: 'kimchy'},
  },
}

body = {
  sort: [
    {
      _geo_distance: {
        'pin.location': '40,-70',
        order: 'asc',
        unit: 'km',
      },
    },
  ],
  query: {
    term: {user: 'kimchy'},
  },
}

body = {
  sort: [
    {
      _geo_distance: {
        'pin.location': 'drm3btev3e86',
        order: 'asc',
        unit: 'km',
      },
    },
  ],
  query: {
    term: {user: 'kimchy'},
  },
}

body = {
  sort: [
    {
      _geo_distance: {
        'pin.location': [-70, 40],
        order: 'asc',
        unit: 'km',
      },
    },
  ],
  query: {
    term: {user: 'kimchy'},
  },
}

body = {
  sort: [
    {
      _geo_distance: {
        'pin.location': [
          [-70, 40],
          [-71, 42],
        ],
        order: 'asc',
        unit: 'km',
      },
    },
  ],
  query: {
    term: {user: 'kimchy'},
  },
}

body = {
  query: {
    term: {user: 'kimchy'},
  },
  sort: {
    _script: {
      type: 'number',
      script: {
        lang: 'painless',
        source: "doc['field_name'].value * params.factor",
        params: {
          factor: 1.1,
        },
      },
      order: 'asc',
    },
  },
}

body = {
  track_scores: true,
  sort: [{post_date: {order: 'desc'}}, {name: 'desc'}, {age: 'desc'}],
  query: {
    term: {user: 'kimchy'},
  },
}
