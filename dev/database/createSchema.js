const Postgres = require('./Postgres');

let database = new Postgres();

module.exports = database.create();
