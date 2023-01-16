const mongoose = require('mongoose');

const CompanyProfilesSchema = mongoose.Schema({

  Company_Name: {
    type: String
  },

  Company_Address: {
    type: String
  },

  company_email: {
    type: String
  },

  company_id: {
    type: Number
  }

}, { timestamps: true });


module.exports = mongoose.model("Company_Profiles", CompanyProfilesSchema);





