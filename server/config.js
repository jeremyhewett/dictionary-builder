const uuid = require('uuid/v4');

class Config {
  constructor() {
    this.app = {
      port: process.env.PORT || 4000,
      secret: process.env.SECRET || uuid(),
      tokenTtl: '12h'
    };
    this.postgres = process.env.DATABASE_URL ? {
      connectionString: process.env.DATABASE_URL
    } : {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 5432,
      database: process.env.DATABASE_NAME || 'postgres',
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'password'
    };
  }
}

module.exports = new Config();
