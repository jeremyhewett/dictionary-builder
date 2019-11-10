const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Auth = require('./auth/Auth');
const Content = require('./content/Content');
const Entries = require('./entries/Entries');
const Entities = require('./entities/Entities');
const Headwords = require('./headwords/Headwords');
const Citations = require('./citations/Citations');

const app = (config = {}) => {
  let app = express();
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(new Auth(config).authenticator);
  app.use('/api/auth', new Auth(config).router);
  app.use('/api/content', new Content(config).router);
  app.use('/api/entries', new Entries(config).router);
  app.use('/api/headwords', new Headwords(config).router);
  app.use('/api/citations', new Citations(config).router);
  app.use('/api', new Entities(config).router);
  return app;
};

module.exports = app;
