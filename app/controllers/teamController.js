//app/controller/adminController.js

const Team = require('../models/teamModel.js');
const helpers = require('../helpers/validation');
const message = require('../helpers/status');'../helpers/status';

/**
   * Create A Admin
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
exports.CreateTeam = async (req, res) => {
  const {
    user_id, project_id
  } = req.body;

  if (helpers.isEmpty(user_id) || helpers.isEmpty(project_id) ) {
    message.errorMessage.error = 'user_id, project_id field cannot be empty';
    return res.status(message.status.bad).send(message.errorMessage);
  }

  const user = new Team({
    user_id: user_id, project_id:project_id 
  })

  user.save()
  .then(data => {
      const dbResponse = data;
      message.successMessage.data = dbResponse;
      res.status(message.status.created).send(message.successMessage);
  }).catch(err => {
    message.errorMessage.error = 'Operation was not successful';
    res.status(message.status.error).send(message.errorMessage);
  });
};

/**
 * Update team
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updated team
 */
exports.UpdateTeam = async (req, res) => {
  const {
    user_id, project_id
  } = req.body;

  if (helpers.isEmpty(user_id) || helpers.isEmpty(project_id) ) {
    message.errorMessage.error = 'user_id, project_id field cannot be empty';
    return res.status(message.status.bad).send(message.errorMessage);
  }

  Team.findByIdAndUpdate(req.params.TeamId, {
    user_id: user_id, project_id:project_id, 
  }, {new: true})
  .then(Users => {
    if(!Users) {
      return res.status(404).send({
        message: "Users not found with id " + req.params.TeamId
      });
    }
    res.send(Users);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(message.status.notfound).send({
        message: "Users not found with id " + req.params.TeamId
      });                
    }
    return res.status(message.status.error).send({
      message: "Error updating Users with id " + req.params.TeamId
    });
  });
};

/**
 * get team
 * @param {object} req 
 * @param {object} res 
 * @returns {object} get team
 */
exports.findAll = (req, res) => {
  Team.find()
  .then(Userss => {
      res.send(Userss);
  }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Userss."
      });
  });
};


/**
 * Delete team
 * @param {object} req 
 * @param {object} res 
 * @returns {object} Deleted user
 */
exports.deleteTeam = (req, res) => {
  Team.findByIdAndRemove(req.params.TeamId)
  .then(Users => {
    if(!Users) {
      return res.status(404).send({
        message: "Users not found with id " + req.params.TeamId
      });
    }
    res.send({message: "Users deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Users not found with id " + req.params.TeamId
        });                
    }
    return res.status(500).send({
      message: "Could not delete Users with id " + req.params.TeamId
    });
  });
};