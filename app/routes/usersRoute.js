//app/routes/usersRoute.js

const express = require('express');
const routes = express.Router();
const pool =  require( '../dbconfig/dbconfig' );
const users =  require( '../controllers/usersController' );
const verifyAuth = require( '../middlewares/verifyAuth' );

// users Routes
routes.use('/', (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

routes.post('/create_user',  users.adminCreateUser);
routes.post('/admin_update_user',  users.adminUpdateUser);
routes.post('/hr_update_user',  users.hrUpdateUser);
routes.post('/profile_update',  users.userUpdateUser);
routes.post('/reset_credential',  users.resetCredential);
routes.get('/get_users',  users.findAll);
//router.get('/buses', verifyAuth, getAllBuses);

module.exports = routes;