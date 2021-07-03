const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = Schema({
    company_id: {
      type: Schema.Types.ObjectId, ref: 'Company'
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    status: {
      type: String, 
      default: 'published'
    },
    closed:{
      type: Boolean,
      default: false
    },
    salary: {
      type: String,
      default: 'Confidential'
    },
    applicant_access_type: {
      type: String,
      default: 'open'
    },
    remote: {
      type: Boolean,
      default: false
    },
    setup: {
      type: String
    },
    experience: {
      type: String,
      default: 'Mid level'
    },
    type: {
      type: String,
      deault: 'regular'
    },
    applications: {
      type: Number,
      default: 0
    },
    posted_by: {
      type: String
    }     
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema, 'Jobs')