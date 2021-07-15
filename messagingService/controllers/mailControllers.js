const nodemailer = require('nodemailer');
const Mail = require('../models/message');
const Employee = require('../models/Employee');
const { clientKey, clientSecret, refreshToken } = require('../utils');
const Imap = require('imap');
const parser = require('mailparser').simpleParser;
const inspect = require('util').inspect;

module.exports.sendEmail = async (params) => {

  let transporter = nodemailer.createTransport({
    host: 'mail.socialme.com',
    port: 465,
    secure: true,
    auth: {
      user: params.user,
      pass: params.password,
    },
    tls: {
    rejectUnauthorized: false
  }
  }); 

  let mail = {
    from: params.user,
    to: params.reciever,
    subject: params.subject,
    html: params.message
  };

  transporter.verify((err, success) => {
    if(err){
      console.log(err);
    }else{
      console.log(success);
    }
  });

  transporter.sendMail(mail, (err, data) => {
    if(err){
      console.log(err)
    }

    return data;
  });

  
};

// seen message 
module.exports.seen = (params) => {
   const imap = new Imap({
    user: params.user,
    password: params.password,
    host: 'mail.socialme.com',
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized : false
    }
  })

  let emails;
  imap.once('ready', () => {
    console.log(`connected to imap server`)
    imap.openBox('INBOX', (err, box) => {
      if(err){
        console.log(err)  
      }
      
      console.log(box)
      imap.search(['ALL'], (err, result) => {
        
        const f = imap.fetch(result, {
          bodies : ['HEADER.FIELDS (FROM)']
        })

        f.on('message', (msg, seq) => {
          console.log(`message #%d`, seq)

          msg.on('body', (stream) => {
            let message = ''

            stream.on('data', (chunk) => {
              message += chunk
            })

            stream.on('end', () => {
              
              parser(message)
              .then(parsed => {
               console.log(parsed)
                return parsed
              }).catch(err => console.log(err));
            
            })

          })

          msg.on('attributes', (attr) => {
            console.log('Attributes' + inspect(attr, false, 8))
          })
        })

        f.once('end', () => {
          console.log('Fetched all messages')
          imap.end()
        })
      })
      

    })
  })

  imap.once('err', (err) => {
    console.log(err)
  })

  imap.connect()
}

// get email inbox
module.exports.inbox = async (params) => {

  const imap = new Imap({
    user: params.user,
    password: params.password,
    host: 'mail.socialme.com',
    port: 993,
    tls: true,
    tlsOptions: {
      rejectUnauthorized : false
    }
  })

  imap.once('ready', () => {
    console.log(`connected to imap server`)
    imap.openBox('INBOX', (err, box) => {
      if(err){
        console.log(err)  
      }
      
      return imap.search(['ALL'], (err, result) => {
        
        const f = imap.fetch(result, {
          bodies : ['HEADER.FIELDS (FROM)']
        })

        f.on('message', (msg, seq) => {
          console.log(`message #%d`, seq)
          msg.on('body', (stream) => {
            let message = ''

            stream.on('data', (chunk) => {
              message += chunk
            })

            stream.on('end', () => {
              
              parser(message)
              .then(parsed => {
               console.log(parsed)
                return parsed
              }).catch(err => console.log(err));
            })
          })

          msg.on('attributes', (attr) => {
            console.log('Attributes' + inspect(attr, false, 8))
          })
        })

        f.once('end', () => {
          console.log('Fetched all messages')
          imap.end()
        })
      }) 
    })
  })

  imap.once('err', (err) => {
    console.log(err)
  })

  imap.connect()

}

// send message locally
module.exports.sendMessage = (params) => {
  let newMail = new Mail({
    from: params.from,
    to: params.to,
    subject: params.subject,
    type: params.type,
    content: params.content,
    unread: true,
    date: params.date
  });

  return newMail.save().then((mail, err) => (err) ? console.log(err) : true) 
};

// set as read
module.exports.setToRead = (params) => {
  return Mail.findByIdAndUpdate(params.mailId, {
    $set : {
      unread: false
    }
  }).then((mail, err) => (err) ? console.log(err) : true);
};

// get inbox
module.exports.getAllUserMail = (params) => {
  return Mail.find({ to : params.userId}).populate('from').then((mail, err) => {
    if(err) {
      console.log(err)
    }
    return mail;
  })
};

// get sent messages
module.exports.getAllSentMail = (params) => {
  return Mail.find({ from : params.userId}).populate('to').then((mail, err) => {
    if(err) {
      console.log(err)
    }

    return mail;
  });
};
