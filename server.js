const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

/**CONFIG */
require('./config/app')(app);

/**DB */
require('./config/db');

/**ROUTEs */
require('./config/routes')(app);

let port = process.env.SERVER_PORT || 4000;

app.listen(port, () => {
  console.log('******************************');
  console.log('*    Ap starting...');
  console.log('*    Ap run with ' + process.env.NODE_ENV);
  console.log('*    BusqueFilme ');
  console.log('*    By InternetLojas.com');
  console.log(`*    Port: ${port}`);
  console.log('*    Database: MongoDB');
  console.log('*    Token: jsonwebtoken');
  console.log('******************************\n');
});
