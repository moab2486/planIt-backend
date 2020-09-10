// database config
const dotenv = require('dotenv' );
dotenv.config();

const dbConfig = process.env.DATABASE_URL ;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; 

// Connecting to the database
const pool = mongoose.connect(dbConfig, {
    useUnifiedTopology: true, useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
export default pool;