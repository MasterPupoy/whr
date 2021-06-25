const router = require('express').Router();
const companyController = require('../controllers/company');
const { handleErr } = require('../utils');

// company and owner registration route
router.post('/register', (req, res) => {
  let params = {
    company_name: req.body.company_name,
    company_owner: req.body.company_owner,
    industry: req.body.industry,
    first_name: req.bodyfirst_name,
    last_name: req.body.last_name,
    phone_numbers : req.body.phone_numbers,
    designation: req.body.designation,
    official_email:req.body.official_email,
    password: req.body.password,
  };

  try{
    companyController.register(params).then(registered => res.send(registered));
  }catch(error){
    handleErr(error);
  };
});

module.exports = router;