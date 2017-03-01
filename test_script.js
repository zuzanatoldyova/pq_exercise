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
const moment = require('moment');


const findhelpers = require('./find_helpers');

let input = process.argv.slice(2)[0];

function findPerson(input) {
  client.connect((error, client) => {
    if (error) {
      throw error;
    }
    let foundpeople = [];
    findhelpers.findByName(client, input, (result, handle) => {
      if (result) {
        foundpeople.push({handle, result});
      }
      findhelpers.findByLastname(client, input, (result, handle) => {
        if (result) {
          foundpeople.push({handle, result});
        }
        if (!foundpeople.length) {
          console.log("Not found");
        } else {
          for (let person of foundpeople) {
            if (person.result.length) {
              for (let one of person.result) {
                console.log(`Found by ${person.handle}, ${one.id}, ${one.first_name}, ${one.last_name}, ${moment(one.birthdate).format("MMM Do YYYY")}`);
              }
            }
          }
        }
        client.end((error) => {
          if (error) {
            throw error;
          }
        });
      });
    });
  });
}


findPerson(input);
