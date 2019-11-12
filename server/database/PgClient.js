const { Pool, types } = require('pg');
const config = require('../config');

const TIMESTAMPTZ_OID = 1184;
const TIMESTAMP_OID = 1114;
types.setTypeParser(TIMESTAMPTZ_OID, val => val);
types.setTypeParser(TIMESTAMP_OID, val => val);

let pool = null;

class PgClient {
  constructor() {
    if (!pool) {
      console.log(`Connecting to ${JSON.stringify(config.postgres)}`);
      pool = new Pool(config.postgres);
      pool.on('error', e => {
        console.error(e);
      });
    }
  }

  getConnection() {
    return pool.connect.apply(pool, [...arguments]);
  }

  query() {
    return pool.query.apply(pool, [...arguments]);
  }

  async close() {
    await pool.end.apply(pool, [...arguments]);
    pool = null;
  }
}

module.exports = PgClient;
