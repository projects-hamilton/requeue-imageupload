const DriverGrouops = require("../models/driver-group");
const AreaDetails = require("../models/area");
const User = require("../models/user");
const DriverDailyStatus = require("../models/dailystatus");
const DriverDetailsAll = require("../models/driver-business-detail");
const VehiclAllDetails = require("../models/vehicle ");
const Walltes = require("../models/wallet");
const DeliveryDeatils = require("../models/delivery ");
const DriverProfiles = require('../models/driver')
// const { read } = require("xlsx");

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

//DriverMultpleGroupPost
const DriverMultpleGroupPost = async (req, res) => {
  try {
    let Search = Storedata(["driver_id", "area_id"], req.body);
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { driver_id, area_id } = req.body;
    const GetDriverGroups = await DriverGrouops.create({ driver_id, area_id });
    res.status(200).json({
      message: "Data successfully",
      data: GetDriverGroups,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//Edit
const UpdatedDriverMultipleGroups = async (req, res) => {
  try {
    let Search = Storedata(["driver_id", "area_id"], req.body);
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { driver_id, area_id } = req.body;
    const GetDriverGroups = await DriverGrouops.findOneAndUpdate(
      { _id: req.params.id },
      { driver_id, area_id }
    );
    res.status(200).json({
      message: "Update Data  successfully",
      data: GetDriverGroups,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



//Delete
const DeleteDriverGroupsByID = async (req, res) => {
  try {
    const GetDetails = await DriverGrouops.findOneAndDelete({
      _id: req.params.id,
    });
    if (!GetDetails) {
      res.status(403).json({ message: "Enter the correct id", status: false });
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



//GetDrevier
const GetDriversGroups = async (req, res) => {
  console.log("hhhh");
  try {
    let data1 = [];
    const getDriverGroup = await DriverGrouops.find();
    // let data5 = {}
    // for (let i = 0; i < getDriverGroup.length; i++) {
    //   data5[getDriverGroup[i].area_id] = [...data5[getDriverGroup[i].area_id] ? data5[getDriverGroup[i].area_id]:[], getDriverGroup[i].driver_id]

    // }

    // console.log(data5)
    for (let i = 0; i < getDriverGroup.length; i++) {
      let data2 = {};
      data2["Area"] = await AreaDetails.find({
        _id: String(getDriverGroup[i].area_id),
      });
      data2["user"] = await User.find({
        _id: String(getDriverGroup[i].driver_id),
      });

      data1.push(data2);
    }
    res.status(200).json({ message: "Successfully", data1, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//DriverMultpleGroupPost
const AddArea = async (req, res) => {
  try {
    let Search = Storedata(["location", "user_id"], req.body);
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { location, user_id } = req.body;
    const GetAreaDetais = await AreaDetails.create({ location, user_id });
    res.status(200).json({
      message: "Data successfully",
      data: GetAreaDetais,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//Edit
const UpdatedArea = async (req, res) => {
  try {
    let Search = Storedata(["location", "user_id"], req.body);
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const { location, user_id } = req.body;
    const GetAreaDetais = await AreaDetails.findOneAndUpdate(
      { _id: req.params.id },
      { location, user_id }
    );
    res.status(200).json({
      message: "Update Data  successfully",
      data: GetAreaDetais,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//Delete
const DeleteArea = async (req, res) => {
  try {
    const GetAreaDetais = await AreaDetails.findOneAndDelete({
      _id: req.params.id,
    });
    if (!GetAreaDetais) {
      res.status(403).json({ message: "Enter the correct id", status: false });
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


//GetAllLocation
const GetAllLocation = async (req, res) => {
  try {
    const GetAreaDetais = await AreaDetails.find();
    res
      .status(200)
      .json({ message: "SuccessFully-", status: true, data: GetAreaDetais });
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

//dailystatusofthedriver
const dailystatusofthedriver = async (req, res) => {
  try {
    let Search = Storedata(
      [
        "Total_Deliveries",
        "Today_Deliveries",
        "Cash_In_Hand",
        "Borrowed_Cash",
        "Driver_Groups",
        "driver_id",
        "Date",
      ],
      req.body
    );
    const {
      Total_Deliveries,
      Today_Deliveries,
      Cash_In_Hand,
      Borrowed_Cash,
      Driver_Groups,
      driver_id,
      Date,
    } = req.body;
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });

    const Existing = await DriverDailyStatus.findOne({ driver_id, Date });
    if (Existing) {
      const GetSattus = await DriverDailyStatus.findOneAndUpdate(
        { driver_id, Date },
        {
          Total_Deliveries,
          Today_Deliveries,
          Cash_In_Hand,
          Borrowed_Cash,
          Driver_Groups,
        }
      );

      if (!GetSattus)
        return res
          .status(400)
          .json({ message: "Something Went Wrong", status: false });
      return res.status(200).json({
        message: "Updated Sucessfully ",
        data: GetSattus,
        status: true,
      });
    } else {
      const GetSattus = await DriverDailyStatus.create({
        Total_Deliveries,
        Today_Deliveries,
        Cash_In_Hand,
        Borrowed_Cash,
        Driver_Groups,
        driver_id,
        Date,
      });
      if (!GetSattus) {
        res.status(400).json({ message: "Went Wrong", status: false });
      } else {
        res.status(200).json({
          message: "SuccessFully Data",
          data: GetSattus,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};



///DriverDeatils
const GetAllDriverDetailsAndVihcleDeatils = async (req, res) => {
  console.log("hhhh");
  try {
    let data1 = [];
    const getDriverGroup = await DriverProfiles.find();
    const d = getDriverGroup.length - 3;
    console.log(getDriverGroup, "hhhh");
    for (let i = 0; i < d; i++) {
      let data2 = {};
      data2["DriversDeatils"] = await DriverProfiles.find(getDriverGroup[i]);
      data2["VihcileDetails"] = await VehiclAllDetails.find(
        VehiclAllDetails[i]
      );
      data1.push(data2);
      console.log(data2);
    }
    res.status(200).json({ message: "Successfully", data1, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//AddWalletsPost
const AddWalletsPost = async (req, res) => {
  try {
    let Search = Storedata(
      ["amount_Value", "amount_type", "driver_id", "currency"],
      req.body
    );
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });

    const { currency, amount_Value, amount_type, driver_id } = req.body;
    const Existing = await Walltes.findOne({ amount_type, driver_id });
    if (Existing) {
      const GetDetais = await Walltes.findOneAndUpdate(
        { amount_type, driver_id },
        { currency, amount_Value, amount_type, driver_id }
      );
      return res.status(200).json({
        message: "Data successfully",
        data: GetDetais,
        status: true,
      });
    }

    const GetDetais = await Walltes.create({
      currency,
      amount_Value,
      amount_type,
      driver_id,
    });

    res.status(200).json({
      message: "Data successfully",
      data: GetDetais,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//DeliveryDetails
const DeliveryDeatilsAlll = async (req, res) => {
  try {
    let Search = Storedata(
      [
        "amount_Value",
        "pay_type",
        "driver_id",
        "delivery_address",
        "distance",
        "itmes",
        "picked_location",
      ],
      req.body
    );
    if (Search[0] == false)
      return res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });
    const {
      pay_type,
      amount_Value,
      delivery_address,
      driver_id,
      distance,
      picked_location,
      itmes,
    } = req.body;
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let date = year + "-" + month + "-" + day;
    const GetDetais = await DeliveryDeatils.create({
      pay_type,
      amount_Value,
      delivery_address,
      driver_id,
      distance,
      picked_location,
      itmes,
      date,
    });
    res.status(200).json({
      message: "Data successfully",
      data: GetDetais,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//TotalDelivery
// const TotalDelivery = async (req, res) => {
//   try {
//     const Total_Delivery = await DeliveryDeatils.find();
//     res.status(200).json({
//       message: "Total Delivery",
//       Total_Number_Of_Delivery: Total_Delivery.length,
//     });
//   } catch (error) {
//     res.json({ message: error.message, status: false });
//   }
// };

// //TodayDelivery
// const TodayDelivery = async (req, res) => {
//   try {
//     const Today_Delivery = await DeliveryDeatils.findOne();
//     res
//       .status(200)
//       .json({ message: "Today Delivery", TodayDelivery: Today_Delivery });
//   } catch (error) {
//     res.json({ message: error.message, status: false });
//   }
// };

//cashHand
// const CashHandDelivery = async (req, res) => {
//   try {
//     const Total_Cash = await Walltes.findOne();
//     res
//       .status(200)
//       .json({ message: "CashInHand", CashInHands: Total_Cash.length });
//   } catch (error) {
//     res.json({ message: error.message, status: false });
//   }
// };

//Amountforeachdriver
const Amountforeachdriver = async (req, res) => {
  try {
    let userId = req.user;
    let UserDeatils = await User.findOne(
      { _id: req.user },
      { _id: 1, firstname: 1, email: 1 }
    );
    console.log(UserDeatils);

    // let DelveryDetails = await DeliveryDeatils.find({driver_id:req.user});
    const Total_Delivery = await DeliveryDeatils.find({ driver_id: req.user });
    let cashOnHand = await Walltes.find({ driver_id: req.user });
    console.log(cashOnHand);
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let date = year + "-" + month + "-" + day;

    let DelvieryAllDeatils = await DeliveryDeatils.find({
      driver_id: req.user,
      date,
    });

    console.log(DelvieryAllDeatils);
    // let DriversGroups = await DriverGrouops.find({ driver_id: req.user });

    // console.log(DriverGrouops);
    res.status(200).json({
      message: "Fond Data",
      UserDeatils,
      Total_Deliveries: Total_Delivery.length,
      Today_Deliveries: DelvieryAllDeatils.length,
      cashOnHand,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//The supervisor can see the due amount for each driver-
const EachDreiverAmountGetByid = async (req, res) => {
  try {
    // let driver_id = req.user;
    const GetDriverAmount = await Walltes.findOne({ driver_id });
    if (!GetDriverAmount) {
      res
        .status(403)
        .json({ message: "there is no Driver Amounts", status: false });
    }
    res.status(200).json({
      message: "Found  Each Driver Amounts",
      data: GetDriverAmount,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


// const GetActiveStatus = async (req, res) => {
//   try {
//     const driver_id = req.params.id;
//     let GetResponce = await DeliveryDeatils.find({ driver_id })
//       .where("status")
//       .equals("active");
//     res.status(200).json({ message: "Approveed", GetResponce });
//   } catch (e) {
//     res.status(400).json(e.message);
//   }
// };


const driverApproval = async (req, res) => {
  try {
    let Search = Storedata(["driver_id", "status"], req.body);
    if (Search[0] == false)
      res
        .status(400)
        .json({ message: `${Search[1]} Field Required`, data: [] });

    const { status, driver_id } = req.body;
    let Existing = await DeliveryDeatils.create({ status, driver_id });
    res.status(200).json({
      message: "Status changed",
      data: Existing,
      status: true,
    })
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



const driverApprovalupdate = async (req, res) => {
  console.log("Enter");
  try {
    await DriverDetailsAll.findOneAndUpdate(
      {
        _id:req.params.id
      },
      {  status:req.body.status
    
      }
    );
    res.status(200).json({ message: "Successs" });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


// //GetallPendingFollowing
const GetPendingStatusWaitingForAppproved = async (req, res) => {
  try {
    const driver_id = req.params.id;
    let getResponce = await DeliveryDeatils.find({ driver_id })
      .where("status")
      .equals("pending");
    res
      .status(200)
      .json({ message: "Pending Waiting for Approved", getResponce });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



const GetAllDriverList = async (req, res) => {
  try {
    const DriverList = await DriverProfiles.find();
    res
      .status(200)
      .json({ message: "SuccessFully Drivere List-", status: true, data: DriverList});
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};


//GetByDriverid
const GetByDriverId = async (req, res) => {
  try {
    const driver_id = req.params.id;
    let getResponce = await DriverProfiles.find({ driver_id })
    res
      .status(200)
      .json({ message: "Drivers Groups", getResponce:getResponce.length });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};




//getbystatus
const GetByStatus = async(req,res) =>{
  try {
  const Status = req.params.status
  let getResponce = await DriverDetailsAll.find({Status});
  res.status(200).json({message:"Alll Status",getResponce});
    
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
    
  }
}


module.exports = {
  DriverMultpleGroupPost,
  UpdatedDriverMultipleGroups,
  DeleteDriverGroupsByID,
  AddArea,
  UpdatedArea,
  DeleteArea,
  GetAllLocation,
  GetDriversGroups,
  dailystatusofthedriver,
  GetAllDriverDetailsAndVihcleDeatils,
  AddWalletsPost,
  DeliveryDeatilsAlll,
  Amountforeachdriver,
  // TotalDelivery,
  // TodayDelivery,
  // CashHandDelivery,
  EachDreiverAmountGetByid,
  // GetActiveStatus,
  GetPendingStatusWaitingForAppproved,
  driverApproval,
  driverApprovalupdate,
  GetAllDriverList,
  GetByDriverId,
  GetByStatus
  // driverApproval
};

