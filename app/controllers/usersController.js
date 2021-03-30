//app/controller/usersController

const Users = require('../models/userModel.js');
const helpers = require('../helpers/validation');
const message = require('../helpers/status');

/**
 * Admin create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/
exports.createUser = async (req, res) => {
  const {
    first_name, last_name, phone_number, email, password
  } = req.body;

  if (helpers.isEmpty(email) || helpers.isEmpty(first_name) || helpers.isEmpty(last_name) || helpers.isEmpty(password) || helpers.isEmpty(phone_number)) {
    message.errorMessage.error = 'Email, password, first name, last name and phone numberfield cannot be empty';
    return res.status(message.status.bad).send(message.errorMessage);
  }
  if (!helpers.isValidEmail(email)) {
    message.errorMessage.error = 'Please enter a valid Email';
    return res.status(message.status.bad).send(message.errorMessage);
  }
  if (!helpers.validatePassword(password)) {
    message.errorMessage.error = 'Password must be more than five(5) characters';
    return res.status(message.status.bad).send(message.errorMessage);
  }

  const hashedPassword = helpers.hashPassword(password);
  const user = new Users({
    email: email, 
    first_name:first_name, 
    last_name:last_name, 
    phone_number:phone_number, 
    password:hashedPassword
  })
  
  user.save()
  .then(data => {
      const dbResponse = data;
      delete data.password;
      message.successMessage.data = dbResponse;
      res.status(message.status.created).send(message.successMessage);
  }).catch(err => {
    res.status(message.status.error).send(message.errorMessage);
  });
};


/**
 * Admin update A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/
exports.updateUser = async (req, res) => {
  const {
    email, first_name, last_name, company_id, branch_id, title, gender, role, department, status, username, password
  } = req.body;

  if (helpers.isEmpty(email) || helpers.isEmpty(first_name) || helpers.isEmpty(last_name) || helpers.isEmpty(password) || helpers.isEmpty(username)) {
    message.errorMessage.error = 'Email, password, first name and last name field cannot be empty';
    return res.status(message.status.bad).send(message.errorMessage);
  }
  if (!helpers.isValidEmail(email)) {
    message.errorMessage.error = 'Please enter a valid Email';
    return res.status(message.status.bad).send(message.errorMessage);
  }
  if (!helpers.validatePassword(password)) {
    message.errorMessage.error = 'Password must be more than five(5) characters';
    return res.status(message.status.bad).send(message.errorMessage);
  }

  const hashedPassword = helpers.hashPassword(password);
  Users.findByIdAndUpdate(req.params.UsersId, {
    email: email, first_name:first_name, last_name:last_name, company_id:company_id, 
    branch_id:branch_id, title:title, gender:gender, role:role, 
    department:department, status:status, username:username, 
    password:hashedPassword
  }, {new: true})
  .then(Users => {
    if(!Users) {
      return res.status(404).send({
          message: "Users not found with id " + req.params.UsersId
      });
    }
    res.send(Users);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(message.status.notfound).send({
          message: "Users not found with id " + req.params.UsersId
      });                
    }
    return res.status(message.status.error).send({
      message: "Error updating Users with id " + req.params.UsersId
    });
  });
};

/**
 * delete user by id
 * @param {object} req 
 * @param {object} res 
 * @returns {object} get users
*/
exports.delete = (req, res) => {
  Users.findByIdAndRemove(req.params.UsersId)
  .then(Users => {
      if(!Users) {
          return res.status(404).send({
              message: "Users not found with id " + req.params.UsersId
          });
      }
      res.send({message: "Users deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Users not found with id " + req.params.UsersId
          });                
      }
      return res.status(500).send({
          message: "Could not delete Users with id " + req.params.UsersId
      });
  });
};


/**
 * get users
 * @param {object} req 
 * @param {object} res 
 * @returns {object} get users
 */
exports.findAll = (req, res) => {
  Users.find()
    .then(Userss => {
      res.send(Userss);
    }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Userss."
      });
    });
};

/**
 * get one user by id
 * @param {object} req 
 * @param {object} res 
 * @returns {object} get users
*/
exports.findOne = (req, res) => {
  Users.findById(req.params.UsersId)
  .then(Users => {
      if(!Users) {
          return res.status(404).send({
              message: "Users not found with id " + req.params.UsersId
          });            
      }
      res.send(Users);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Users not found with id " + req.params.UsersId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving Users with id " + req.params.UsersId
      }); 
  });
};

/**
   * Signin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
exports.siginUser = async (req, res) => {
    const { email, password } = req.body;
    if (helpers.isEmpty(email) || helpers.isEmpty(password)) {
      message.errorMessage.error = 'email or Password detail is missing';
      return res.status(message.status.bad).send(message.errorMessage);
    }
    if (!helpers.validatePassword(password)) {
      message.errorMessage.error = 'Please enter a valid email or Password';
      return res.status(message.status.bad).send(message.errorMessage);
    }
  
    Users.findOne({email: email})
    .then( Users => {
      const dbResponse = Users;
      if(!dbResponse) {
        message.errorMessage.error = 'User with this email does not exist';
        return res.status(message.status.notfound).send(message.errorMessage);       
      }
      if (!helpers.comparePassword(password, dbResponse.password)) {
        message.errorMessage.error = 'The password you entered is incorrect';
        return res.status(message.status.bad).send(message.errorMessage);
      }
      const response = {id: dbResponse.id, email: dbResponse.email, phone_number: dbResponse.phone_number};
      const access_token = helpers.generateUserToken(dbResponse.id, dbResponse.email, dbResponse.phone_number);
      const refresh_token = helpers.generateRefreshToken(dbResponse.id, dbResponse.email, dbResponse.phone_number);
      message.successMessage.data = response;
      message.successMessage.access_token = access_token;
      message.successMessage.refresh_token = refresh_token;
      return res.status(message.status.success).send(message.successMessage);
    })
    .catch(err => {
      return res.status(500).send({
        message: err 
      }); 
    })
  };
  
/**
   * username and password reset
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
*/
exports.resetCredential = async (req, res) => {
  const {
    username, password
  } = req.body;

  if (helpers.isEmpty(username) || helpers.isEmpty(password)) {
    message.errorMessage.error = 'field cannot be empty';
    return res.status(message.status.bad).send(message.errorMessage);
  }

  if (!helpers.validatePassword(password)) {
    message.errorMessage.error = 'Password must be more than five(5) characters';
    return res.status(message.status.bad).send(message.errorMessage);
  }

  const hashedPassword = helpers.hashPassword(password);
  Users.findByIdAndUpdate(req.params.UsersId, {
    username:username, password:hashedPassword
  }, {new: true})
  .then(Users => {
    if(!Users) {
      return res.status(404).send({
          message: "Users not found with id " + req.params.UsersId
      });
    }
    res.send(Users);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(message.status.notfound).send({
          message: "Users not found with id " + req.params.UsersId
      });                
    }
    return res.status(message.status.error).send({
      message: "Error updating Users with id " + req.params.UsersId
    });
  });
};
