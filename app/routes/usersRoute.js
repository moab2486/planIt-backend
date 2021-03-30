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

routes.post('/create_user',  users.createUser);
// routes.post('/profile_update/:UsersId',  users.userUpdateUser);
// routes.post('/reset_credential',  users.resetCredential);
// routes.get('/get_users', users.findAll);
// routes.get('/get_single_users/:UsersId',  users.findOne);
// routes.delete('/delete_user/:UsersId',  users.delete);
routes.post('/login',  users.siginUser);
// routes.get('/get_users', verifyAuth, users.findAll);

module.exports = routes;