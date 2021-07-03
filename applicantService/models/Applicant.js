const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicantSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId, ref: 'Company'
  },
  job_id: {
    type: Schema.Types.ObjectId, ref: 'Job'
  },
  first_name: {
    type : String
  },
  last_name: {
    type: String
  },
  date_of_birth: {
    type : Date
  },
  gender: {
    type: String
  },
  phone_numbers: [{
    type: Number
  }],
  designation: {
    type: String
  },
  application_status: {
    type: Number
  },
  applied_on:{
    type: String,
    default: new Date().toString()
  },
  rejected: {
    type: Boolean
  },
  hired: {
    type: Boolean
  },
  hired_on:{
    type: String
  },
  official_email: {
    type: String 
  },
  personal_email: {
    type: String  
  },
  resume: {
    type: String
  },
  address: {
   street: {
     type: String
   },
   province: {
     type: String
   },
   city: {
     type: String
   },
   country_code: {
     type: String
   },
   zip_code: {
    type: String
   }
  },
  expected_compensation: {
    type: String,
    default: 'n/a'
  },
  message: {
    type: String,
    default: 'n/a'
  },
  experiences: [{
     company: {
       type: String 
     },
     position: {
       type: String
     },
     date_started: {
       type: String
     },
     date_ended: {
       type: String
     }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Applicant', applicantSchema, 'Applicants');