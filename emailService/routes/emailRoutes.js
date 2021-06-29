const router = require('express').Router();
const mailController = require('../controllers/mailControllers');

router.post('/sendMail', (req, res) => {
  let params ={
    user: req.body.user,
    password: req.body.password,
    refreshToken: req.body.refreshToken,
    reciever: req.body.reciever,
    subject: req.body.subject,
    message: req.body.message
  }

  try {
    res.send(mailController.sendEmail(params));
    
  } catch (error) {
    console.log(error);  
  }
});

module.exports = router;
