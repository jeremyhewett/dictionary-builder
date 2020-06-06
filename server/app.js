const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Auth = require('./auth/Auth');
const Users = require('./users/Users');
const Content = require('./content/Content');
const Entries = require('./entries/Entries');
const Entities = require('./entities/Entities');
const Headwords = require('./headwords/Headwords');
const Citations = require('./citations/Citations');
const DatabaseSchema = require('./database/DatabaseSchema');
const GqlEngine = require('./graphql/GqlEngine');
const db = require('./database/db');
const EventHandler = require('./EventHandler');

const app = async (config = {}) => {
  let tables = await new DatabaseSchema().getTables();
  let gqlEngine = new GqlEngine(db, tables, EventHandler);

  let app = express();
  app.use('/api/*', cookieParser());
  app.use('/api/*', bodyParser.json());
  app.use('/api/*', new Auth(config).authenticator);

  app.post('/api/graphql', async (req, res, next) => {
    let { query, args } = req.body;
    try {
      let response = await gqlEngine.query(query, args);
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  app.use('/api/auth', new Auth(config).router);
  app.use('/api/users', new Users(config).router);
  app.use('/api/content', new Content(config).router);
  app.use('/api/entries', new Entries(config).router);
  app.use('/api/headwords', new Headwords(config).router);
  app.use('/api/citations', new Citations(config).router);
  app.use('/api', new Entities(config).router);
  app.use((req, res, next) => {
    if (!req.url.match(/\.\w+$/)) {
      req.url = '/';
      req.originalUrl = '/';
    }
    next();
  });
  app.use(express.static('./build', {
    fallthrough: false,
    redirect: false
  }));

  return app;
};

module.exports = app;
