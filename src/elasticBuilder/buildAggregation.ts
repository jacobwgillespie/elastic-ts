import is from '@sindresorhus/is'
import {AggregationArgs, BuilderFn, WithBuilderFns} from './types'
import {PlainObject} from './utils'

/** buildAggregation takes arguments passed to a query or filter and transforms them into a query clause */
export function buildAggregation(args: WithBuilderFns<AggregationArgs>): object {
  switch (args.length) {
    case 3:
      return buildAggregation3(args)
    case 4:
      return buildAggregation4(args)
    case 5:
      return buildAggregation5(args)
    default:
      throw new TypeError('invalid arguments')
  }
}

function buildAggregation3([name, type, fieldOrConfig]: [string, string, string | PlainObject]) {
  if (is.string(fieldOrConfig)) {
    const field = fieldOrConfig
    return {[name]: {[type]: {field}}}
  }

  const config = fieldOrConfig
  return {[name]: {[type]: {...config}}}
}

function buildAggregation4([name, type, fieldOrConfig, configOrBuilder]:
  | [string, string, string, PlainObject | BuilderFn]
  | [string, string, PlainObject, BuilderFn]) {
  if (is.string(fieldOrConfig)) {
    const field = fieldOrConfig

    if (is.function_(configOrBuilder)) {
      const builder = configOrBuilder
      return {[name]: {[type]: {field}, ...builder().build()}}
    }

    const config = configOrBuilder
    return {[name]: {[type]: {field, ...config}}}
  }

  if (is.function_(configOrBuilder)) {
    const config = fieldOrConfig
    const builder = configOrBuilder
    return {[name]: {[type]: {...config}, ...builder().build()}}
  }
  throw new TypeError('invalid arguments')
}

function buildAggregation5([name, type, field, config, builder]: [string, string, string, PlainObject, BuilderFn]) {
  return {[name]: {[type]: {field, ...config}, ...builder().build()}}
}
