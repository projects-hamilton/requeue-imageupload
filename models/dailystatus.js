
const mongoose = require("mongoose");

const DriverDailyStatusSchema = new mongoose.Schema({

    Total_Deliveries: {
        type: String,
      },
      
      Today_Deliveries: {
        type: String,
      },

      Cash_In_Hand: {
        type: String,
        comment: "KWD,INR",
      },
      

      Borrowed_Cash: {
        type: String,
      },


      Driver_Groups: {
        type: String,
        comment:"A1,A2,A3,B3,B2",
      },

      driver_id: {
        type:String,
    },

    Date:{
        type:String
    },
    company_id:{
      type:String
    }


}, { timestamps: true });


module.exports = mongoose.model("Status", DriverDailyStatusSchema);

