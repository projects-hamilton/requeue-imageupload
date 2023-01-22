const mongoose = require("mongoose");

const DriverBusinessDetailsSchema = new mongoose.Schema(
  {

    driver_id: {
      type: String,
    },

    Vehicle_type: {
      type: String,
    },

    Vehicle_Company_Name: {
      type: String
    },

    Vehicle_Company_Name: {
      type: String
    },
    Vehicle_type: {
      type: String,
    },
    Vehicle_number: {
      type: String
    },
    Vehicle_model: {
      type: String
    },

  status:{
    type:String
  },
  Company_id:{
    type:String
  },

    is_approved: {
      type: Boolean,
      defaultValue: false
  },
    
    location:{type:String}
  },
  
  {
    modelName: "DriverBusinessDetails",
    timestamps: true,
    freezeTableName: true,
  },

);

module.exports = mongoose.model("DriverDetails", DriverBusinessDetailsSchema);


