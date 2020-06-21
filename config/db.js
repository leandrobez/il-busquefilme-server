const mongoose = require('mongoose'),
  dotenv = require('dotenv');

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(
      `*****************************************\n***  DB CONECTION: SUCCESS  ***\n*****************************************`
    );
  }
);

mongoose.connection.on('error', () => {
  console.error.bind(
    console,
    `*****************************************\n***  DB CONECTION: FAIL  ***\n*****************************************`
  );
});

mongoose.set('useCreateIndex', true);
