const mongoose = require('mongoose');

const DeliveryDetailsschema = mongoose.Schema({
    amount_Value: {
        type: String,
      },
      
      pay_type: {
        type: String,
        
      },

      driver_id: {
        type: String,
      },

    delivery_address: {
        type: String,
    },

    distance:{
        type:String
    },
    date:{
      type:String
    },
    
    status:{
      type:String,
      default:"pending"
    },

    photo:{
      type:String
    },

  itmes: {
  type: Array,
  default: [],
},

    picked_location:{
        type:String
    },


},{ timestamps: true });


module.exports = mongoose.model("Delivery", DeliveryDetailsschema);


