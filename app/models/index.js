// database config
const dbConfig = require("../dbconfig/dbconfig.js");
const dotenv = require('dotenv' );
dotenv.config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DATABASE_URL;
db.users = require("./userModel.js")(mongoose);

module.exports = db;