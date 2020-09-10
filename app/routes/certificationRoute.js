//app/routes/certificateRoute.js

const express = require('express');
const routes = express.Router();
const pool =  require( '../dbconfig/dbconfig' );
const certificate =  require( '../controllers/certificationController' );
const verifyAuth = require( '../middlewares/verifyAuth' );

// certificate Routes
routes.use('/', (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

routes.post('/create_certificate',  certificate.CreateCertification);
routes.put('/update_certificate',  certificate.UpdateCertification);
routes.get('/get_certificate',  certificate.findAll);
routes.post('/delete_certificate',  certificate.deleteCertification);
//routes.post('/reset_credential',  certificate.resetCredential);
//router.get('/buses', verifyAuth, getAllBuses);

module.exports = routes;