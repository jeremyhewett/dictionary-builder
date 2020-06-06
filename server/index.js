const config = require('./config');
const app = require('./app');

app(config).then(a => a.listen(config.app.port, () => {
  console.log(`Server listening on port ${config.app.port}!`);
}));
