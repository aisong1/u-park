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
  const query = "TODO";
  const params = [];
  parking.query(query, (err, data) => {
    if (err) {
      throw new Error(err);
    }
    res.send(data);
  });
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
