const mongoose = require('mongoose');

const Notificationschema = mongoose.Schema({
  
    status: {
        type: String,
        default:null
    },

    date:{
      type:String
    },

    userid:{
      type:String
    },

  msg:{
    type:String

  },

  link:{
    type:String
  },
  Company_id:{
    type:String
  }


},{ timestamps: true });

module.exports = mongoose.model("Notification", Notificationschema);



