
const mongoose = require("mongoose");

const InvoiceSetailsSchema = new mongoose.Schema({

    invoice_address: {
        type: String,
      },
      
      itmes: {
        type: Array,
        default: [],
      },
      amount_type: {
        type: String,
        comment: "KWD,INR",
      },
      

      date: {
        type: String,
      },


      get_value: {
        type: String
      },

      transation: {
        type:String,
    },

    driver_id:{
      type:String

    },
    Invoice_number:{
      type:Number
    }

    

}, { timestamps: true });

module.exports = mongoose.model("Invoice", InvoiceSetailsSchema);
