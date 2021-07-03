const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  company_name: {
    type: String
  },
  company_owner: {
    type: String
  },
  industry: {
    type: String
  },
  description: {
    type: String
  },
  company_address: {
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
  departments: [{
    type: String
  }],
  teams: [{
    team_name: {
      type: String
    },
    members: [{
      type: Schema.Types.ObjectId, ref: 'Employee'
    }],
  }],
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema, 'Companies');