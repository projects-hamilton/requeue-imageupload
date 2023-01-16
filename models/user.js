
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  firstname:{
    type:String},

  lastname:{type:String},

  role:{type:String},

  password: { type: String},

  email:{type:String},

  mobile: {
    type: String,
    // allowNull: false
},

  is_mobile_verified: {
    type: Boolean,
    default: false
  },

  profile_image: {
    type: String
  },
  dob: {
    type: String
  },
  
  latitude: {
    type:String,
},
company_id:{
  type:String
},

longitude: {
    type:String,
},

  role: {
    type: String,
    comment: "Supervisor, Maintainers, ADMIN, DRIVER,Company"
  },

  country: {
    type: String,
    comment: "Kuwait = KW, UAE= AE, SAUDI ARAB = SA, Oman = OM, QATAR = QA, Baharain = BH"
  },
  confirmPassword:{
    type:String
  },
  otp: { type: String, required: true },

}, { timestamps: true });


module.exports = mongoose.model("user", userSchema);


