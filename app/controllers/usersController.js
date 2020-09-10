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
exports.adminCreateUser = async (req, res) => {
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
  const user = new Users({
    email: email, first_name:first_name, last_name:last_name, company_id:company_id, 
    branch_id:branch_id, title:title, gender:gender, role:role, 
    department:department, status:status, username:username, 
    password:hashedPassword
  })
  
  user.save()
  .then(data => {
      const dbResponse = data;
      delete dbResponse.password;
      message.successMessage.data = dbResponse;
      res.status(message.status.created).send(message.successMessage);
  }).catch(err => {
    message.errorMessage.error = 'Operation was not successful';
    res.status(message.status.error).send(message.errorMessage);
  });
};


/**
 * Admin update A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
*/
exports.adminUpdateUser = async (req, res) => {
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
   * hr upadate user data
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
*/
exports.hrUpdateUser = async (req, res) => {
  const {
    first_name, last_name, other_name, company_id, branch_id, title, gender, conatact, address, department, 
    marital_status, state_of_origin, local_govern_area, primary_contact_name, relationship, primary_contact_number,
    primary_contact_email, primary_contact_address, employment_date
  } = req.body;

  if (helpers.isEmpty(email) || helpers.isEmpty(first_name) || helpers.isEmpty(last_name)) {
    message.errorMessage.error = 'Email, password, first name and last name field cannot be empty';
    return res.status(message.status.bad).send(message.errorMessage);
  }

  Users.findByIdAndUpdate(req.params.UsersId, {
    first_name:first_name, last_name:last_name, other_name:other_name, company_id:company_id, 
    branch_id:branch_id, title:title, gender:gender, conatact:conatact, address:address,
    department:department, marital_status:marital_status, no_of_children:no_of_children, 
    state_of_origin:state_of_origin, local_govern_area:local_govern_area, primary_contact_name:primary_contact_name, 
    relationship:relationship, primary_contact_number:primary_contact_number,primary_contact_email:primary_contact_email,
    primary_contact_address:primary_contact_address, employment_date:employment_date,
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
   * user upadate personal data
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
*/
exports.userUpdateUser = async (req, res) => {
  const {
    last_name, other_name, company_id, branch_id, title, gender, dob, conatact, address, marital_status, no_of_children,
  } = req.body;

  if (helpers.isEmpty(last_name) || helpers.isEmpty(other_name) || helpers.isEmpty(dob)) {
    message.errorMessage.error = 'field cannot be empty';
    return res.status(message.status.bad).send(message.errorMessage);
  }
  
  Users.findByIdAndUpdate(req.params.UsersId, {
    last_name:last_name, other_name:other_name, company_id:company_id, branch_id:branch_id, title:title, gender:gender, 
    dob:dob, conatact:conatact, address:address, marital_status:marital_status, no_of_children:no_of_children, 
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
   * Signin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
exports.siginUser = async (req, res) => {
    const { email, password } = req.body;
    if (helpers.isEmpty(email) || helpers.isEmpty(password)) {
      errorMessage.error = 'Email or Password detail is missing';
      return res.status(message.status.bad).send(errorMessage);
    }
    if (!helpers.isValidEmail(email) || !helpers.validatePassword(password)) {
      errorMessage.error = 'Please enter a valid Email or Password';
      return res.status(message.status.bad).send(errorMessage);
    }
    const signinUserQuery = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await dbQuery.dbQuery.query(signinUserQuery, [email]);
      const dbResponse = rows[0];
      if (!dbResponse) {
        errorMessage.error = 'User with this email does not exist';
        return res.status(message.status.notfound).send(errorMessage);
      }
      if (!helpers.comparePassword(dbResponse.password, password)) {
        errorMessage.error = 'The password you provided is incorrect';
        return res.status(message.status.bad).send(errorMessage);
      }
      const token = helpers.generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
      delete dbResponse.password;
      successMessage.data = dbResponse;
      successMessage.data.token = token;
      return res.status(message.status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = 'Operation was not successful';
      return res.status(message.status.error).send(errorMessage);
    }
  };
  