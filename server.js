//server.js
const express = require('express');
const bodyParser = require('body-parser');
require( 'babel-polyfill' );
const cors = require( 'cors' );
const dotenv = require('dotenv' );
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route import
const usersRoute = require( './app/routes/usersRoute' );

app.use('/api/v1', usersRoute);

const port = parseInt(process.env.PORT);
app.listen(port, 'localhost', () => {
  console.log(`🚀 are live on http://localhost:${process.env.PORT}`);
});


//export default app;