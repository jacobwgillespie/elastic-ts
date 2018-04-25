import is from '@sindresorhus/is'
import {BuilderFn, FilterArgs, QueryArgs, QueryData, WithBuilderFns} from './types'
import {PlainObject, Primitive} from './utils'

/** buildClause takes arguments passed to a query or filter and transforms them into a query clause */
export function buildClause(data: QueryData, args: WithBuilderFns<FilterArgs | QueryArgs>): object {
  switch (args.length) {
    case 1:
      return buildClause1(data, args)
    case 2:
      return buildClause2(args)
    case 3:
      return buildClause3(args)
    case 4:
      return buildClause4(args)
    case 5:
      return buildClause5(args)
    default:
      throw new TypeError('invalid args')
  }
}

function buildClause1(data: QueryData, [builder]: [BuilderFn]) {
  const built = builder().build()
  return (data.parent ? built[data.parent] : built.filter || built.query) || {}
}

function buildClause2([type, fieldOrConfig]: [string, string | object]) {
  if (is.string(fieldOrConfig)) {
    const field = fieldOrConfig
    return {[type]: {field}}
  }

  const config = fieldOrConfig
  return {[type]: {...config}}
}

function buildClause3([type, fieldOrConfig, valueOrConfigOrBuilder]:
  | [string, string, Primitive | Primitive[] | BuilderFn | PlainObject]
  | [string, object, BuilderFn]) {
  if (is.string(fieldOrConfig)) {
    const field = fieldOrConfig

    if (is.function_(valueOrConfigOrBuilder)) {
      const builder = valueOrConfigOrBuilder
      return {[type]: {[field]: builder().build()}}
    }

    if (is.plainObject(valueOrConfigOrBuilder)) {
      const config = valueOrConfigOrBuilder
      return {[type]: {[field]: config}}
    }

    const value = valueOrConfigOrBuilder
    return {[type]: {[field]: value}}
  }

  if (is.function_(valueOrConfigOrBuilder)) {
    const config = fieldOrConfig
    const builder = valueOrConfigOrBuilder
    return {[type]: {...config, ...builder().build()}}
  }

  throw new TypeError('invalid argument')
}

function buildClause4([type, field, value, configOrBuilder]: [
  string,
  string,
  Primitive | Primitive[],
  BuilderFn | PlainObject,
]) {
  if (is.function_(configOrBuilder)) {
    const builder = configOrBuilder
    return {[type]: {[field]: value, ...builder().build()}}
  }

  const config = configOrBuilder
  return {[type]: {[field]: value, ...config}}
}

function buildClause5([type, field, value, config, builder]: [
  string,
  string,
  Primitive | Primitive[],
  PlainObject,
  BuilderFn,
]) {
  return {[type]: {[field]: value, ...config, ...builder().build()}}
}
