const db = require('./db');
const pg = require("pg");
const settings = require("./settings");

module.exports = {
  findByName: (client, input, done) => {
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text", [input], (err, result) => {
      if(err) {
        throw err;
      }
      done(result.rows, 'name');
    });
  },

  findByLastname: (client, input, done) => {
    let handle = 'lastname';
    client.query("SELECT * FROM famous_people WHERE last_name = $1::text", [input], (err, result) => {
      if(err) {
        throw err;
      }
      done(result.rows, handle);
    });
  }
};