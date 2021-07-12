const router = require('express').Router();
const employeeController = require('../controllers/employee');
const auth = require('../auth/auth');
const { handleErr } = require('../utils');
const Updates = require('./employeeUpdates');

// employee api routes

// regular login route
router.post('/login', async (req, res) => {
  let params = {
    email: req.body.email,
    password: req.body.password
  }

  try{
    await employeeController.login(params).then(authentication => res.send(authentication))
  } catch(error) {
    handleErr(error)
  };
});

// google login 
router.post('/googleLogin', async (req, res) => {
  let params = {
    tokenId : req.body.tokenId,
    official_email: req.body.official_email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  try{
    res.send(await employeeController.verifyGoogleLogin(params));
  }catch(error){
    console.log(error);
  }
});

// check if email already exists
router.get('/emailCheck', (req, res) => {
  let params = {
    email: req.body.email
  };

  try{
    employeeController.emailExists(params).then(status => res.send(status));
  }catch(error){
    handleErr(error);
  };
});

// get all employee
router.post('/employees', auth.verify, (req, res) => {
  let params = {
    company_id: req.body.company_id
  };
  
  try{
    employeeController.getAllEmployees(params).then(employees => res.send(employees));
  }catch(error){
    handleErr(error);
  };
});

// get user details 
router.get('/me', auth.verify, async (req, res) => {
  const params = await auth.decode(req.headers.authorization);

  try{
    employeeController.getMe(params).then(employee => res.send(employee))
  }catch(error){
    handleErr(error); 
  };
});

// get employee details
router.get('/:employee_id', auth.verify, (req, res) => {
  let params = {
    employee_id: req.params,
    company_id: req.body.company_id
  };

  try{
    employeeController.getEmployee(params.employee_id).then(employee => res.send(employee))
    .catch(err => handleErr(err));
  }catch(error){
    handleErr(error)
  };
});

// employee details update
router.put('/:employee_id', auth.verify, (req, res) => {
  let params = req.params.employee_id;
  let update = Updates.includeUpdates(req);

  employeeController.editDetails(params, update).then(updatedEmployee => res.send(updatedEmployee));
});


// change password details update
router.put('/change/:employee_id', auth.verify, (req, res) => {
  let params = req.params.employee_id
  let update = req.body.pass

  employeeController.editDetails(params, update).then(updatedEmployee => res.send(updatedEmployee));
});

//register employee 
router.post('/add', auth.verify, (req, res) => {
  let params = {
    company_id: req.body.company_id,
    employee_id: req.body.employee_id,
    access_level: req.body.access_level,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_numbers : req.body.phone_numbers,
    designation: req.body.designation,
    official_email: req.body.official_email,
    password: req.body.password,
    team_id: req.body.team_id,
    department_id: req.body.department_id,
    shift_id: req.body.shift_id,
    joining_date: req.body.joining_date,
    owner: req.body.owner,
    compensation: req.body.compensation,
    gender: req.body.gender
  };

  try{
    employeeController.registerEmployee(params).then(employee => res.send(employee)).catch(err => handleErr(err));
  }catch (error){
   handleErr(error) 
  };
});


module.exports = router;