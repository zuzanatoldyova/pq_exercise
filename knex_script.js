const settings = require("./settings");
const moment = require('moment');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

const input = process.argv.slice(2)[0];

function findUser(input) {
  let found = [];
  knex.select('*')
  .from('famous_people')
  .where('first_name', input)
  .then(function(rows) {
    if (rows.length){
      found.push({handle: 'first_name', result: rows});
    }
    knex.select('*')
    .from('famous_people')
    .where('last_name', input)
    .then(function(rows) {
      found.push({handle: 'last_name', result: rows});
      for (let person of found) {
        if (person.result.length) {
          for (let one of person.result) {
            console.log(`Found by ${person.handle}, ${one.id}, ${one.first_name}, ${one.last_name}, ${moment(one.birthdate).format("MMM Do YYYY")}`);
          }
        }
      }
    });
  })
  .finally(function() {
    knex.destroy();
  });

}

findUser(input);