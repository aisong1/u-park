const express = require('express');
const path = require('path');
const morgan = require('morgan');
const parser = require('body-parser');
const parking = require('../database/index');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/parking', (req, res) => {
  const query = "SELECT * FROM least_likely";

  parking.query(query, (err, data) => {
    if (err) {
      console.log('Failed to get parking status: ', err);
      res.end();
    }
    res.send(data);
  });
});

app.get('/api/parking/users', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT id FROM users WHERE email='$1' AND password=crypt('$2', password);`;
  const params = [email, password]

  parking.query(query, params, (err, data) => {
    if (err) {
      throw new Error(err);
      res.end();
    }
    res.send(data);
  })
})

app.post('/api/parking/users', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const query = `INSERT INTO users (firstName, lastName, email, password) VALUES (
    $1,
    $2,
    $3,
    crypt($4, gen_salt('md5'))
  );`;
  const params = [firstName, lastName, email, password];

  parking.query(query, params, (err, data) => {
    if (err) {
      console.log('Failed to create user: ', err);
      res.end();
    }
    res.send('User successfully created.');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
