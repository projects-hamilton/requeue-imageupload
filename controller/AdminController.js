const User = require("../models/user");
const DriverDetails = require("../models/driver-business-detail");
const DeliveryDeatils = require("../models/delivery ");
const Walltes = require("../models/wallet");
const { encrypt } = require("../services/crypto");
const { sendMail } = require("../services/MAIL");

const moment = require('moment');

//fUNCTION
const Storedata = (search, data) => {
  for (let i = 0; i < search.length; i++) {
    if (
      data[search[i]] == "" ||
      data[search[i]] == undefined ||
      data[search[i]] == null
    ) {
      return [false, search[i]];
    }
  }
  return [true, ""];
};



//VechilePostapi

const editVechileDetails = async (req, res) => {
  try {
    let Search = Storedata(
      [
        "Vehicle_type",
        "Vehicle_Company_Name",
        "Vehicle_number",
        "driver_id",
        "Vehicle_model",
      ],
      req.body
    );

    if (Search[0] == false) return res.status(400).json({ message: `${Search[1]} Field Required`, data: [] });

    const GetBechileDetais = await DriverDetails.findOneAndUpdate({ driver_id: req.body.driver_id }, req, body);
    res.status(200).json({
      message: "Data successfully",
      data: GetBechileDetais,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//DaiyAndMonthlyReport
const DaiyAndMonthlyReport = async (req, res) => {
  try {
    let date = new Date();
    let driver_id
    let monthlyReport = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);
    let dailyreport = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 0);

    // let UserDeatils = await User.findById(req.user);
    let UserDeatils = await User.findOne(
      { _id: req.user },
      { _id: 1, firstname: 1, email: 1 }
    );

    // console.log(req.user)
    const Daily_Delivery = await DeliveryDeatils.find({
      driver_id: req.user, createdAt: {
        $gte: dailyreport,
        $lt: date
      }
    });
    console.log(Daily_Delivery)

    const Monthly_Delivery = await DeliveryDeatils.find({
      driver_id: req.user, createdAt: {
        $gte: monthlyReport,
        $lt: date
      }
    });
    console.log(Monthly_Delivery)

    const GetAllReportsData = await DeliveryDeatils.find({ driver_id: req.user });
    const GetWalletdata = await Walltes.find(driver_id)
    res.status(200).json({
      message: "All Reports", UserDeatils,
      Monthly_Delivery: Monthly_Delivery.length,
      Daily_Delivery: Daily_Delivery.length, GetWalletdata,
    })

  } catch (error) {
    res.status(400).json({ message: error.message, status: false });


  }
}

module.exports = {
  editVechileDetails,
  DaiyAndMonthlyReport,

};

