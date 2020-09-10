//app/controller/adminController.js

const Certification = require('../models/certificationModel.js');
const helpers = require('../helpers/validation');
const message = require('../helpers/status');'../helpers/status';

/**
   * Create Certification
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  exports.CreateCertification = async (req, res) => {
    const {
      user_id, certificate_title, awarding_institution, year_obtained, expiration
    } = req.body;
  
    if (helpers.isEmpty(user_id) || helpers.isEmpty(certificate_title) || helpers.isEmpty(awarding_institution) || helpers.isEmpty(year_obtained)  || helpers.isEmpty(expiration)) {
      message.errorMessage.error = 'user_id, project_id field cannot be empty';
      return res.status(message.status.bad).send(message.errorMessage);
    }
  
    const user = new Certification({
      user_id: user_id, certificate_title:certificate_title, awarding_institution: awarding_institution, year_obtained:year_obtained, expiration:expiration  
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
 * Update Certification
 * @param {object} req 
 * @param {object} res 
 * @returns {object} updated Certification
 */
exports.UpdateCertification = async (req, res) => {
    const {
        user_id, certificate_title, awarding_institution, year_obtained, expiration
    } = req.body;

    if (helpers.isEmpty(user_id) || helpers.isEmpty(certificate_title) || helpers.isEmpty(awarding_institution) || helpers.isEmpty(year_obtained)  || helpers.isEmpty(expiration)) {
        message.errorMessage.error = 'user_id, project_id field cannot be empty';
        return res.status(message.status.bad).send(message.errorMessage);
    }

  Certification.findByIdAndUpdate(req.params.CertificateId, {
    user_id: user_id, certificate_title:certificate_title, awarding_institution: awarding_institution, year_obtained:year_obtained, expiration:expiration  
  }, {new: true})
  .then(Users => {
    if(!Users) {
      return res.status(404).send({
          message: "Users not found with id " + req.params.CertificateId
      });
    }
    res.send(Users);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(message.status.notfound).send({
          message: "Users not found with id " + req.params.CertificateId
      });                
    }
    return res.status(message.status.error).send({
      message: "Error updating Users with id " + req.params.CertificateId
    });
  });
};

/**
 * get Certification
 * @param {object} req 
 * @param {object} res 
 * @returns {object} get Certification
 */
exports.findAll = (req, res) => {
    Certification.find()
  .then(Userss => {
      res.send(Userss);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Userss."
      });
  });
};


/**
 * Delete Certification
 * @param {object} req 
 * @param {object} res 
 * @returns {object} Deleted Certification
 */
exports.deleteCertification = (req, res) => {
    Certification.findByIdAndRemove(req.params.CertificateId)
  .then(Users => {
      if(!Users) {
          return res.status(404).send({
              message: "Users not found with id " + req.params.CertificateId
          });
      }
      res.send({message: "Users deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Users not found with id " + req.params.CertificateId
          });                
      }
      return res.status(500).send({
          message: "Could not delete Users with id " + req.params.CertificateId
      });
  });
};