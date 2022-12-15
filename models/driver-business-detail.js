const mongoose = require("mongoose");

const DriverBusinessDetailsSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      autoIncrement: true,
    },
    
    otp: { type: String, required: true },
    driver_id: {
      type: String,
    },

    motor_type: {
      type: String,
      comment: "BIKE, SMALL_CAB, BIG_CAB, MINI_TRUCK, BIG_TRUCK",
    },

    address: {
      type: String,
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


