const _ = require('lodash');
const bcrypt = require('bcrypt');
const moment = require('moment');

class EventHandler {
  constructor() {
    this.createdIds = {};
  }

  async beforeCreate(parent, args) {
    let input = _.mapValues(args.input, value => this.createdIds.hasOwnProperty(value) ? this.createdIds[value] : value);
    return { ...args, input };
  }

  async afterCreate(entity, parent, args, context, info) {
    this.createdIds[`$${info.fieldName}.id`] = entity.id;
    return entity;
  }

  async beforeUpdate(parent, args) {
    let input = _.mapValues(args.input, value => this.createdIds.hasOwnProperty(value) ? this.createdIds[value] : value);
    return { ...args, input };
  }

  async beforeCreateUser(parent, args) {
    let input = { ...args.input };
    input.passwordHash = await bcrypt.hash(input.passwordHash, 10);
    input.createdAt = moment().toJSON();
    return { ...args, input };
  }
}

module.exports = EventHandler;
