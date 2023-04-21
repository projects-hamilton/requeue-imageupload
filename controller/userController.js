// const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const DriverDetails = require("../models/driver-business-detail");
const { encrypt } = require("../services/crypto");

const JWTkey = process.env.TOKEN_KEY;
require("dotenv");

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
    let search = Storedata(["firstname","password","dob","lastname","email","mobile","confirmPassword","role","profile_image"],req.body);
    if (search[0] == false) return res.status(400).json({ message: `${search[1]} Field Required`, data: [] });

    const { firstname, password, email, lastname, mobile, dob, confirmPassword, role, profile_image} = req.body;

    const oldUser = await User.findOne({ email, company_id: req.company_id });
    if (oldUser) return  res.status(400).json({ message: `User Already exist`, data: [] });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passowrd does not match",});

    if (["Supervisor", "Maintainers", "ADMIN", "DRIVER", "Company"].indexOf(req.body.role) === -1) {
      return res.status(400).json({ message: "role must be either DRIVER or STORE or ADMIN" });
    }
    if (req.body.role == "DRIVER") {
      let search = Storedata(["Vehicle_type","Vehicle_Company_Name","Vehicle_number","Vehicle_model",], req.body);
      if (search[0] == false) return res.status(400).json({ message: `${search[1]} Field Required`, data: [] });

      if ( ["BIKE", "SMALL_CAB", "BIG_CAB", "MINI_TRUCK", "BIG_TRUCK"].indexOf(req.body.motor_type) == -1) {
        return res.status(400).json({ message:"motorType must be either BIKE or SMALL_CAB or BIG_CAB or MINI_TRUCK or BIG_TRUCK",});
      }
    }

    const hashedPassword = await encrypt(password);
    const otpGenerated = Math.floor(100000 + Math.random() * 9000);
    console.log(otpGenerated, "otp here");

    let user = await User.create({
      firstname, profile_image, password: hashedPassword, dob, email, lastname, mobile, otp: otpGenerated, role, company_id: req.company_id

    });

    user = await User.findById(user._id).select(['-password', '-otp'])


    if (req.body.role == "DRIVER") {
      const { Vehicle_type, Vehicle_Company_Name, Vehicle_number, Vehicle_model } = req.body;
      const GetDrivesDetails = await DriverDetails.create({ driver_id: user._id, Vehicle_type, Vehicle_Company_Name, Vehicle_number, Vehicle_model});
      res.status(201).json({ user, GetDrivesDetails });
    }

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const DeleteUsersAll = async (req, res) => {
  console.log("enter")
  try {
    const DeleteUserDetails = await User.findOneAndDelete({_id: req.params.id,
    });
    if (!DeleteUserDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({message: "user removed",status: true,});
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};


const EditUsers = async (req, res) => {
  try {
    let search = Storedata(["firstname","lastname","email","mobile","profile_image"],req.body);

    let userid = req.params.id
    if (search[0] == false) return res.status(400).json({ message: `${search[1]} Field Required`, data: [] });

    const { firstname, email, lastname, profile_image, mobile} = req.body;

    const oldUser = await User.findOne({ _id: userid, company_id: req.company_id });
    if (!oldUser) return storedetails(400, "User Not found", res, []);

    let user = await User.findOneAndUpdate({ _id: oldUser._id }, {
      firstname,
      email,
      lastname,
      profile_image,
      mobile
    });

    user = await User.findById(user._id).select(['-password', '-otp'])

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const getUsers = async (req, res) => {
  let currentpage = req.query.page ? req.query.page : 1
  let pagelimit = req.query.pagelimit ? req.query.pagelimit : 5
  let page = currentpage * pagelimit - pagelimit;
  try {
    const getUserDetails = await User.find({ company_id: req.company_id }).limit(pagelimit).skip(page).select(['-password', '-otp']);
    let count = await User.find({ company_id: req.company_id }).count()
    if (!getUserDetails) {
      res.status(400).json({ message: "there is no data ", status: false });
    }
    res.status(200).json({
      message: "Found  details ",
      data: getUserDetails,
      totaldata: count,
      currentpage,
      pagelimit,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};


const GetSingleUser = async (req, res) => {
  try {
    const Userid = req.params.id;
    let user = await User.findOne({ _id:Userid }).select(['-password', '-otp']);
    if (user.role=="DRIVER") {
      let detail= await DriverDetails.find({driver_id:user._id})
      res
      .status(200)
      .json({ message: "User company Details", user,detail });
    }

    res
      .status(200)
      .json({ message: "User company Details", user });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


const EditVechileDetails = async (req, res) => {
  try {
    let search = Storedata(["Vehicle_type", "Vehicle_Company_Name", "Vehicle_number", "Vehicle_model",], req.body);
    if (search[0] == false) return res.status(400).json({ message: `${search[1]} Field Required`, data: [] });

    const { Vehicle_type, Vehicle_Company_Name, Vehicle_number, Vehicle_model } = req.body;

    let getResponce = await DriverDetails.findOneAndUpdate({ _id: req.params.id, }, { 
      Vehicle_type, 
      Vehicle_Company_Name, 
      Vehicle_number, 
      Vehicle_model

    });

    res.status(201).json({ message: "Update Vechiles Details", VehicleDetails: getResponce,status:true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const DeleteVehicleDetails = async (req, res) => {
  try {
    const DeleteUserDetails = await DriverDetails.findOneAndDelete({
      _id: req.params.id,
    });
    if (!DeleteUserDetails) {
      res.status(400).json({ message: "Enter the correct id", status: false });
    } else {
      res.status(200).json({ message: "Vehicle Details removed", status: true, });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

module.exports = {
  AddUsers,
  getUsers,
  GetSingleUser,
  EditUsers,
  DeleteUsersAll,
  EditVechileDetails,
  DeleteVehicleDetails
};



