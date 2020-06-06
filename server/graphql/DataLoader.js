const _ = require('lodash');
const dataloader = require('dataloader');

class DataLoader {
  constructor(database, user) {
    this.db = database;
    this._user = user;
    this._scanLoader = null;
    this._idLoaders = {};
    this._fkLoaders = {};
  }

  async ensureTransaction() {
    this.trx = await this.db.knex.transaction();
  }

  commitTransaction() {
    if (this.trx) {
      return this.trx.commit();
    }
  }

  rollbackTransaction() {
    if (this.trx) {
      return this.trx.rollback();
    }
  }

  scan(instance) {
    if (!this._scanLoader) {
      this._scanLoader = new dataloader(types => Promise.all(types.map(type =>
        this.db.query(new type(), this.trx)//.orderBy('id')
      )));
    }
    return this._scanLoader.load(instance.constructor);
  }

  where(instance) {
    return this.db.query(instance, this.trx);
  }

  getById(instance) {
    let type = instance.constructor;
    if (!this._idLoaders[type.name]) {
      this._idLoaders[type.name] = new dataloader(async ids => {
        let results = await this.db.query(new type({ id: ids }), this.trx);
        let resultsById = _.keyBy(results, 'id');
        return ids.map(id => resultsById[id]);
      });
    }
    return this._idLoaders[type.name].load(instance.id);
  }

  getByFk(instance) {
    let type = instance.constructor;
    let [key, value] = Object.entries(instance).filter(([k, v]) => v !== undefined)[0];
    if (!this._fkLoaders[type.name]) {
      this._fkLoaders[type.name] = {};
    }
    if (!this._fkLoaders[type.name][key]) {
      this._fkLoaders[type.name][key] = new dataloader(async values => {
        let results = await this.db.query(new type({ [key]: values }), this.trx);
        let resultsByKey = _.groupBy(results, key);
        return values.map(value => resultsByKey[value] || []);
      });
    }
    let dataLoader = this._fkLoaders[type.name][key];
    return dataLoader.load(value);
  }

  create(instance) {
    return this.db.create(instance, this.trx);
  }

  update(instance, newFields) {
    return this.db.update(instance, newFields, this.trx);
  }

  delete(instance) {
    return this.db.delete(instance, this.trx);
  }
}

module.exports = DataLoader;
