const mongoose = require('mongoose');

const InvoiceDetailsschema = mongoose.Schema({

  firstname: {
        type: String,
      },
      
      lastname: {
        type: String,
        
      },

      driver_id: {
        type: String,
      },

    email: {
        type: String,
    },

    mobile:{
        type:String
    },

    today_total_delevery:{
      type:String
    },
    
  total_amount:{
      type:String,
    },


    date:{
      type:String
    },
    Company_id:{
      type:String
    }


},{ timestamps: true });


module.exports = mongoose.model("Invoice", InvoiceDetailsschema);


