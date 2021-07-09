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

// send message
router.post('/send', (req, res) => {
  let params = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    type: req.body.type,
    content: req.body.content,
    date: req.body.date,
    unread: true,
  };

  console.log(params)
  try {
    mailController.sendMessage(params).then(mail => res.send(mail));
  }catch(error){
    console.log(error);
  }
});

// set as read
router.put('/:mail_id', (req, res) => {
  let params = {
    mailId : req.params.mail_id
  }

  try{
    mailController.setToRead(params).then(mail => res.send(mail));
  }catch(error){
    console.log(error);
  }
});

// get inbbox
router.get('/inbox/:userId', (req, res) => {
  let params = {
    userId : req.params.userId
  }

  try {
    mailController.getAllUserMail(params).then(inbox => res.send(inbox))
  } catch (error) {
    console.log(Error)
  }
});

// get sent messages
router.get('/sent/:userId', (req, res) => {
  let params = {
    userId : req.params.userId
  }

  try {
    mailController.getAllSentMail(params).then(inbox => res.send(inbox))
  } catch (error) {
    console.log(Error)
  }
});



module.exports = router;
