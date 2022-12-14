const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema(
  {
    driver_id: {
        type: String,
      },

    logo: {
      type: String,
      required: true,
    },

    business_email: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    pin: {
      type: String,
    },

    location: {
      type: String,
      required: true,
      coordinates: [],
    },
  },
  { timestamps: true }
);
StoreSchema.index({location:"2dsphere"});
module.exports = mongoose.model("Store", StoreSchema);
