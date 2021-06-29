const Company = require('../models/Company');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt')
const { handleErr } = require('../utils');

/* 
Everytime you create a company, you should also create the
employee document for the owner.
*/

module.exports.register = (params) =>  {
  let newCompany = new Company({
    company_name: params.company_name,
    company_owner: params.company_owner,
    industry: params.industry,
  });
  
  return newCompany.save().then((company, err) => {
    if(err){
      console.log(err);
    };

    // register with the company owner registration
    let newEmployee = new Employee({
      company_id: company._id,
      first_name: params.first_name,
      last_name: params.last_name,
      owner: true,
      phone_numbers : params.phone_numbers,
      designation: params.designation,
      status: "active",
      official_email: params.official_email,
      password: bcrypt.hashSync(params.password, 10),
    });

    // return true if successful 
    return newEmployee.save().then((employee, err) => (err) ? handleErr(err) : true)
  });
};

module.exports.getCompany = (params) => {
  return Company.findById(params.company_id).then(company => company);
};

