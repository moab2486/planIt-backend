//app/routes/educationRoute.js

const express = require('express');
const routes = express.Router();
const pool =  require( '../dbconfig/dbconfig' );
const education =  require( '../controllers/educationController' );
const verifyAuth = require( '../middlewares/verifyAuth' );

// education Routes
routes.use('/', (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

routes.post('/create_education',  education.CreateEducation);
routes.put('/update_education',  education.UpdateEducation);
routes.get('/get_education',  education.findAll);
routes.post('/delete_education',  education.deleteEducation);
//routes.post('/reset_credential',  education.resetCredential);
//router.get('/buses', verifyAuth, getAllBuses);

module.exports = routes;