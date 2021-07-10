const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
  company_id: {
    type: Schema.Types.ObjectId, ref: 'Company'
  },
  owner: {
    type: Boolean,
    default: false
  },
  access_level: {
    type: Number,
  },
  employee_id: {
    type: String
  },
  employee_type: {
    type: String
  },
  first_name: {
    type : String
  },
  last_name: {
    type: String
  },
  nick_name: {
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
  remote: {
    type: Boolean,
    default: false
  },
  designation: {
    type: String
  },
  joining_date: {
    type: Date,
    default: new Date()
  },
  termination_date: {
    type: Date
  },
  terminated: {
    type: Boolean,
    default: false
  },
  status: {
    type: String
  },
  official_email: {
    type: String 
  },
  password: {
    type: String
  },
  personal_email: {
    type: String  
  },
  team_id: {
    type: Schema.Types.ObjectId, ref: 'Company'
  },
  department_id: {
    type: Number
  },
  business_unit_id: {
    type: Number
  },
  shift_id: {
    type: Number
  },
  address: {
   street: {
     type: String
   },
   state: {
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
  compensation: {
    type: String
  },
  last_login : {
    type: String,
  },
  last_logout : {
    type: String,
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Employee', employeeSchema)