const _ = require('lodash');
const filtrex = require('filtrex');
const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { singular } = require('pluralize');
const gqlTemplates = require('./gqlTemplates');
const DataLoader = require('./DataLoader');

const gqlTypes = {
  bigint: 'ID',
  character: 'String',
  integer: 'Int',
  real: 'Float',
  boolean: 'Boolean',
  timestamp: 'String'
};

class Engine {
  constructor(database, dbTables, EventHandler) {
    this._database = database;
    this._EventHandler = EventHandler;
    let tables = dbTables.map(dbTable => new Table(dbTable));
    let queryType = new QueryType(tables);
    let tableTypes = tables.map(table => new TableType(table, tables));
    let statsTypes = tables.map(table => new StatsType(table));
    let aggregateTypes = tables.map(table => new AggregateType(table));
    let mutationType = new MutationType(tables);
    let tableInputs = tables.map(table => new TableInput(table));
    let schemaString = tableTypes.concat(statsTypes, aggregateTypes, [queryType], tableInputs, mutationType).join('\n');
    this._schema = makeExecutableSchema({
      typeDefs: schemaString,
      resolvers: Object.assign(
        { Query: queryType.resolver() },
        ...tableTypes.map(type => ({ [type.name]: type.resolver() })),
        ...statsTypes.map(type => ({ [type.name]: type.resolver() })),
        ...aggregateTypes.map(type => ({ [type.name]: type.resolver() })),
        { Mutation: mutationType.resolver() }
      )
    });
  }

  async query(query, args) {
    let dataLoader = new DataLoader(this._database);
    let eventHandler = this._EventHandler ? new this._EventHandler() : {};
    let result = await graphql(this._schema, query, undefined, { dataLoader, eventHandler }, args);
    if (result.errors) {
      await dataLoader.rollbackTransaction();
    } else {
      await dataLoader.commitTransaction();
    }
    return result;
  }
}

class MutationType {
  constructor(tables) {
    this._tables = tables;
  }

  get name() {
    return 'Mutation';
  }

  get fields() {
    let createFields = this._tables.map(table => ({
      name: `create${_.upperFirst(table.singularName)}`,
      args: [{ name: 'input', type: `${TableInput.typeName(table)}!` }],
      type: TableType.typeName(table)
    }));

    let updateFields = this._tables.map(table => ({
      name: `update${_.upperFirst(table.singularName)}`,
      args: [{ name: 'input', type: `${TableInput.typeName(table)}!` }],
      type: TableType.typeName(table)
    }));

    let deleteFields = this._tables.map(table => ({
      name: `delete${_.upperFirst(table.singularName)}`,
      args: [{ name: 'id', type: 'ID!' }],
      type: 'ID'
    }));

    return createFields.concat(updateFields, deleteFields);
  }

  toString() {
    return gqlTemplates.type(this);
  }

  resolver() {
    let resolver = {};

    this._tables.forEach(table => {
      resolver[`create${_.upperFirst(table.singularName)}`] = async (parent, args, context, info) => {
        await context.dataLoader.ensureTransaction();
        if (context.eventHandler['beforeCreate']) {
          args = await context.eventHandler['beforeCreate'](parent, args, context, info);
        }
        if (context.eventHandler[`beforeCreate${_.upperFirst(table.singularName)}`]) {
          args = await context.eventHandler[`beforeCreate${_.upperFirst(table.singularName)}`](parent, args, context, info);
        }
        let entity = await context.dataLoader.create(new table.type(args.input));
        if (context.eventHandler['afterCreate']) {
          entity = await context.eventHandler['afterCreate'](entity, parent, args, context, info);
        }
        return entity;
      };
      resolver[`update${_.upperFirst(table.singularName)}`] = async (parent, args, context, info) => {
        await context.dataLoader.ensureTransaction();
        if (context.eventHandler['beforeUpdate']) {
          args = await context.eventHandler['beforeUpdate'](parent, args, context, info);
        }
        let entity = await context.dataLoader.update(new table.type({ id: args.input.id }), new table.type(args.input));
        if (context.eventHandler['afterUpdate']) {
          entity = await context.eventHandler['afterUpdate'](entity, parent, args, context, info);
        }
        return entity;
      };
      resolver[`delete${_.upperFirst(table.singularName)}`] = async (parent, args, context, info) => {
        await context.dataLoader.ensureTransaction();
        let result = await context.dataLoader.delete(new table.type({ id: args.id }));
        if (result.length !== 1) {
          throw new Error(`Failed to delete ${table.type.name} ${args.id}`)
        }
        return args.id;
      };
    });

    return resolver;
  }
}

class TableInput {
  static typeName(table) {
    return `${_.upperFirst(table.singularName)}Input`;
  }

  constructor(table) {
    this.table = table;
  }

  get name() {
    return TableInput.typeName(this.table);
  }

  get fields() {
    return this.table.fields.map(field => ({
      name: field.name,
      type: gqlTypes[field.type]
    }));
  }

  toString() {
    return gqlTemplates.input(this);
  }
}

class TableType {
  static typeName(table) {
    return _.upperFirst(table.singularName);
  }

  constructor(table, tables) {
    this.table = table;

    this._parentRelationships = table.fields
      .map(field => field.name)
      .filter(name => name.endsWith('Id'))
      .map(fk => {
        let table = tables.find(table => fk === `${table.singularName}Id` || fk.endsWith(_.upperFirst(`${table.singularName}Id`)));
        return { table, fk };
      })
      .filter(({ table }) => table);

    this._fk = `${table.singularName}Id`;
    this._childRelationships = tables
      .map(table => ({
        table,
        fks: table.fields.map(f => f.name).filter(name => name === this._fk || name.endsWith(_.upperFirst(this._fk))) }))
      .filter(entry => entry.fks.length);

    this._filters = {};
    this._keys = {};
  }

  get name() {
    return TableType.typeName(this.table);
  }

  get fields() {
    let objectFields = this.table.fields.map(field => ({
      name: field.name,
      type: gqlTypes[field.type]
    }));

    let parentFields = this._parentRelationships.map(({ table, fk }) => ({
      name: fk.substr(0, fk.length - 2),
      type: TableType.typeName(table)
    }));

    let childFields = [];
    this._childRelationships.forEach(({ table, fks }) => {
      fks.forEach(fk => {
        let suffix = _.upperFirst(fk.substr(0, fk.length - this._fk.length));
        childFields.push({
          name: `${table.name}${suffix}`,
          type: `[${TableType.typeName(table)}]`,
          args: [{ name: 'filter', type: 'String' }],
        });
      });
    });

    let childStatsFields = [];
    this._childRelationships.forEach(({ table, fks }) => {
      fks.forEach(fk => {
        let suffix = _.upperFirst(fk.substr(0, fk.length - this._fk.length));
        childStatsFields.push({
          name:  `${table.name}${suffix}Stats`,
          type: StatsType.typeName(table),
        });
      });
    });

    return objectFields.concat(CalculatedFields.schema, parentFields, childFields, childStatsFields);
  }

  toString() {
    return gqlTemplates.type(this);
  }

  resolver() {
    let parentFields = Object.assign({}, ...this._parentRelationships.map(({ table, fk }) => ({
      [fk.substr(0, fk.length - 2)]: async (parent, args, context) => {
        if (parent[fk] === undefined || parent[fk] === null) {
          return null;
        }
        return await context.dataLoader.getById(new table.type({ id: parent[fk] }));
      }
    })));
    let childFields = {};
    this._childRelationships.forEach(({ table, fks }) => {
      fks.forEach(fk => {
        let suffix = _.upperFirst(fk.substr(0, fk.length - this._fk.length));
        childFields[`${table.name}${suffix}`] = async (parent, args, context) => {
          let records = await context.dataLoader.getByFk(new table.type({ [fk]: parent.id }));
          if (args.filter) {
            if (!this._filters[args.filter]) {
              this._filters[args.filter] = filtrex.compileExpression(args.filter);
            }
            let filter = this._filters[args.filter];
            if (!this._keys[table.name]) {
              this._keys[table.name] = table.fields.reduce((acc, field) => Object.assign(acc,{ [field.name]: `$${field.name}` }), {});
            }
            let keys = this._keys[table.name];
            records = records.filter(record => {
              let obj = _.mapKeys(record, (v, key) => keys[key]);
              return filter(obj);
            });
          }
          return records;
        };
      });
    });
    let childStatsFields = {};
    this._childRelationships.forEach(({ table, fks }) => {
      fks.forEach(fk => {
        let suffix = _.upperFirst(fk.substr(0, fk.length - this._fk.length));
        childStatsFields[`${table.name}${suffix}Stats`] = async (parent, args, context) => {
          return await context.dataLoader.getByFk(new table.type({ [fk]: parent.id }));
        };
      });
    });
    let calculatedFields = new CalculatedFields(this.table).fields;
    return Object.assign({}, parentFields, childFields, childStatsFields, calculatedFields);
  }
}

class StatsType {
  static typeName(table) {
    return `${_.upperFirst(table.name)}Stats`;
  };

  static get aggregates() {
    return {
      count: (items) => items.length,
      average: _.mean,
      min: _.min,
      max: _.max,
    };
  }

  constructor(table) {
    this._table = table;
  }

  get name() {
    return StatsType.typeName(this._table);
  }

  get fields() {
    return Object.entries(StatsType.aggregates).map(([name]) => ({
      name,
      args: [{ name: 'field', type: 'String' }],
      type: AggregateType.typeName(this._table)
    }));
  }

  toString() {
    return gqlTemplates.type(this);
  }

  resolver() {
    let resolvers = {};
    Object.entries(StatsType.aggregates).map(([key, fn]) => {
      resolvers[key] = async (rows, args) => {
        let items = args.field ? rows.map(row => row[args.field]) : rows;
        let value = fn(items);
        return { value, records: rows };
      }
    });

    return resolvers;
  }
}

class AggregateType {
  static typeName(table) {
    return `${TableType.typeName(table)}Aggregate`;
  }

  constructor(table) {
    this._table = table;
    this._keys = table.fields.reduce((acc, field) => Object.assign(acc,{ [field.name]: `$${field.name}` }), {});
    this._filters = {};
  }

  get name() {
    return AggregateType.typeName(this._table);
  }

  get fields() {
    return [{
      name: 'value',
      description: 'The result of the aggregation',
      type: 'Float'
    }, {
      name: this._table.name,
      args: [{ name: 'filter', type: 'String!'}],
      type: `[${TableType.typeName(this._table)}]`
    }];
  }

  toString() {
    return gqlTemplates.type(this);
  }

  resolver() {
    return {
      [this._table.name]: async (parent, args, context, info) => {
        if (!this._filters[args.filter]) {
          this._filters[args.filter] = filtrex.compileExpression(args.filter);
        }
        let filter = this._filters[args.filter];
        return parent.records.filter(record => {
          let obj = _.mapKeys(record, (v, key) => this._keys[key]);
          obj.$value = parent.value;
          return filter(obj);
        });
      }
    }
  }
}

class CalculatedFields {
  static get schema() {
    return [{
      name: '_eval',
      description: 'Evaluate a given expression',
      args: [{ name: 'exp', type: 'String!' }],
      type: 'String'
    }, {
      name: '_print',
      description: 'Print a given expression',
      args: [{ name: 'exp', type: 'String!' }],
      type: 'String'
    }];
  }

  constructor(table) {
    this._filters = {};
    this._keys = table.fields.reduce((acc, field) => Object.assign(acc,{ [field.name]: `$${field.name}` }), {});
    let fieldNames = table.fields.map(field => field.name);
    this._matcher = new RegExp(`\\$\\b(${fieldNames.join('|')})\\b`, 'g');
  }

  get fields() {
    return {
      _eval: async (parent, args, context, info) => {
        let obj = _.mapKeys(parent, (v, key) => this._keys[key]);
        if (!this._filters[args.exp]) {
          this._filters[args.exp] = filtrex.compileExpression(args.exp);
        }
        return this._filters[args.exp](obj);
      },
      _print: async (parent, args, context, info) => {
        let obj = _.mapKeys(parent, (v, key) => this._keys[key]);
        return args.exp.replace(this._matcher, match => obj[match]);
      }
    }
  }

}

class QueryType {
  constructor(tables) {
    this._tables = tables;
    this._filters = {};
    this._keys = {};
  }

  get name() {
    return 'Query';
  }

  get fields() {
    let detailFields = this._tables.map(table => ({
      name: table.singularName,
      args: [{ name: 'id', type: 'ID!' }],
      type: TableType.typeName(table)
    }));

    let listFields = this._tables.map(table => ({
      name: table.name,
      args: [{ name: 'where', type: 'String' }, { name: 'filter', type: 'String' }],
      type: `[${TableType.typeName(table)}]`
    }));

    let statsFields = this._tables.map(table => ({
      name: `${table.name}Stats`,
      type: StatsType.typeName(table)
    }));

    return detailFields.concat(listFields, statsFields);
  }

  toString() {
    return gqlTemplates.type(this);
  }

  resolver() {
    let resolver = {};

    this._tables.forEach(table => {
      resolver[table.singularName] = async (parent, args, context) => await context.dataLoader.getById(new table.type({ id: args.id }));
      resolver[table.name] = async (parent, args, context) => {
        let records = args.where ?
          await context.dataLoader.where(new table.type(JSON.parse(args.where))) :
          await context.dataLoader.scan(new table.type());
        if (args.filter) {
          if (!this._filters[args.filter]) {
            this._filters[args.filter] = filtrex.compileExpression(args.filter);
          }
          let filter = this._filters[args.filter];
          if (!this._keys[table.name]) {
            this._keys[table.name] = table.fields.reduce((acc, field) => Object.assign(acc,{ [field.name]: `$${field.name}` }), {});
          }
          let keys = this._keys[table.name];
          records = records.filter(record => {
            let obj = _.mapKeys(record, (v, key) => keys[key]);
            return filter(obj);
          });
        }
        return records;
      };
      resolver[`${table.name}Stats`] = async (parent, args, context) => await context.dataLoader.scan(new table.type());
    });

    return resolver;
  }
}

class Table {
  constructor(table) {
    this.name = table.name;
    this.singularName = singular(table.name);
    this.type = table.type;
    this.fields = table.fields.map(field => new Field(field));
  }
}

class Field {
  constructor(field) {
    this.name = field.name;
    this.type = field.type;
  }
}

module.exports = Engine;
