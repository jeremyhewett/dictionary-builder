const nodeCleanup = require('node-cleanup');
const MySql = require('./MySql');

let database = new MySql();

nodeCleanup((exitCode, signal) => {
  database.stop();
});

module.exports = database.start();
