const express = require('express');
const path = require('path');
const morgan = require('morgan');
const parser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(parser.json());

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
