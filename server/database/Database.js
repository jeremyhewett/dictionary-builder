const { plural } = require('pluralize');
const _ = require('lodash');
const { types } = require('pg');

const TIMESTAMPTZ_OID = 1184;
const TIMESTAMP_OID = 1114;
types.setTypeParser(TIMESTAMPTZ_OID, val => val);
types.setTypeParser(TIMESTAMP_OID, val => val);

const Knex = require('knex');

class Database {
  constructor(config) {
    this.knex = Knex({
      debug: config.debug === true,
      client: config.client || 'pg',
      connection: config.connection,
      wrapIdentifier: (value, origImpl) => {
        let snake = _.snakeCase(value);
        return origImpl(snake.length ? snake : value);
      },
      postProcessResponse: (result, queryContext) => {
        let isArray = Array.isArray(result);
        let rows = (isArray ? result : [result]).map(row => _.mapKeys(row, (v, k) => _.camelCase(k)));

        if (!queryContext || !queryContext.type) {
          return isArray ? rows : rows[0];
        }

        if (queryContext.isSingle && rows.length > 1) {
          throw new Error(`Expected single record but got ${rows.length}.\n${JSON.stringify(rows)}`);
        }

        let items = rows.map(item => new queryContext.type(item));
        return queryContext.isSingle ? items[0] || null : items;
      },
    });
  }

  create(instance, trx) {
    let entity = this._mapValues(instance, value =>
      value !== null && typeof value === 'object' ? JSON.stringify(value) : value,
    );
    return (trx || this.knex)(this._getTableName(instance))
      .insert(entity)
      .returning('*')
      .queryContext({isSingle: true, type: instance.constructor});
  }

  get(instance, trx) {
    return this._where(instance, trx).queryContext({isSingle: true, type: instance.constructor});
  }

  query(instance, trx) {
    return this._where(instance, trx).queryContext({type: instance.constructor});
  }

  count(instance, groupByField, trx) {
    let query = this._where(instance, trx)
      .queryContext({type: instance.constructor})
      .count('* as count');
    return groupByField ? query.groupBy(groupByField) : query;
  }

  update(instance, newFields, trx) {
    let entity = this._mapValues(newFields, value =>
      value !== null && typeof value === 'object' ? JSON.stringify(value) : value,
    );
    return this._where(instance, trx)
      .update(entity)
      .returning('*')
      .queryContext({isSingle: true, type: instance.constructor});
  }

  delete(instance, trx) {
    return this._where(instance, trx)
      .del()
      .returning('*')
      .queryContext({type: instance.constructor});
  }

  shutdown() {
    return this.knex.destroy();
  }

  _getTableName(instance) {
    return (instance.constructor).table || `${_.snakeCase(plural(instance.constructor.name))}`;
  }

  _entries(instance) {
    return Object.entries(_.pickBy(instance, value => value !== undefined));
  }

  _mapValues(instance, fn) {
    return _.mapValues(
      _.pickBy(instance, value => value !== undefined),
      fn,
    );
  }

  _where(instance, trx) {
    let query = (trx || this.knex)(this._getTableName(instance));
    this._entries(instance).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        query.whereIn(key, value);
      } else if (value !== null && typeof value === 'object') {
        let args = Object.entries(value)[0];
        query.where(key, args[0], args[1]);
      } else {
        query.where(key, value);
      }
    });
    return query;
  }
}

module.exports = Database;
