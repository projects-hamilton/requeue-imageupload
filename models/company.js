const mongoose = require('mongoose');

const CompanyProfilesSchema = mongoose.Schema({

    Company_Name:{
      type:String
    },

    Company_Address:{
      type:String
    },

  company_email:{
    type:String
  },
  Company_id:{
    type:String
  }

},{ timestamps: true });


module.exports = mongoose.model("Company_Profiles", CompanyProfilesSchema);





