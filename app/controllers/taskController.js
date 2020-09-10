//app/controller/adminController.js

const Task = require('../models/taskModel.js');
const helpers = require('../helpers/validation');
const message = require('../helpers/status');

/**
   * Create A Task
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  exports.CreateTask = async (req, res) => {
    const {
        user_id, task_name, categories, day_date, day_time, note
    } = req.body;
  
    if (helpers.isEmpty(user_id) || helpers.isEmpty(task_name) || helpers.isEmpty(categories) || helpers.isEmpty(day_date) || helpers.isEmpty(day_time) || helpers.isEmpty(note)) {
      message.errorMessage.error = 'user_id, project_id field cannot be empty';
      return res.status(message.status.bad).send(message.errorMessage);
    }
  
    const user = new Task({
      user_id: user_id, task_name:task_name, categories: categories, day_date:day_date, dday_time: user_id, note:note
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
 * Update Task
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updated Task
 */
exports.UpdateTask = async (req, res) => {
    const {
        user_id, task_name, categories, day_date, day_time, note
      } = req.body;
    
      if (helpers.isEmpty(user_id) || helpers.isEmpty(task_name) || helpers.isEmpty(categories) || helpers.isEmpty(day_date) || helpers.isEmpty(day_time) || helpers.isEmpty(note)) {
        message.errorMessage.error = 'user_id, project_id field cannot be empty';
        return res.status(message.status.bad).send(message.errorMessage);
      }

  Task.findByIdAndUpdate(req.params.TaskId, {
    user_id: user_id, task_name:task_name, categories: categories, day_date:day_date, dday_time: user_id, note:note
  }, {new: true})
  .then(Users => {
    if(!Users) {
      return res.status(404).send({
          message: "Users not found with id " + req.params.TaskId
      });
    }
    res.send(Users);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(message.status.notfound).send({
          message: "Users not found with id " + req.params.TaskId
      });                
    }
    return res.status(message.status.error).send({
      message: "Error updating Users with id " + req.params.TaskId
    });
  });
};

/**
 * get Task
 * @param {object} req 
 * @param {object} res 
 * @returns {object} get Task
 */
exports.findAll = (req, res) => {
  Task.find()
  .then(Userss => {
      res.send(Userss);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Userss."
      });
  });
};


/**
 * Delete Task
 * @param {object} req 
 * @param {object} res 
 * @returns {object} Deleted user
 */
exports.deleteTask = (req, res) => {
  Task.findByIdAndRemove(req.params.TaskId)
  .then(Users => {
      if(!Users) {
          return res.status(404).send({
              message: "Users not found with id " + req.params.TaskId
          });
      }
      res.send({message: "Users deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Users not found with id " + req.params.TaskId
          });                
      }
      return res.status(500).send({
          message: "Could not delete Users with id " + req.params.TaskId
      });
  });
};