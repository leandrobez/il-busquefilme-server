const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  cors = require('cors');

module.exports = app => {
  const corsOptions = {
    origin: `${process.env.BASE_URL}:${process.env.CLIENT_PORT}`,
    credentials: true
  };

  console.log('****** Initialize and config app... ******');

  app
    .use(express.static(path.join(__dirname, '../public')))
    .use(cors(corsOptions))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));
};
