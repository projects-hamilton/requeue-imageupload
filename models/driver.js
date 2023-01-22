const mongoose = require('mongoose');

const DriversProfilesSchema = mongoose.Schema({

    driver_name: {
        type: String,
      },
      
      driver_images: {
        type: String,
      },

      driver_id: {
        type: String,
      },

    driver_group: {
        type: String,
        Comment:"A1,A2,B3,A3"
    },

    time:{
        type:String
    },

    date: {
      type:String
    },

    monthly_target:{
      type:String
    },
  
    fix_slary:{
      type:String
    },
    company_id:{
      type:String
    }


},{ timestamps: true });

module.exports = mongoose.model("Drivre", DriversProfilesSchema);

