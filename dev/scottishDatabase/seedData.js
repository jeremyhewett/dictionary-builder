const fs = require('fs');
const { Client } = require('pg');

const config = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5555,
  database: process.env.DATABASE_NAME || 'postgres',
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password'
};

console.log('Inserting Data');

let script = fs.readFileSync('./scottishDbData.sql', 'utf8');
let client = new Client(config);
client.connect();

client.query(script).then(
  () => {
    console.log('Data Inserted');
    client.end();
  },
  e => {
    console.error(e);
    client.end();
  }
);
