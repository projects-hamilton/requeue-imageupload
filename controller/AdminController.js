// const User = require('../models/user')
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const DriverDetails = require("../models/driver-business-detail");
const VehicleDetails = require("../models/vehicle ");
// const DriverDetailsAll = require('../models/driver-business-detail')
const DriverProfiles = require("../models/driver");
const DeliveryDeatils = require("../models/delivery ");
const Walltes = require("../models/wallet");
const { checkAPIHeaders } = require("../middilware/auth");


// const moment = require('moment');
// // const yesterday = moment();
// // console.log(yesterday.format());

// let today  = moment();
// console.log("today",today)

// let tomorrow  = moment().add(1,'days');
// console.log("tomorrow",tomorrow)

// let yesterday = moment().add(-1, 'days');
// console.log("yesterday",yesterday)

//SearchAnyUserNamew

const SearchAnyUserNamew = async (req, res) => {
  try {
    const { Name } = req.params;
    const getUserName = await User.find({
      firstname: { $regex: Name.toString(), $options: "i" },
    });
    if (!getUserName) {
      res.json({ message: "there is no Subject", status: false });
    }
    res.json({
      message: "Found  Mentor Subject",
      data: getUserName,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

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

//Add users
const AddUsers = async (req, res) => {
  try {
    let search = Storedata(
      [
        "firstname",
        "password",
        "lastname",
        "role",
        "email",
        "mobile",
        "country",
      ],
      req.body
    );
    if (search[0] == false)
      return res
        .status(400)
        .json({ message: `${search[1]} Field Required`, data: [] });

    const { firstname, password, email, lastname, country, mobile } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser)
      return storedetails(400, "User Already Exist. Please Login", res, []);

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
      let search = Storedata(["motor_type", "address", "id"], req.body);
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

    let encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      password: encryptedPassword,
      email,
      lastname,
      country,
      mobile,
    });

    if (req.body.role == "DRIVER") {
      const { motor_type, address, id } = req.body;
      const GetDrivesDetails = await DriverDetails.create({
        driver_id: user._id,
        motor_type,
        address,
        id,
      });

      const token = jwt.sign({ user }, process.env.TOKEN_KEY);
      res.status(201).json({ user, GetDrivesDetails, token });
    }

    const token = jwt.sign({ user }, process.env.TOKEN_KEY);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//getUsers
const getUsers = async (req, res) => {
  let page = req.query.page * 10 - 10;
  try {
    const getUserDetails = await User.find().limit(10).skip(page);
    if (!getUserDetails) {
      res.json({ message: "there is no data ", status: false });
    }
    res.json({
      message: "Found  details ",
      data: getUserDetails,
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

//DEleteDriversDetails
const DeleteDriverDetails = async (req, res) => {
  try {
    const DeleteDrivers = await DriverDetails.findOneAndDelete({
      _id: req.params.id,
    });
    if (!DeleteDrivers) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({
        message: "Drivers Details Deleted successfully",
        status: true,
      });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

//VechilePostapi

const AddVechileDetails = async (req, res) => {
  try {
    let Search = Storedata(
      [
        "Vehicle_type",
        "Vehicle_Company_Name",
        "Vehicle_number",
        "vehicle_id",
        "Vehicle_model",
      ],
      req.body
    );
    console.log(req.file);
    const path = req.file.originalname;

    if (!path) throw new Error("no  images file");

    console.log(path);

    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const {
      Vehicle_type,
      Vehicle_Company_Name,
      Vehicle_number,
      vehicle_id,
      Vehicle_model,
    } = req.body;
    let allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedMimeTypes.indexOf(req.file.mimetype) == -1) {
      res.status(400).json({ message: "imgUrl must be Jpg,png,only" });
    }
    // else{
    //   res.status(400).json({messag:"imgUrl Is missing"})
    // }
    const GetAreaDetais = await VehicleDetails.create({
      Vehicle_type,
      Vehicle_Company_Name,
      Vehicle_number,
      imgUrl: path,
      vehicle_id,
      Vehicle_model,
    });
    // console.log(GetAreaDetais)
    res.status(200).json({
      message: "Data successfully",
      data: GetAreaDetais,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//GetAllDriverDetails -Pending

// const GetAllDriverDetails = async (req, res) => {
//   try {
//     data1 = []
//     const arr = await DriverDetails.find();
//     // const arr2 = await VehicleDetails.find();
//     for (let i = 0; i < DriverDetails.length; i++) {
//       data4 = {}
//       data4["DriversDetails"] = await arr.find()
//       data1.push(data4)
//     }
//     // let newArr = Array.prototype.push.apply(arr, arr2);
//     // console.log(arr, "total values:", newArr);
//     res.status(200).json({
//       message: "SuccessFully-",
//       daat: arr,
//       status: true,
//     });

// let aiiobj = { ...GetAllDriversDetais, ...VechileDetailsAll };
// console.log(aiiobj, "rubi");

// for (let i = 0; i < GetAllDriversDetais.length; i++) {
//   let data6 = {};
//   data6["DriversDetails"] = await GetAllDriversDetais.find(
//     GetAllDriversDetais[i]
//   );
//   data6["VehicleDetails"] = await VehicleDetails.find(VechileDetailsAll[i]);
//   data2.push(data6);
// const VechileDetailsAll = await VehicleDetails.find();
// console.log(VechileDetailsAll,"rubi")

// for (let i = 0; i < VechileDetailsAll.length; i++) {
//   data6["VehicleDetails"] = await VehicleDetails.find(VechileDetailsAll[i])
//   data2.puus(data6)
// }
// data6["VehicleDetails"] = await VehicleDetails.find(VechileDetailsAll[i])

//     console.log(data6)
//}

//   } catch (error) {
//     res.send({ message: error.message, status: false });
//   }
// };

//Edit
const EditVechileDetails = async (req, res) => {
  try {
    let Search = Storedata(
      ["brand", "model", "power", "seats", "vehicle_id", "Date"],
      req.body
    );
    console.log(req.file);
    const path = req.file.originalname;

    if (!path) throw new Error("no  images file");

    console.log(path);

    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { brand, model, power, seats, vehicle_id, Date } = req.body;
    let allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedMimeTypes.indexOf(req.file.mimetype) == -1) {
      res.status(400).json({ message: "imgUrl must be Jpg,png,only" });
    }
    // else{
    //   res.status(400).json({messag:"imgUrl Is missing"})
    // }
    const GetAreaDetais = await VehicleDetails.findOneAndUpdate(
      { _id: req.params.id },
      {
        brand,
        model,
        power,
        seats,
        imgUrl: path,
        vehicle_id,
        Date,
      }
    );
    // console.log(GetAreaDetais)
    res.status(200).json({
      message: "Data Updated successfully",
      data: GetAreaDetais,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

const DeleteVichle = async (req, res) => {
  try {
    const DeleteVihcileDetails = await VehicleDetails.findOneAndDelete({
      _id: req.params.id,
    });
    if (!DeleteVihcileDetails) {
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

//DriversProfiles

const AddAnyDrivers = async (req, res) => {
  try {
    let Search = Storedata(
      ["driver_name", "driver_id", "driver_group", "date"],
      req.body
    );
    console.log(req.file);
    const path = req.file.originalname;

    if (!path) throw new Error("no  images file");

    console.log(path);

    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { driver_name, driver_id, driver_group, date } = req.body;
    let allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (allowedMimeTypes.indexOf(req.file.mimetype) == -1) {
      res.status(400).json({ message: "imgUrl must be Jpg,png,only" });
    }
    // else{
    //   res.status(400).json({messag:"imgUrl Is missing"})
    // }
    const GetAreaDetais = await DriverProfiles.create({
      driver_group,
      driver_name,
      driver_id,
      date,
      driver_images: path,
      Date,
      time: moment().format("llll"),
    });
    // console.log(GetAreaDetais)
    res.status(200).json({
      message: "Drivers profiles  successfully",
      data: GetAreaDetais,
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

    const GetAllReportsData = await DeliveryDeatils.find({driver_id: req.user});
    const GetWalletdata = await Walltes.find(driver_id)
    res.status(200).json({
      message: "All Reports", UserDeatils,
      Monthly_Delivery: Monthly_Delivery.length,
      Daily_Delivery: Daily_Delivery.length,GetWalletdata,
    })

  } catch (error) {
    res.status(400).json({ message: error.message, status: false });

  }
}




//Upadte-Amount
const UpdatedDriverProfiles = async (req, res) => {
  try {
    let Search = Storedata(["driver_id", "amount_Value"], req.body);
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { driver_id, amount_Value } = req.body;
    const UpdateedAmount = await Transition.findOneAndUpdate(
      { _id: req.params.id },
      { driver_id, amount_Value }
    );
    res.status(200).json({
      message: "Update Amount Successfully",
      data: UpdateedAmount,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//easch user his company 
const GetUserCompanyDetails = async (req, res) => {
  try {
    // const Company_id = req.params.id;
    const user = await User.find({Company_id:req.Company_id });
    res
      .status(200)
      .json({ message: "User company Details", user});
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


// const GetUserCompanyDetails = async(req,res)=>{
//   try {
//     // const company_id = req.params.company_id
//     let id = req.params.Company_id;

//     const GetDetails = await User.findById(id);
//     // console.log(GetDetails)
//     // for (let index = 0; index < GetDetails ,index++;) {
//     //   const element = GetDetails[index];
//     //   console.log(element)
      
//     // }
//     res.status(200).json({message:"Company Details",data:GetDetails})

    
//   } catch (error) {
//     res.status(400).json({ message: error.message, status: false });
//   }
// }

module.exports = {
  SearchAnyUserNamew,
  getUsers,
  AddUsers,
  DeleteUsers,
  DeleteDriverDetails,
  AddVechileDetails,
  // GetAllDriverDetails,
  EditVechileDetails,
  DeleteVichle,
  AddAnyDrivers,
  DaiyAndMonthlyReport,
  UpdatedDriverProfiles,
  GetUserCompanyDetails
  // exportUsers,

};
