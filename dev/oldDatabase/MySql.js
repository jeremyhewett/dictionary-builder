const { exec, execSync } = require('child_process');

const CONTAINER_NAME = 'mysql_dchp';

class MySql {
  start() {
    return new Promise(res => {
      console.log('Starting mysql docker container');
      exec(
        `docker-compose run --rm --name ${CONTAINER_NAME} -p 3306:3306 db`,
        (error, stdout, stderr) => {
          console.error(error);
          console.error(stderr);
        }
      );
    });
  }

  stop() {
    console.log(`Stopping ${CONTAINER_NAME}`);
    execSync(`docker stop ${CONTAINER_NAME}`);
    console.log(`${CONTAINER_NAME} stopped`);
  }
}

module.exports = MySql;
