//app/routes/taskRoute.js

const express = require('express');
const routes = express.Router();
const pool =  require( '../dbconfig/dbconfig' );
const task =  require( '../controllers/taskController' );
const verifyAuth = require( '../middlewares/verifyAuth' );

// task Routes
routes.use('/', (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

routes.post('/create_task',  task.CreateTask);
routes.put('/update_task',  task.UpdateTask);
routes.get('/get_task',  task.findAll);
routes.post('/delete_task',  task.deleteTask);
//routes.post('/reset_credential',  task.resetCredential);
//router.get('/buses', verifyAuth, getAllBuses);

module.exports = routes;