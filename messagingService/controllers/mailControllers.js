const nodemailer = require('nodemailer');
const Mail = require('../models/message');
const Employee = require('../models/Employee');
const { clientKey, clientSecret, refreshToken } = require('../utils');

module.exports.sendEmail = async (params) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      //type: 'OAuth2',
      user: params.user,
      pass: params.password,
      //clientId: clientKey,
      //clientSecret: clientSecret,
      //refreshToken: refreshToken
    }
  });

  let mail = {
    from: params.user,
    to: params.reciever,
    subject: params.subject,
    text: params.message
  };

  transporter.verify((err, success) => {
    if(err){
      console.log(err);
    }else{
      console.log('Email verified');
    }

  })

  const mailStat = await transporter.sendMail(mail, (err, data) => {
    if(err){
      console.log(err)
    }

    console.log(data);
  });

  return mailStat.messageId;
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
    data: params.date
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
