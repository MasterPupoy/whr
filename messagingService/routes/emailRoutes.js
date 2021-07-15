const router = require('express').Router();
const mailController = require('../controllers/mailControllers');
const Imap = require('imap');
const imaps = require('imap-simple');
const _ = require('lodash');


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

router.post('/inbox', async (req, res) => {
  const config = {
    imap: {
      user: req.body.user,
      password: req.body.password,
      host: 'mail.socialme.com',
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized : false
      }
    }
  }

  imaps.connect(config).then(connection => {
    return connection.openBox('INBOX').then( async () => {
      const search = ['ALL'];
      const fetchOp = {
        bodies: ['']
      }

      let emails = await connection.search(search, fetchOp).then(messages => {
        res.send(messages)
        imaps.end()
      })
    })
  })
})

router.post('/read/:uid', (req, res) => {
   const config = {
    imap: {
      user: req.body.user,
      password: req.body.password,
      host: 'mail.socialme.com',
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized : false
      }
    }
  }

  imaps.connect(config).then(connection => {
    return connection.openBox('INBOX').then( async () => {
      const search = ['ALL'];
      const fetchOp = {
        bodies: ['HEADER']
      }

      return connection.search(search, fetchOp).then(messages => {
        //insert add flag feature to message
      })
    })
  })

})

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
