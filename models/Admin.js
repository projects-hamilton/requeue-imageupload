const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String},
  password: { type: String},
  createdby: { type: String },
  time : { type : Date, default: Date.now },
  Email:{type:String}

});


module.exports = mongoose.model("user", userSchema);