const nodeCleanup = require('node-cleanup');
const Postgres = require('./Postgres');

let database = new Postgres();

nodeCleanup((exitCode, signal) => {
  database.stop();
});

module.exports = database.start().then(() => database.create());
