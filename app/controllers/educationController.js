//app/controller/adminController.js

const Education = require('../models/educationModel.js');
const helpers = require('../helpers/validation');
const message = require('../helpers/status');'../helpers/status';

/**
   * Create A Admin
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
exports.CreateEducation = async (req, res) => {
    const {
        user_id, school_name, school_address, started, ended, certificate_type, upload_file 
    } = req.body;

    if (helpers.isEmpty(user_id) || helpers.isEmpty(school_name) || helpers.isEmpty(school_address) || helpers.isEmpty(started) || helpers.isEmpty(ended) || helpers.isEmpty(certificate_type) || helpers.isEmpty(upload_file)) {
        message.errorMessage.error = 'user_id, project_id field cannot be empty';
        return res.status(message.status.bad).send(message.errorMessage);
    }

    const user = new Education({
        user_id: user_id, school_name:school_name, school_address: school_address, started:started, ended: ended, certificate_type:certificate_type, upload_file:upload_file  
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
 * Update Education
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updated Education
 */
exports.UpdateEducation = async (req, res) => {
    const {
        user_id, school_name, school_address, started, ended, certificate_type, upload_file 
      } = req.body;
    
      if (helpers.isEmpty(user_id) || helpers.isEmpty(school_name) || helpers.isEmpty(school_address) || helpers.isEmpty(started) || helpers.isEmpty(ended) || helpers.isEmpty(certificate_type) || helpers.isEmpty(upload_file)) {
        message.errorMessage.error = 'user_id, project_id field cannot be empty';
        return res.status(message.status.bad).send(message.errorMessage);
      }
    
    const user = new Education({
        user_id: user_id, school_name:school_name, school_address: school_address, started:started, ended: ended, certificate_type:certificate_type, upload_file:upload_file  
    })

    Education.findByIdAndUpdate(req.params.EducationId, {
        user_id: user_id, project_id:project_id, 
    }, {new: true})
    .then(Users => {
        if(!Users) {
            return res.status(404).send({
                message: "Users not found with id " + req.params.EducationId
            });
        }
        res.send(Users);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(message.status.notfound).send({
                message: "Users not found with id " + req.params.EducationId
            });                
        }
        return res.status(message.status.error).send({
            message: "Error updating Users with id " + req.params.EducationId
        });
    });
};

/**
 * get Education
 * @param {object} req 
 * @param {object} res 
 * @returns {object} get Education
 */
exports.findAll = (req, res) => {
    Education.find()
    .then(Userss => {
        res.send(Userss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Userss."
        });
    });
};


/**
 * Delete Education
 * @param {object} req 
 * @param {object} res 
 * @returns {object} Deleted user
 */
exports.deleteEducation = (req, res) => {
    Education.findByIdAndRemove(req.params.EducationId)
    .then(Users => {
        if(!Users) {
            return res.status(404).send({
                message: "Users not found with id " + req.params.EducationId
            });
        }
        res.send({message: "Users deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Users not found with id " + req.params.EducationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Users with id " + req.params.EducationId
        });
    });
};