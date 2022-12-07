
const mongoose = require("mongoose");

const DriverGroupSchema = new mongoose.Schema({

    driver_id: {
        type: String,
      },
      area_id: {
        type: String,
      },
      Driver_Imgaes:{
        type:String
      },

}, { timestamps: true });


module.exports = mongoose.model("DriverMultplGroups", DriverGroupSchema);
