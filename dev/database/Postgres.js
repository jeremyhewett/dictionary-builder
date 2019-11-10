const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const { Client } = require('pg');
const _ = require('lodash');
const config = require('../../server/config');
const Database = require('../../server/database/Database');

/* The following are needed for inline functions in seed data */
const moment = require('moment');
/* End inline function support for seed data */

const CONTAINER_NAME = 'postgres_dchp';

class Postgres {
  start() {
    return new Promise(res => {
      console.log('Starting postgres docker container');
      exec(
        `docker-compose run --rm --name ${CONTAINER_NAME} -p 5432:5432 db`,
        (error, stdout, stderr) => {
          console.error(error);
          console.error(stderr);
        }
      );
      let wait = () => {
        let client = new Client(config.postgres);
        client.connect().then(
          () => {
            console.log('Postgres running in docker');
            client.end();
            res();
          },
          () => {
            setTimeout(wait, 1000);
          }
        );
      };
      setTimeout(wait, 1000);
    });
  }

  create() {
    console.log('Creating schema');

    let script = fs.readFileSync('../../server/database/schema.sql', 'utf8');
    let client = new Client(config.postgres);
    client.connect();

    return client.query(script).then(
      () => {
        console.log('Schema created');
        client.end();
      },
      e => {
        console.log(e);
        client.end();
      }
    );
  }

  async seed() {
    await this.clean();
    let database = new Database();
    try {
      for (let table of this.tables) {
        let tableData = require(path.join(__dirname, '../seedData', table + '.json'));
        for (let item of tableData) {
          let parsedItem = await Object.entries(item).reduce(
            async (acc, [key, value]) =>
              Object.assign(await acc, { [key]: await this.parse(value, key) }),
            {}
          );
          let type = table.charAt(0).toUpperCase() + table.slice(1, table.length - 1);
          type = type === 'Entrie' ? 'Entry' : type;
          let Model = require(`../../server/database/types/${type}`);
          let instance = new Model(parsedItem);
          try {
            await database.create(instance);
          } catch (e) {
            if (e.toString().includes('duplicate key')) {
              console.log(
                `Item already exists in ${table}: ${JSON.stringify(
                  parsedItem
                )}`
              );
            } else {
              console.log(`Failed to insert: ${JSON.stringify(parsedItem)}`);
              console.log(e);
            }
          }
        }
        let tableName = _.snakeCase(table);
        await database.runScript(`SELECT pg_catalog.setval(pg_get_serial_sequence('${tableName}', 'id'), MAX(id)) FROM "${tableName}"`);
      }
    } catch (e) {
      console.log(e);
    }
    await database.shutdown();
  }

  async clean() {
    let client = new Client(config.postgres);
    client.connect();
    try {
      for (let table of this.tables.reverse()) {
        await client.query(`DELETE FROM "${_.snakeCase(table)}"`);
      }
    } catch (e) {
      console.log(e);
    }
    client.end();
  }

  stop() {
    console.log('Stopping postgres docker container');
    execSync(`docker stop ${CONTAINER_NAME}`);
    console.log('Postgres docker container stopped');
  }

  parse(value, key) {
    if (typeof value === 'string') {
      let match = value.match(/^\$\((.+)\)$/);
      if (match) {
        return eval(match[1]);
      }
    } else if (_.isArray(value)) {
      return JSON.stringify(value);
    }
    return value;
  }

  get tables() {
    return [
      'headwords',
      'users',
      'roles',
      'userRoleLinks',
      'references',
      'entries',
      'meanings',
      'meaningEntryLinks',
      'citations',
      'books',
      'periodicals',
      'websites',
      'utterances',
      'citationMeaningLinks',
      'images',
      'entryReferenceLinks',
      'usageNotes',
      'contents'
    ];
  }
}

module.exports = Postgres;
