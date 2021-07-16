const router = require('express').Router();
const mailController = require('../controllers/mailControllers');
const Imap = require('imap');
const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const inspect = require('util').inspect;
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

//get mail inbox
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
        let mails = messages.map(item => {
          let all = _.find(item.parts, { "which": "" })
          let id = item.attributes.uid;
          let stat = item.attributes.flags.includes('\\Seen')
          let idHeader = `${id}\r\n`;
          let status = `${stat}\r\n`;

          return simpleParser(status+idHeader+all.body).then(mail => {
            return mail
          })
        })

        return Promise.all(mails)
      }).then(mails => {
        res.send(mails)
        connection.end()
      })
    })
  }).catch(err => console.log(err))
})

// set to read
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
      const search = [req.params.uid];
      const fetchOp = {
        bodies: ['']
      }

      return connection.addFlags(req.params.uid, '\\Seen', (mail, err) => {
        if(err){
          console.log(err)
        }

        console.log(mail)
      })
    })
  }).catch(err => console.log(err))

})

// delete email
router.post('/delete/:uid', (req, res) => {
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
      const search = [req.params.uid];
      const fetchOp = {
        bodies: ['']
      }

      return connection.deleteMessage(req.params.uid, (mail, err) => {
        if(err){
          console.log(err)
        }

        console.log(mail)
      })
    })
  }).catch(err => console.log(err))

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
