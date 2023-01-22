const User = require("../models/user");
const DriverDetails = require("../models/driver-business-detail");
const DeliveryDeatils = require("../models/delivery ");
const Walltes = require("../models/wallet");
const { encrypt } = require("../services/crypto");


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






const DeleteDriverDetails = async (req, res) => {
  try {
    const DeleteDrivers = await DriverDetails.findOneAndDelete({
      _id: req.params.id,
    });
    if (!DeleteDrivers) {
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


    const GetAreaDetais = await DriverDetails.findOneAndUpdate({ driver_id: req.body.driver_id }, req, body);
    res.status(200).json({
      message: "Data successfully",
      data: GetAreaDetais,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};




// //DriversProfiles
// const AddAnyDrivers = async (req, res) => {
//   try {
//     let Search = Storedata(
//       ["driver_name", "driver_id", "driver_group", "date"],
//       req.body
//     );
//     console.log(req.file);
//     const path = req.file.originalname;

//     if (!path) throw new Error("no  images file");

//     console.log(path);

//     if (Search[0] == false)
//       return res
//         .status(400)
//         .json({ message: `${Search[1]} Field Required`, data: [] });
//     const { driver_name, driver_id, driver_group, date } = req.body;
//     let allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
//     if (allowedMimeTypes.indexOf(req.file.mimetype) == -1) {
//       res.status(400).json({ message: "imgUrl must be Jpg,png,only" });
//     }
//     // else{
//     //   res.status(400).json({messag:"imgUrl Is missing"})
//     // }
//     const GetAreaDetais = await DriverProfiles.create({
//       driver_group,
//       driver_name,
//       driver_id,
//       date,
//       driver_images: path,
//       Date,
//       time: moment().format("llll"),
//     });
//     // console.log(GetAreaDetais)
//     res.status(200).json({
//       message: "Drivers profiles  successfully",
//       data: GetAreaDetais,
//       status: true,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message, status: false });
//   }
// };

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



module.exports = {
  // SearchAnyUserNamew,
  // getUsers,
  // AddUsers,
  // DeleteUsers,
  DeleteDriverDetails,
  // AddVechileDetails,
  // GetAllDriverDetails,
  // EditVechileDetails,
  // DeleteVichle,
  // AddAnyDrivers,
  DaiyAndMonthlyReport,
  UpdatedDriverProfiles,
  // GetUserCompanyDetails
  // exportUsers,

};
