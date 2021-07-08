const Applicant = require('../models/Applicant');
const Job = require('../models/Jobs')
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const { getRandomIntPassword } = require('../utils');

// register applicant 
module.exports.registerApplicant = (params) => {
  let newApplicant = new Applicant({
    company_id: params.company_id,
    job_id: params.job_id,
    first_name: params.first_name,
    last_name: params.last_name,
    date_of_birth: params.date_of_birth,
    gender: params.gender,
    phone_numbers: Number(params.phone_numbers),
    designation: params.designation,
    application_status: 1,
    rejected: false,
    hired: false,
    official_email: params.official_email,
    resume : params.resume,
    address: {
      street: params.street,
      province: params.province,  
      city: params.city,
      zip_code: params.zip_code
    },
    expected_compensation: params.expected_compensation,
    message: params.message,
  });


  return newApplicant.save().then((applicant, err) => {
    if(err){
      console.log(err);
    }

    Job.findByIdAndUpdate(applicant.job_id, { 
      $inc : {
        applications : 1 
      }
    }).then(err => (err) ? console.log(err) : true);

    return applicant
  });
};

// get applicant
module.exports.getApplicantDetails = (params) => {
  return Applicant.findById(params.id).then(applicant => {
    return applicant;
  }).catch(err => console.log(err));
};

// get all applicants based on job posting 
module.exports.getAllApplicants = (params) => {
  return Applicant.find({ job_id: params.job_id}).then(applicant => applicant).catch(err => console.log(err));
};

// update applicant status 
module.exports.updateApplicantStatus = (params) => {
  
  return Applicant.findByIdAndUpdate(params.applicant_id, {
    $set : {
      application_status : Number(params.status),
      for_interview : true,
      interview_date : params.date,
      reviewed : true
    }
  }).then((applicant, err) => (err) ? console.log(err) : true);
};

// hire an applicant 
module.exports.hire = (params) => {
  return Applicant.findByIdAndUpdate(params.applicant_id, { 
    $set : { 
      hired: true,
      reviewed: true,
      hired_on: new Date().toString()   
    }}).then((applicant, err) => {
      if(err){
        console.log(err);
      }

        return Applicant.findOne({ _id : applicant._id}).populate('job_id').then((applicant, err) => {
          if(err){
            console.log(err)
          }
          
          let newRandomPassword = getRandomIntPassword().toString(); 

          let newEmployee = new Employee({
            company_id: applicant.company_id,
            access_level: 1,
            first_name: applicant.first_name,
            last_name: applicant.last_name,
            phone_numbers : applicant.phone_numbers,
            designation: applicant.job_id.title,
            status: "active",
            official_email: applicant.official_email,
            password: bcrypt.hashSync(newRandomPassword, 10),
            joining_date: params.joining_date,
            remote: params.remote,
            compensation: params.compensation
          });

          return newEmployee.save().then((employee, err) => {
            if(err){
              console.log(err)
            }

            return {
              email : employee.official_email,
              password : newRandomPassword
            };
          });
        });
      }).catch(err => console.log(err));
};


// reject an applicant
module.exports.reject = (params) => {
  return Applicant.findByIdAndUpdate(params.id, {
    $set : {
      rejected: true,
      reviewed: true
    }
  }).then((applicant, err) => (err) ? console.log(err) : true );
};

// get all applicants
module.exports.getAllCompanyApplicants = (params) => {
  return Applicant.find({ company_id: params.company_id }).populate('job_id').then(applicant => applicant).catch(err => console.log(err));
};

// get all applicants based on organization that are not yet hired
module.exports.getCompanyApplicants = (params) => {
  return Applicant.find({ company_id: params.company_id, hired : false, rejected : false }).populate('job_id').then(applicant => applicant).catch(err => console.log(err));
};