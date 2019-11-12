const Postgres = require('./Postgres');

let database = new Postgres();

console.log('Seeding database...');
database.seed()
  .then(() => console.log('success'))
  .catch(err => `failed\n${err}`);
