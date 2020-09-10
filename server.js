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
const educationRoute = require( './app/routes/educationRoute' );
const certificationRoute = require( './app/routes/certificationRoute' );
const taskRoute = require( './app/routes/taskRoute' );
const teamRoute = require( './app/routes/teamRoute' );
const projectRoute = require( './app/routes/projectRoute' );

app.use('/api/v1', usersRoute);
app.use('/api/v1', educationRoute);
app.use('/api/v1', certificationRoute);
app.use('/api/v1', taskRoute);
app.use('/api/v1', teamRoute);
app.use('/api/v1', projectRoute);

const port = parseInt(process.env.PORT);
app.listen(port, 'localhost', () => {
  console.log(`🚀 are live on http://localhost:${process.env.PORT}`);
});


//export default app;