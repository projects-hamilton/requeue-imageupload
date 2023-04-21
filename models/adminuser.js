const mongoose = require('mongoose');

const adminuserSchema = mongoose.Schema({

  password: {
    type: String
  },
  email: {
    type: String
  }
}, { timestamps: true });


module.exports = mongoose.model("adminuser", adminuserSchema);





