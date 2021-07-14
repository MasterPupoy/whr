const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const fileController = require('./controllers/fileControllers');

require('dotenv').config();

const DB_URI = process.env.DB_URI;
const PORT = 4003;

app.use(cors());
app.use(fileUpload());


mongoose.connect(`${DB_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
}).catch(err => console.log(err));

mongoose.connection.once('open', () => console.log('Connected to MongoDB atlas'));

// upload file then save to database
app.post('/upload/:applicant_id', async (req, res) => {
 
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }

  // Accessing the file by the <input> File name="target_file"
  // append millisecond value to avoid duplication
  let targetFile = req.files.file;
  let millis = new Date().getMilliseconds();
  let filename = `${millis}_${req.files.file.name.replace(/\s/g, "")}`

 
  //mv(path, CB function(err))
  targetFile.mv(path.join(__dirname, 'uploads', filename), (err) => {
    if (err){
      return res.status(500).send(err);
    };

    let pathToFile = path.join('uploads', filename);
    // req.body contains the applicant ID
    let params = {
    applicant_id : req.params.applicant_id,
    path : pathToFile
    };

    let success = fileController.resumeUpload(params).then(applicant => applicant);

    if(success){
     return res.status(200).send('Horrayy!');
    }
  });
  
});

app.get('/file', (req, res) => {
  res.download(req.query.path)
});

app.listen(PORT, () => {
  console.log(`File service running on PORT : ${PORT}`);
});
