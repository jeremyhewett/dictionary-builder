const mysql = require('mysql');

class MySqlClient {
  constructor(config) {
    this._connection = mysql.createConnection(Object.assign({
      typeCast: function (field, next) {
        if (field.type === 'TIMESTAMP' || field.type === 'DATE' || field.type === 'DATETIME') {
          return field.string();
        } else {
          return next();
        }
      }
    }, config));
    this._connection.connect();
  }

  query(query) {
    return new Promise((res, rej) => {
      this._connection.query.apply(this._connection, [query, (error, results, fields) => {
        if (error) {
          rej(error);
        } else {
          res(results);
        }
      }]);
    });
  }

  async union(queries) {
    return (await Promise.all(queries.map(query => this.query(query))))
      .reduce((all, group) => all.concat(group), []);
  }

  close() {
    this._connection.end();
  }
}

module.exports = MySqlClient;
