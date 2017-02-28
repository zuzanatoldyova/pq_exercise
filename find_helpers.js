module.exports = {
  findByName: (client, input, done) => {
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text", [input], (err, result) => {
      if(err) {
        throw err;
      }
      console.log(result.rows[0]);
      done(result.rows, 'name');
    });
  },

  findByLastname: (client, input, done) => {
    client.query("SELECT * FROM famous_people WHERE last_name = $1::text", [input], (err, result) => {
      if(err) {
        throw err;
      }
      done(result.rows, 'lastname');
    });
  }
};