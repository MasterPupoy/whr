const Employee = require('../models/Employee');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const clientKey = require('../utils');
const auth = require('../auth/auth');
const { OAuth2Client } = require('google-auth-library');

module.exports.registerEmployee = (params) => {
  let newEmployee = new Employee({
    company_id: params.company_id,
    employee_id: params.employee_id,
    access_level: params.access_level,
    first_name: params.first_name,
    last_name: params.last_name,
    phone_numbers : params.phone_numbers,
    designation: params.designation,
    status: "active",
    official_email: params.official_email,
    password: bcrypt.hashSync(params.password, 10),
    team_id: params.team_id,
    department_id: params.department_id,
    shift_id: params.shift_id,
    joining_date: params.joining_date
  });

  // return true if successful
  return newEmployee.save().then((employee, err) => (err) ? console.log(err) : true );
};
 
// if email length is greater than 0 (exists), return true. If not, return false
module.exports.emailExists = (params) => {
  return User.find({ official_email : params.email }).then(email => {
    (email.length > 0) ? true : false
  });
};

// enter login credentials and once accepted, return a token 
module.exports.login = (params) => {

  return Employee.findOne({official_email : params.email}).then((employee, err) => {
    console.log(params)
    console.log(employee);

    if(err){
      handleErr(err);
    };

    if (!employee){
      return {error : 'email does not exists'}
    };
    
    const passwordMatched = async () => await bcrypt.compareSync(params.password, employee.password).catch(error => handleErr(error));

    if (passwordMatched){
      return { access : auth.createAccessToken(employee.toObject())}
    }else{
      return { error : 'incorrect password '}
    };  
  }).catch(error => console.log(error));
};

// google login 
module.exports.verifyGoogleLogin = async (token) => {
  const client = new OAuth2Client(clientKey);

  // await google verification
  const data = await client.verifyIdToken({
    idToken: token,
    audience: client
  });

  /*
  on verify, check collections if employee exists. If record found, issue token.
  If not, return error.
  */
  if (data.payload.email_verified){
    const employee = await Employee.findOne({ official_email : data.payload.email });
    
    if (employee){
      return { access: auth.createAccessToken(employee.toObject())};
    }else{
      return { error : 'unindentified employee'}
    };

  }else{
    return { error: 'google auth error'}
  };
};

// get all employees
module.exports.getAllEmployees = (params) => {
  return Employees.find({ company_id : params.company_id }).then(employees => employees);
};

// get user details 
module.exports.getMe = (params) => {
  return Employee.findById(params.id).then(employee => {
    employee.password = '';
    
    return employee;
  }).catch(err => console.log(err));
};

// get employee details
module.exports.getEmployee = (params) => {

  return Employee.find({ _id : params.employee_id, company_id : params.company_id}).then(employee => {
    if(employee.length <= 0){
      return { error : 'unauthorized'};
    };

    employee.password = '';
    return employee;
  });
};

module.exports.editDetails = (params, updates) => {
  return Employee.findByIdAndUpdate(params, { $set : updates}, { new : true}).then(employee => {
    console.log(employee);
  });
};
