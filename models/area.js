
const mongoose = require("mongoose");

const AreaGroupSchema = new mongoose.Schema({

    location: {
        type: String,
      },
      
      user_id: {
        type: String,
      },


}, { timestamps: true });


module.exports = mongoose.model("Area", AreaGroupSchema);
