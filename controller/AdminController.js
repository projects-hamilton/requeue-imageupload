
const User = require("../models/user");
const jwt = require("jsonwebtoken");
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


function storedetails(status, message, res, data) {
  res.status(status).json({ message, data });
}

const AddUsers = async (req, res) => {
  try {
    let search = Storedata(
      [
        "firstname",
        "password",
        "lastname",
        "email",
        "mobile",
        "country",
        "confirmPassword",
        "role"
      ],
      req.body
    );
    if (search[0] == false)
      return res
        .status(400)
        .json({ message: `${search[1]} Field Required`, data: [] });


    const {
      firstname,
      password,
      email,
      lastname,
      country,
      mobile,
      confirmPassword,
      role
    } = req.body;


    const oldUser = await User.findOne({ email, Company_id: req.company_id });
    if (oldUser)
      return storedetails(400, "User Already Exist. Please Login", res, []);


    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Passowrd does not match",
      });


    if (
      ["Supervisor", "Maintainers", "ADMIN", "DRIVER", "Company"].indexOf(
        req.body.role
      ) === -1
    ) {
      return res
        .status(400)
        .json({ message: "role must be either DRIVER or STORE or ADMIN" });
    }
    if (req.body.role == "DRIVER") {
      let search = Storedata([
        "Vehicle_type",
        "Vehicle_Company_Name",
        "Vehicle_number",
        "Vehicle_model",], req.body);
      if (search[0] == false)
        return res
          .status(400)
          .json({ message: `${search[1]} Field Required`, data: [] });


      if (
        ["BIKE", "SMALL_CAB", "BIG_CAB", "MINI_TRUCK", "BIG_TRUCK"].indexOf(
          req.body.motor_type
        ) == -1
      ) {
        return res.status(400).json({
          message:
            "motorType must be either BIKE or SMALL_CAB or BIG_CAB or MINI_TRUCK or BIG_TRUCK",
        });
      }
    }

    const hashedPassword = await encrypt(password);
    const otpGenerated = Math.floor(100000 + Math.random() * 9000);
    console.log(otpGenerated, "otp here");


    let user = await User.create({
      firstname,
      password: hashedPassword,
      email,
      lastname,
      country,
      mobile,
      otp: otpGenerated,
      role,
      company_id: req.company_id
    });
    user = await User.findById(user._id).select(['-password', '-otp'])
    let mail = await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    if (req.body.role == "DRIVER") {
      const {
        Vehicle_type,
        Vehicle_Company_Name,
        Vehicle_number,
        Vehicle_model } = req.body;

      const GetDrivesDetails = await DriverDetails.create({
        driver_id: user._id,
        Vehicle_type,
        Vehicle_Company_Name,
        Vehicle_number,
        Vehicle_model,

      });

      res.status(201).json({ user, GetDrivesDetails });
    }
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//getUsers
const getUsers = async (req, res) => {
  let currentpage = req.query.page ? req.query.page : 1
  let pagelimit = req.query.pagelimit ? req.query.pagelimit : 5
  let page = currentpage * pagelimit - pagelimit;
  try {
    const getUserDetails = await User.find({ Company_id: req.company_id }).limit(pagelimit).skip(page).select(['-password', '-otp']);
    let count = await User.find().count()
    if (!getUserDetails) {
      res.json({ message: "there is no data ", status: false });
    }
    res.json({
      message: "Found  details ",
      data: getUserDetails,
      totaldata: count,
      currentpage,
      pagelimit,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//Delete APIS
const DeleteUsers = async (req, res) => {
  try {
    const DeleteUserDetails = await User.findOneAndDelete({
      _id: req.params.id,
    });
    if (!DeleteUserDetails) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({
        message: "successfully",
        status: true,
      });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};


//editVechileDetails-ApIS
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

const EditUsers = async (req, res) => {
  try {
    let search = Storedata(
      [
        "firstname",
        "lastname",
        "email",
        "mobile",
        "country"
      ],
      req.body
    );

    let userid = req.params.id
    if (search[0] == false)
      return res.status(400).json({ message: `${search[1]} Field Required`, data: [] });

    const {
      firstname,
      email,
      lastname,
      country,
      mobile
    } = req.body;

    const oldUser = await User.findOne({ _id: userid, Company_id: req.company_id });
    if (!oldUser) return storedetails(400, "User Not found", res, []);
    let user = await User.findOneAndUpdate({ _id: oldUser._id }, {
      firstname,
      email,
      lastname,
      country,
      mobile
    });
    user = await User.findById(user._id).select(['-password', '-otp'])
    res.status(201).json({ message: "Updated-Usres", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  getUsers,
  AddUsers,
  DeleteUsers,
  editVechileDetails,
  DaiyAndMonthlyReport,
  EditUsers


};

