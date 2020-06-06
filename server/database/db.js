const Config = require('../config');
const Database = require('./Database');

module.exports = new Database({
  client: 'pg',
  connection: Config.postgres
});
