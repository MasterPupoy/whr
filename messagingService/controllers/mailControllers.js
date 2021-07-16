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
      return (success);
    }
  });

  transporter.sendMail(mail, (err, data) => {
    if(err){
      console.log(err)
    }

    return data;
  }); 
};

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
