const Applicant = require('../models/Applicant');


module.exports.resumeUpload = (params) => {
  return Applicant.findByIdAndUpdate(params.applicant_id, { 
    $set : {
      resume : params.path
  }}).then(applicant => applicant).catch(err => console.log(err));
}