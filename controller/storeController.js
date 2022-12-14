// require("../models/storeModel");
// const User = require("../models/user");
const Store = require("../models/store");
const DeliveryDeatils = require("../models/delivery ");

const Create_store = async (req, res) => {
  try {
    console.log(req.file);
    const path = req.file.originalname;

    if (!path) throw new Error("no  images file");

    // console.log(path);

    const userData = await DeliveryDeatils.findOne({ _id: req.body.driver_id });
    console.log(userData)

    if (userData) {
      if (req.body.latitude || req.body.longitude) {
        res.status(200).json({
          message: "data is missing",
          status: false,
        });
      } else {
        const VendorData = await Store.findOne({ _id: req.body.driver_id });
        if (VendorData) {
          res.status(200).json({
            message: "This User is used all ready ",
            status: false,
          });
        }
      }
    } else {
      const store = new Store({
        driver_id: req.body.driver_id,
        logo: path,
        business_email: req.body.business_email,
        address: req.body.address,
        pin: req.body.pin,
        location: {
          coordinates: [parseFloat(req.body.latitude)],
        },
      });
      const storData = await Store.create();
      res.status(200).json({
        message: "Stroree Data",
        data: storData,
        status: false,
      });
    }
    console.log(storData);
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = {
  Create_store,
};
