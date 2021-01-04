const pgp = require('pg-promise')();

const parking = pgp({
  database: 'parking',
});

module.exports = parking;
