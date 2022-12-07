
const mongoose = require("mongoose");

const InvoiceSetailsSchema = new mongoose.Schema({

    invoice_address: {
        type: String,
      },
      
      itmes: {
        type: String,
      },

      amount: {
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

    Date:{
        type:String
    }


}, { timestamps: true });

module.exports = mongoose.model("Invoice", InvoiceSetailsSchema);
