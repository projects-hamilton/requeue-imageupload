const mongoose = require('mongoose');

const VehicleDetailsschema = mongoose.Schema({
   
      Vehicle_type: {
        type: String,
      },

      imgUrl: {
        type: String,
        comment:"image/png', 'image/jpeg', 'image/jpg",
      },

      vehicle_id: {
        type:String,
    },

    Vehicle_Company_Name :{
        type:String
    },

    Vehicle_number:{
      type:String
    },
    Vehicle_model:{
      type:String
    }



},{ timestamps: true });

module.exports = mongoose.model("vehicle ", VehicleDetailsschema);


