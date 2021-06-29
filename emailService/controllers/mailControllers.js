const nodemailer = require('nodemailer');
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