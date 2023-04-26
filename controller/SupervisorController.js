const DriverGrouops = require("../models/driver-group");
const AreaDetails = require("../models/area");
const User = require("../models/user");
const DriverDailyStatus = require("../models/dailystatus");
// const DriverDetailsAll = require("../models/driver-business-detail");
// const VehiclAllDetails = require("../models/vehicle ");
const Walltes = require("../models/wallet");
const DeliveryDeatils = require("../models/delivery ");
const DriverProfiles = require("../models/driver");
const exceljs = require("exceljs");
const InvoiceDetails = require('../models/invoice')
const DriverDetails = require("../models/driver-business-detail");
const { validater } = require("../services/helper");

// const bookidgen = require("bookidgen");

// const { read } = require("xlsx");



//DriverMultpleGroupPost
const DriverMultpleGroupPost = async (req, res) => {
  try {
    let Search = validater(["driver_id", "area_id"], req.body);
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
    let Search = validater(["driver_id", "area_id"], req.body);
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
    let Search = validater(["location", "user_id"], req.body);
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
    let Search = validater(["location", "user_id"], req.body);
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

///DriverDeatils
const GetAllDriverDetailsAndVihcleDeatils = async (req, res) => {
  // console.log("hhhh");
  try {
    let data1 = [];
    const getDriverGroup = await DriverProfiles.find();
    const d = getDriverGroup.length - 3;
    // console.log(getDriverGroup, "hhhh");
    for (let i = 0; i < d; i++) {
      let data2 = {};
      data2["DriversDeatils"] = await DriverProfiles.find(getDriverGroup[i]);
      data2["VihcileDetails"] = await DriverDetails.find(
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
    let Search = validater(
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
    let Search = validater(
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
    let driver_id = req.user;
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


//--------
const driverApprovalupdate = async (req, res) => {
  try {
    let RequestRes = await DeliveryDeatils.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { status: req.body.status }
    );

    res.status(200).json({ message: "Successs", RequestRes });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//getbyUser pending...

// Supervisor can see the pending, collected, full amount for each driver

const GetAllDriverList = async (req, res) => {
  try {
    const DriverList = await DriverProfiles.find();
    res
      .status(200)
      .json({
        message: "SuccessFully Drivere List-",
        status: true,
        data: DriverList,
      });
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

//GetByDriverid
const GetByDriverId = async (req, res) => {
  try {
    const driver_id = req.params.id;
    let getResponce = await DriverProfiles.find({ driver_id });
    res
      .status(200)
      .json({ message: "Drivers Groups", getResponce: getResponce.length });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//getbystatus
const GetByStatus = async (req, res) => {
  try {
    const Status = req.params.status;
    let getResponce = await DeliveryDeatils.find({ Status });
    res.status(200).json({ message: "Alll Status", getResponce });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


// const exportDelivery = async (req, res) => {
//   try {
//     const workbook = new exceljs.Workbook();
//     const worksheet = workbook.addWorksheet("My Invoice");
//     worksheet.columns = [
//       { header: "ID", key: "_id" },
//       { header: "Delivered By", key: "firstname" },
//       { header: "Driver_Id", key: "driver_id" },
//       { header: "Delivery Address", key: "delivery_address" },
//       { header: "date", key: "date" },
//       { header: "Item", key: "itmes" },
//       { header: "picked Location", key: "picked_location" },
//       { header: "amount Value", key: "amount_Value" },
//       { header: "pay Type", key: "pay_type" },
//     ];
//     let counter = 1;
//     let Deliverdata = await InvoiceDetails.find();
//     console.log(Deliverdata)

//     for (let index = 0; index < Deliverdata.length; index++) {
//       let data = Deliverdata[index]

//       let id = data.driver_id;
//       let name = await User.findById(id);
//       console.log(name)
//       data.firstname = name.firstname 
//       console.log(data)
//       data.s_no = counter;
//       worksheet.addRow(data);
//       counter++;
//     }

//     // Deliverdata.forEach((data) => {
//     //   let name = await User.findById(data.driver_id);
//     //   data.firstname = name.firstname
//     //   data.s_no = counter;
//     //   worksheet.addRow(data);
//     //   counter++;
//     // });

//     worksheet.getRow(1).eachCell((cell) => {
//       cell.font = { bold: true };
//     });

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
//     );

//     res.setHeader("Content-Disposition", `attatchement;filename=user.xlsx`);
//     return workbook.xlsx.write(res).then(() => {
//       // console.log("res", res);
//       res.status(200);
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message, status: false });
//   }
// };


const exportDelivery = async (req, res) => {
  // console.log("kkkkk")
  try {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("My Invoice");
    worksheet.columns = [
      { header: "ID", key: "_id" },
      { header: "Delivered By", key: "firstname" },
      { header: "Driver_Id", key: "driver_id" },
      { header: "Delivery Address", key: "delivery_address" },
      { header: "date", key: "date" },
      { header: "Item", key: "itmes" },
      { header: "picked Location", key: "picked_location" },
      { header: "amount Value", key: "amount_Value" },
      { header: "pay Type", key: "pay_type" },
    ];
    let counter = 1;
    let Deliverdata = await InvoiceDetails.find();
    console.log(Deliverdata)

    for (let index = 0; index < Deliverdata.length; index++) {
      let data = Deliverdata[index]

      let id = data.driver_id;
      let name = await User.findById(id);
      console.log(name)
      data.firstname = name.firstname
      console.log(data)
      data.s_no = counter;
      worksheet.addRow(data);
      counter++;
    }
    // Deliverdata.forEach((data) => {
    //   let name = await User.findById(data.driver_id);
    //   data.firstname = name.firstname
    //   data.s_no = counter;
    //   worksheet.addRow(data);
    //   counter++;
    // });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
    );

    res.setHeader("Content-Disposition", `attatchement;filename=user.xlsx`);
    return workbook.xlsx.write(res).then(() => {
      // console.log("res", res);
      res.status(200);
    });

  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//createInvoiceGetAPIS
const createInvoice = async (req, res) => {
  try {
    const id = req.params.id
    let userDetails = await User.findById(id);
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let date = year + "-" + month + "-" + day;
    let Existing = await InvoiceDetails.find({ driver_id: id, date })
    console.log(Existing)
    if (Existing.length > 0) {
      return res.status(400).json({ message: "All Ready Existing" })
    }
    let Delivery = await DeliveryDeatils.find({ driver_id: id, date })
    let totalamount = 0

    for (let index = 0; index < Delivery.length; index++) {
      const element = Delivery[index];
      totalamount += 100
    }

    let a = {
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      driver_id: id,
      email: userDetails.email,
      mobile: userDetails.mobile,
      total_amount: totalamount,
      today_total_delevery: Delivery.length,
      date: date
    }
    let Invoice = await InvoiceDetails.create(a)
    console.log(Invoice)
    res.status(200).json({ message: "data", Invoice })

  } catch (error) {
    res.status(403).json({
      message: error.message
    })
  }
}

//The supervisor will approve the request—

const  approve_requests_supervisorNam = async (req, res) => {
  try {
    const supervisorName = req.params.supervisorName;

    // Connect to the MongoDB database
    // await client.connect();
    // const db = client.db('mydb');

    // Update all pending requests with the given supervisor name to "approved"
    const result = await DeliveryDeatils('requests').updateMany(
      { supervisorName: supervisorName, status: 'pending' },
      { $set: { status: 'approved' } }
    );

    console.log(`${result.modifiedCount} requests approved by ${supervisorName}`);

    // Return a success response
    res.status(200).json({ message: `${result.modifiedCount} requests approved by ${supervisorName}` });
  } catch (err) {
    console.error(err);

    // Return an error response
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Close the MongoDB client
    await client.close();
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
  GetAllDriverDetailsAndVihcleDeatils,
  AddWalletsPost,
  DeliveryDeatilsAlll,
  Amountforeachdriver,
  // TotalDelivery,
  // TodayDelivery,
  // CashHandDelivery,
  EachDreiverAmountGetByid,
  driverApprovalupdate,
  GetAllDriverList,
  GetByDriverId,
  GetByStatus,
  exportDelivery,
  createInvoice,
  approve_requests_supervisorNam
  // driverApproval

};

