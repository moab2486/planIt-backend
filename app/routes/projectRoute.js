//app/routes/projectRoute.js

const express = require('express');
const routes = express.Router();
const pool =  require( '../dbconfig/dbconfig' );
const project =  require( '../controllers/projectController' );
const verifyAuth = require( '../middlewares/verifyAuth' );

// project Routes
routes.use('/', (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

routes.post('/create_project',  project.CreateProject);
routes.put('/update_project',  project.UpdateProject);
routes.get('/get_project',  project.findAll);
routes.post('/delete_project',  project.deleteProject);
//routes.post('/reset_credential',  project.resetCredential);
//router.get('/buses', verifyAuth, getAllBuses);

module.exports = routes;