const router = require('express').Router();
const applicantController = require('../controllers/applicantControllers');

//register applicant
router.post('/register', (req, res) => {
  let params = {
    company_id: req.body.company_id,
    job_id: req.body.job_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    phone_numbers: req.body.phone_numbers,
    designation: req.body.designation,
    official_email: req.body.official_email,
    resume : req.body.resume,
    address: {
      street: req.body.street,
      province: req.body.province,
      city: req.body.city,
      zip_code: req.body.zip_code
    },
    expected_compensation: req.body.expected_compensation,
    message: req.body.message
  };

  try {
    applicantController.registerApplicant(params).then(applicant => res.send(applicant));
  } catch (error) {
    console.log(error)
  }

});

// get applicant details
router.get('/:applicant_id', (req, res) => {
  let params = {
    id: req.params.applicant_id
  };

  try {
    applicantController.getApplicantDetails(params).then(applicant => res.send(applicant));

  } catch (error) {
    console.log(error);
  }
});

// get all applicants based on job posting 
router.get('/applicants/:job_id', (req, res) => {
  try {
    applicantController.getAllApplicants(req.params).then(applicants => res.send(applicants))
  } catch (error) {
    console.log(error)
  };

});

// update applicant status
router.put('/:applicant_id', (req, res) => {
  let params = {
    applicant_id : req.params.applicant_id,
    date : req.body.interview_date,
    status : req.body.status
  }

  try {
    applicantController.updateApplicantStatus(params).then(update => res.send(update));
  } catch (error) {
    console.log(error)
  }
});

// hire applicant 
router.put('/hire/:applicant_id', (req, res) => {
  let params = {
    applicant_id : req.params.applicant_id,
    joining_date: req.body.joining_date,
    remote: req.body.remote,
    compensation: req.body.compensation
  };  


  try {
    applicantController.hire(params).then(hired => res.send(hired)).catch(err => console.log(err))
  } catch(error) {
    console.log(error);
  };

});

// get all applicants based on company posting
router.get('/applications/:company_id', (req, res) => {
  try {
    applicantController.getCompanyApplicants(req.params).then(applicants => res.send(applicants))
  } catch (error) {
    console.log(error)
  };
});

// get all applicants based on company posting
router.get('/applications/all/:company_id', (req, res) => {
  try {
    applicantController.getAllCompanyApplicants(req.params).then(applicants => res.send(applicants))
  } catch (error) {
    console.log(error)
  };
});

// reject applicant
router.put('/reject/:applicant_id', (req, res) => {

  let params = {
    id : req.params.applicant_id
  }
  try {
    applicantController.reject(params).then(applicants => res.send(applicants))
  } catch (error) {
    console.log(error)
  };
})


module.exports = router;