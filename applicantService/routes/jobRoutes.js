const router = require('express').Router();
const jobController = require('../controllers/jobControllers');

// create job route
router.post('/createJob', (req, res) => {
  let params = {
    company_id: req.body.company_id,
    title: req.body.title,
    description: req.body.description,
    salary: req.body.salary,
    applicant_access_type: req.body.applicant_access_type,
    experience: req.body.experience,
    type: req.body.type,
    remote: req.body.remote,
    posted_by: req.body.posted_by
  };

  console.log(params);
  try{
    jobController.createJob(params).then(job => res.send(job));

  } catch(error) {
    console.log(error);
  };
});

// get all jobs
router.get('/all', (req, res) => {
  try {
    jobController.getAllJob().then(jobs => res.send(jobs));
  } catch (error) {
    console.log(error);
  };
});

// get job details
router.get('/:job_id', (req, res) => {
  let params = req.params

  try{
    jobController.getJob(params).then(jobs => res.send(jobs));
  }catch(error){
    console.log(error);
  };
});

// get company specific job 
router.get('/organization/:company_id', (req, res) => {
  let params = req.params
  
  try {
    jobController.getCompanySpecificJobs(params).then(jobs => res.send(jobs)).catch(err => console.log(err));
  } catch (error) {
   console.log(error); 
  };
});

router.put('/close/:job_id', (req, res) => {
  let params = {
    id: req.params.job_id
  }

  try {
    jobController.closeJob(params).then(job => res.send(job));
    
  } catch (error) {
    console.log(error)
  };
});

module.exports = router