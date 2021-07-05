const Job = require('../models/Jobs');
const Company = require('../models/Company');

// create job
module.exports.createJob = (params) => {
  let newJob = new Job({
    company_id: params.company_id,
    title: params.title,
    description: params.description,
    salary: params.salary,
    applicant_access_type: params.applicant_access_type,
    experience: params.experience,
    type: params.type,
    setup: params.setup, 
    remote: params.remote
  });

  return newJob.save().then((job, err) => {
    if(err){
      console.log(err)
    };

    return true;
  });
};

// get all jobs
module.exports.getAllJob = (params) => {
  return Job.find().populate('company_id').then((jobs, err) => {
    if(err){
      console.log(error);
    }
    
    return jobs;
  });
};

// get jobs from specific company 
module.exports.getCompanySpecificJobs = (params) => {
  return Job.find({ company_id : params.company_id }).then((jobs, err) => {
    if(err){
      console.log(err);
    }

    return jobs;
  }).catch(err => console.log(err));
};

// get job details
module.exports.getJob = (params) => {
  return Job.findById({ _id : params.job_id }).populate('company_id').then((job, err) => {
    if(err){
      console.log(err)
    }

    return job
  });
}

// close job 
module.exports.closeJob = (params) => {
  return Job.findByIdAndUpdate(params.id, { 
    $set : {
      closed : true
  }}).then((job, err) => {
    if(err){
      console.log(err)
    }

    return job;
  });
};

