'use strict';

module.exports = {
  in: inSet,
  nin: notInSet,
  eq: eq,
  neq: neq,
  lt: lt,
  lte: lte,
  gt: gt,
  gte: gte,
  like: like,
  likelower: likelower,
  isnull: isnull,
  notnull: notnull,
  contains: contains,
  contained: contained,
  overlap: overlap,
  relexists: relexists,
  relnotexists: relnotexists,
};

/**
 * @private
 */
function basicWhere(propertyRef, operator, value) {
  return {
    method: 'where',
    args: [propertyRef.fullColumnName(), operator, value],
  };
}

/**
 * @private
 */
function inSet(propertyRef, value) {
  return {
    method: 'whereIn',
    args: [propertyRef.fullColumnName(), value.split(',')],
  };
}

/**
 * @private
 */
function notInSet(propertyRef, value) {
  return {
    method: 'whereNotIn',
    args: [propertyRef.fullColumnName(), value.split(',')]
  }
}

/**
 * @private
 */
function relexists(propertyRef, value) {
  return {
    method: 'whereExists',
    args: [propertyRef.modelClass.relatedQuery(propertyRef.columnName)],
  };
}


/**
 * @private
 */
function relnotexists(propertyRef, value) {
  return {
    method: 'whereNotExists',
    args: [propertyRef.modelClass.relatedQuery(propertyRef.columnName)],
  };
}

/**
 * @private
 */
function eq(propertyRef, value) {
  return basicWhere(propertyRef, '=', value);
}

/**
 * @private
 */
function neq(propertyRef, value) {
  return basicWhere(propertyRef, '<>', value);
}

/**
 * @private
 */
function lt(propertyRef, value) {
  return basicWhere(propertyRef, '<', value);
}

/**
 * @private
 */
function lte(propertyRef, value) {
  return basicWhere(propertyRef, '<=', value);
}

/**
 * @private
 */
function gt(propertyRef, value) {
  return basicWhere(propertyRef, '>', value);
}

/**
 * @private
 */
function gte(propertyRef, value) {
  return basicWhere(propertyRef, '>=', value);
}

/**
 * @private
 */
function like(propertyRef, value) {
  return basicWhere(propertyRef, 'like', value);
}

/**
 * @private
 */
function likelower(propertyRef, value, modelClass) {
  return {
    method: 'whereRaw',
    args: ['lower(??) like ?', [propertyRef.fullColumnName(), value.toLowerCase()]],
  };
}

/**
 * @private
 */
function isnull(propertyRef) {
  return basicWhere(propertyRef, 'is', null);
}

/**
 * @private
 */
function notnull(propertyRef) {
  return basicWhere(propertyRef, 'is not', null);
}


/**
 * @private
 */
function contains(propertyRef, value) {
  return basicWhere(propertyRef, '@>', value.split(','));
}


/**
 * @private
 */
function contained(propertyRef, value) {
  return basicWhere(propertyRef, '<@', value.split(','));
}


/**
 * @private
 */
function overlap(propertyRef, value) {
  return basicWhere(propertyRef, '&&', value.split(','));
}

