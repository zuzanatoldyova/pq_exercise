const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

function addPerson(values){
  knex.insert(values)
  .into('famous_people')
  .finally(function() {
    knex.destroy();
  });
}

addPerson({'first_name': 'Abraham', 'last_name': 'Lincoln', 'birthdate': '1809-02-12'});