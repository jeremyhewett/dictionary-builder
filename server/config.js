const uuid = require('uuid/v4');

class Config {
  constructor() {
    this.app = {
      port: 4000,
      secret: process.env.SECRET || uuid(),
      tokenTtl: '12h'
    };
    this.postgres = {
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'password'
    };
  }
}

module.exports = new Config();
