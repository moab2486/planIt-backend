//app/routes/teamRoute.js

const express = require('express');
const routes = express.Router();
const pool =  require( '../dbconfig/dbconfig' );
const team =  require( '../controllers/teamController' );
const verifyAuth = require( '../middlewares/verifyAuth' );

// team Routes
routes.use('/', (req, res, next) => {
    console.log('Time: ', Date.now());
    next();
})

routes.post('/create_team',  team.CreateTeam);
routes.put('/update_team',  team.UpdateTeam);
routes.get('/get_team',  team.findAll);
routes.post('/delete_team',  team.deleteTeam);
//routes.post('/reset_credential',  team.resetCredential);
//router.get('/buses', verifyAuth, getAllBuses);

module.exports = routes;