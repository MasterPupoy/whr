const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
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
  designation: {
    type: String
  },
  joining_date: {
    type: Date
  },
  termination_date: {
    type: String
  },
  terminated: {
    type: String
  },
  status: {
    type: String
  },
  official_email: {
    type: String 
  },
  personal_email: {
    type: String  
  },
  team_id: {
    type: Schema.Types.ObjectId, ref: 'Teams'
  },
  // "department_id": 1,
  // "sub_department_id": 1,
  // "business_unit_id": 4,
  // "reporting_to_id": 3,
  // "hr_incharge_id": 3,
  // "shift_id": 1,
  // "address": {
  //   "street": "1312 Pape Avenue",
  //   "state": "Ontario",
  //   "city": "Toronto",
  //   "country_code": "CA",
  //   "zip_code": ""
  // },
  // "communication_address": {
  //   "communication_street": "1312 Pape Avenue",
  //   "communication_state": "Ontario",
  //   "communication_city": "Toronto",
  //   "communication_country_code": "CA",
  //   "communication_zip_code": "",
  //   "same_as_residential": false
  // },
  // "custom_field_values":{
  //   "hobbies_cf_str01":null,
  //   "citizenship_cf_str02":{"id":0,"value":null}
  // },
  // "team": {
  //   "id": 3000043460,
  //   "created_at": "2019-09-15T09:17:43.000Z",
  //   "updated_at": "2019-09-15T09:17:43.000Z",
  //   "deleted": false,
  //   "name": "Business"
  // }
}); 