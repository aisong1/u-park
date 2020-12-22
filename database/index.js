const { Pool } = require('pg');

const parking = new Pool({
  database: 'parking',
});

module.exports = parking;
