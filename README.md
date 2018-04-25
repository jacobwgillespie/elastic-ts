# ✨ elastic-ts

[![Build Status](https://travis-ci.org/jacobwgillespie/elastic-ts.svg?branch=master)](https://travis-ci.org/jacobwgillespie/elastic-ts)
![Status: Alpha](https://img.shields.io/badge/status-alpha-red.svg)
[![npm](https://img.shields.io/npm/dm/elastic-ts.svg)](https://www.npmjs.com/package/elastic-ts)
[![npm](https://img.shields.io/npm/v/elastic-ts.svg)](https://www.npmjs.com/package/elastic-ts)
![Powered by TypeScript](https://img.shields.io/badge/powered%20by-typescript-blue.svg)

A TypeScript module for working with Elasticsearch.

### Goals

* Provide TypeScript types for Elasticsearch queries
* Provide a typed query body builder with an immutable API

### Non-goals

* Replace the official Elasticsearch API client

## Installation

```
yarn add elastic-ts
```

## Usage

### Types

```typescript
import {SearchBody} from 'elastic-ts'

const body: SearchBody = {
  query: {
    match_all: {},
  },
}
```

### Builder

```typescript
import {elasticBuilder} from 'elastic-ts'

const body = elasticBuilder()
  .query('match_all', {})
  .filter('terms', 'field', ['one', 'two'])
  .build()
```

### Credits

The query builder API is heavily inspired by [bodybuilder](https://github.com/danpaz/bodybuilder), although there are subtle API and behavioral differences.

### License

The MIT license. Copyright (c) 2018 Jacob Gillespie. See `LICENSE`.

Code from Bodybuilder Copyright (c) 2016 Daniel Paz-Soldan.
