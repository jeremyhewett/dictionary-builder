const _ = require('lodash');
const { singular } = require('pluralize');
const db = require('./db');
const types = require('./types');

class DatabaseSchema {
  async getTables() {
    let query =  'SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_catalog = ?';
    let bindings = [ db.knex.client.database() ];
    let result = await db.knex.raw(query, bindings);
    return await Promise.all(result.rows.map(async (row) => new DatabaseTable({
      name: row.table_name,
      fields: Object.entries(await db.knex(row.table_name).columnInfo()).map(([key, value]) => new DatabaseField({
        name: key,
        type: value.type.split(' ')[0]
      }))
    })));
  }
}

class DatabaseTable {
  constructor(table) {
    this.name = _.camelCase(table.name);
    this.type = types[_.upperFirst(singular(this.name))];
    this.fields = table.fields.map(field => new DatabaseField(field));
  }
}

class DatabaseField {
  constructor(field) {
    this.name = _.camelCase(field.name);
    this.type = field.type;
  }
}

module.exports = DatabaseSchema;