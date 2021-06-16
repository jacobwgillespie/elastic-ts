# ✨ elastic-ts

[![Build Status](https://travis-ci.org/jacobwgillespie/elastic-ts.svg?branch=master)](https://travis-ci.org/jacobwgillespie/elastic-ts)
![Status: Alpha](https://img.shields.io/badge/status-alpha-red.svg)
[![npm](https://img.shields.io/npm/dm/elastic-ts.svg)](https://www.npmjs.com/package/elastic-ts)
[![npm](https://img.shields.io/npm/v/elastic-ts.svg)](https://www.npmjs.com/package/elastic-ts)
![Powered by TypeScript](https://img.shields.io/badge/powered%20by-typescript-blue.svg)

A TypeScript module for working with Elasticsearch.

### Goals

- Provide TypeScript types for Elasticsearch queries
- Provide a typed query body builder with an immutable API

### Non-goals

- Replace the official Elasticsearch API client

## Requirements

- TypeScript 2.8 - this project uses conditional types which were introduced in TypeScript 2.8

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
import {esBuilder} from 'elastic-ts'

const body = esBuilder()
  .query('match_all', {})
  .filter('terms', 'field', ['one', 'two'])
  .build()
```

### Credits

The query builder API is heavily inspired by [bodybuilder](https://github.com/danpaz/bodybuilder), although there are subtle API and behavioral differences.

### Contributing

You can build the project by running `yarn build`, or can be continuously built with `yarn watch`. Tests are executed by running `yarn test`.

**NOTE:** the tests run against the _built_ output files, so you will need to run `yarn build` or `yarn watch` before running `yarn test`.

### License

The MIT license. See `LICENSE`.
