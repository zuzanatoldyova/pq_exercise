const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  hostname: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

module.exports = {
  connect: (done) => {
    client.connect((error) => {
      if (error) {
        throw error;
      }
      done(error, client);
    });
  },
  close: (client) => {
    client.end((error) => {
      if (error) {
        throw error;
      }
    });
  }
};