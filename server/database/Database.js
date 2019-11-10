const _ = require('lodash');
const PgClient = require('./PgClient');
const Comparator = require('./Comparator');

const DESC_PREFIX = '!';

class Database {
  constructor(config, client) {
    this._client = client || new PgClient(config);
  }

  async shutdown() {
    await this._client.close();
  }

  async scan(instance, options = {}) {
    let sortBy = options.sortBy
      ? ' ORDER BY ' +
      options.sortBy
        .map(
          f =>
            f.startsWith(DESC_PREFIX)
              ? `"${_.snakeCase(f.substr(DESC_PREFIX.length))}" DESC`
              : `"${_.snakeCase(f)}"`
        )
        .join(', ')
      : '';
    let tableName = this._getTableName(instance);
    let result = await this._client.query(
      `SELECT * FROM "${tableName}"${sortBy}`
    );
    return result.rows.map(this._constructorFor(instance));
  }

  async create(instance) {
    let tableName = this._getTableName(instance);
    let entity = this._getEntity(instance);
    let fields = Object.entries(entity)
      .map(([key]) => `"${key}"`)
      .join(', ');
    let values = Object.entries(entity)
      .map((e, i) => `$${i + 1}`)
      .join(', ');
    let params = Object.entries(entity).map(
      ([key, value]) => (_.isArray(value) ? JSON.stringify(value) : value)
    );
    let result = await this._client.query(
      `INSERT INTO "${tableName}"(${fields}) VALUES(${values}) RETURNING *`,
      params
    );
    return this._constructorFor(instance)(result.rows[0]);
  }

  async _update(instance, newFields) {
    let tableName = this._getTableName(instance);
    let { conditions, params } = this._getConditions(instance);
    let entity = this._getEntity(newFields);
    let fields = Object.entries(entity)
      .map(([key]) => `"${key}"`)
      .join(', ');
    let values = Object.entries(entity)
      .map(([key], i) => `$${i + 1 + params.length}`)
      .join(', ');
    params = params.concat(
      Object.entries(entity).map(
        ([key, value]) => (_.isArray(value) ? JSON.stringify(value) : value)
      )
    );
    let result = await this._client.query(
      `UPDATE "${tableName}" SET (${fields}) = (${values}) WHERE ${conditions} RETURNING *`,
      params
    );
    return result.rows;
  }

  async update(instance, newFields) {
    let rows = await this._update(instance, newFields);
    if (rows.length === 1) {
      return this._constructorFor(instance)(rows[0]);
    } else {
      throw `Update conditions matched ${
        rows.length
        } records:\n${JSON.stringify(instance)}`;
    }
  }


  async delete(instance) {
    let tableName = this._getTableName(instance);
    let { conditions, params } = this._getConditions(instance);
    let result = await this._client.query(
      `DELETE FROM "${tableName}" WHERE ${conditions}`,
      params
    );
    if (result.rows.length) {
      return this._constructorFor(instance)(result.rows[0]);
    }
    return null;
  }

  async query(instance) {
    let tableName = this._getTableName(instance);
    let { conditions, params } = this._getConditions(instance);
    let result = await this._client.query(
      `SELECT * FROM "${tableName}"${conditions ? ` WHERE ${conditions}` : ''}`,
      params
    );
    return result.rows.map(this._constructorFor(instance));
  }

  async count(instance, groupBy) {
    let groupBySnake = _.snakeCase(groupBy);
    let tableName = this._getTableName(instance);
    let { conditions, params } = this._getConditions(instance);
    let groupByField = groupBy ? `${groupBySnake}, ` : '';
    let whereClause = conditions ? ` WHERE ${conditions}` : '';
    let groupByClause = groupBy ? ` GROUP BY ${groupBySnake}` : '';
    let result = await this._client.query(
      `SELECT ${groupByField}COUNT(1) FROM "${tableName}"${whereClause}${groupByClause}`,
      params
    );

    class Count {
      constructor(entity) {
        this.count = parseInt(entity.count);
        if (groupBy) {
          this[groupBy] = entity[groupBySnake];
        }
      }
    }

    return groupBy ? result.rows.map(row => new Count(row))
      : new Count(result.rows[0]);
  }

  async get(instance) {
    let tableName = this._getTableName(instance);
    let { conditions, params } = this._getConditions(instance);
    let result = await this._client.query(
      `SELECT * FROM "${tableName}" WHERE ${conditions}`,
      params
    );
    if (result.rows.length === 1) {
      return this._constructorFor(instance)(result.rows[0]);
    } else {
      throw `Get conditions matched ${
        result.rows.length
        } records:\n${JSON.stringify(instance)}`;
    }
  }

  async beginTransaction(callback) {
    let client = await this._client.getConnection();
    let api = new Database({}, client);
    api.beginTransaction = () => {
      throw 'Cannot create nested transaction';
    };

    try {
      await client.query('BEGIN');
      let result = await callback(api);
      await client.query('COMMIT');
      return result;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async runScript(script, params) {
    return await this._client.query(script, params);
  }

  _getTableName(instance) {
    let tableName = _.snakeCase(`${instance.constructor.name}s`);
    return tableName === 'objects' ? null : tableName === 'entrys' ? 'entries' : tableName;
  }

  _getEntity(instance) {
    return this._mapKeysRecursive(
      instance,
      _.snakeCase,
      (k, v) => v !== undefined
    );
  }

  _getConditions(instance) {
    let entity = Object.entries(this._getEntity(instance))
      .filter(([key, value]) => {
        return !_.isObject(value) || Array.isArray(value) || value instanceof Comparator;
      })
      .reduce(
        (result, [key, value]) => Object.assign(result, { [key]: value }),
        {}
      );
    let params = [];
    Object.entries(entity)
      .filter(([key, value]) => value !== null)
      .forEach(([key, value]) => {
        let val = value instanceof Comparator ? value.value : value;
        if (Array.isArray(val)) {
          params = params.concat(val);
        } else {
          params.push(val);
        }
      });
    let i = 1;
    let conditions = Object.entries(entity)
      .filter(([key, value]) => value !== null)
      .map(([key, value]) => {
        let val = value instanceof Comparator ? value.value : value;
        let arg = Array.isArray(val) ?
          val.length ? `(${val.map(() => `$${i++}`).join(', ')})` : '(SELECT 1 WHERE false)' //there is no empty set literal in Postgres :/
          : `$${i++}`;
        return `"${key}" ${value instanceof Comparator ? value.operator : Array.isArray(val) ? 'IN' : '='} ${arg}`;
      })
      .concat(
        Object.entries(entity)
          .filter(([key, value]) => value === null)
          .map(([key]) => `"${key}" is null`)
      )
      .join(' AND ');
    return {
      conditions,
      params
    };
  }

  _isMatch(actual, expected) {
    return actual === expected ||
      typeof expected === 'number' && actual === expected.toString();
  }

  _constructorFor(instance) {
    return row => new instance.constructor(this._keysToCamelCaseRecursive(row));
  }

  _keysToCamelCaseRecursive(collection) {
    return this._mapKeysRecursive(collection, _.camelCase);
  }

  _mapKeysRecursive(collection, fn, predicate = (k, v) => true) {
    if (!_.isObjectLike(collection) || collection instanceof Comparator) {
      return collection;
    }

    if (_.isArray(collection)) {
      return collection.map(item =>
        this._mapKeysRecursive(item, fn, predicate)
      );
    }

    let result = {};
    Object.entries(collection).forEach(([key, value]) => {
      if (predicate(key, value)) {
        result[fn(key)] = this._mapKeysRecursive(value, fn, predicate);
      }
    });
    return result;
  }
}

module.exports = Database;
