
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  firstname: { type: String },
  lastname: { type: String },
  role: { type: String },
  password: { type: String },
  email: { type: String },
  mobile: { type: String },
  profile_image: { type: String },
  dob: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  company_id: { type: String },
  otp: { type: String, required: true },

  role: {
    type: String,
    comment: "Supervisor, Maintainers, ADMIN, DRIVER,Company"
  },
  

}, { timestamps: true });


module.exports = mongoose.model("user", userSchema);


