//app/controller/projectController.js

const Project = require('../models/projectModel.js');
const helpers = require('../helpers/validation');
const message = require('../helpers/status');
/**
   * Create A Project
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  exports.CreateProject = async (req, res) => {
    const {
        project_name, start_date, end_date, status
    } = req.body;
  
    if (helpers.isEmpty(project_name) || helpers.isEmpty(start_date) || helpers.isEmpty(end_date) || helpers.isEmpty(status)) {
      message.errorMessage.error = 'user_id, project_id field cannot be empty';
      return res.status(message.status.bad).send(message.errorMessage);
    }
  
    const user = new Project({
        project_name: project_name, start_date:start_date, end_date:end_date, status:status   
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
 * Update Project
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updated Project
 */
exports.UpdateProject = async (req, res) => {
    const {
        project_name, start_date, end_date, status
    } = req.body;
  
    if (helpers.isEmpty(project_name) || helpers.isEmpty(start_date) || helpers.isEmpty(end_date) || helpers.isEmpty(status)) {
      message.errorMessage.error = 'user_id, project_id field cannot be empty';
      return res.status(message.status.bad).send(message.errorMessage);
    }

  Project.findByIdAndUpdate(req.params.ProjectId, {
    project_name: project_name, start_date:start_date, end_date:end_date, status:status
  }, {new: true})
  .then(Users => {
    if(!Users) {
      return res.status(404).send({
          message: "Users not found with id " + req.params.ProjectId
      });
    }
    res.send(Users);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(message.status.notfound).send({
          message: "Users not found with id " + req.params.ProjectId
      });                
    }
    return res.status(message.status.error).send({
      message: "Error updating Users with id " + req.params.ProjectId
    });
  });
};

/**
 * get Project
 * @param {object} req 
 * @param {object} res 
 * @returns {object} get Project
 */
exports.findAll = (req, res) => {
    Project.find()
  .then(Userss => {
      res.send(Userss);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Userss."
      });
  });
};


/**
 * Delete Project
 * @param {object} req 
 * @param {object} res 
 * @returns {object} Deleted Project
 */
exports.deleteProject = (req, res) => {
    Project.findByIdAndRemove(req.params.ProjectId)
  .then(Users => {
      if(!Users) {
          return res.status(404).send({
              message: "Users not found with id " + req.params.ProjectId
          });
      }
      res.send({message: "Users deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Users not found with id " + req.params.ProjectId
          });                
      }
      return res.status(500).send({
          message: "Could not delete Users with id " + req.params.ProjectId
      });
  });
};