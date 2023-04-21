//  count of success delivery
const DriverDetailsAll = require("../models/driver");

const Walltes = require('../models/wallet')
const DeliveryDeatils = require("../models/driver");
const User = require("../models/user");
// const Walltes = require("../models/wallet");
// const DeliveryDeatils = require("../models/delivery ");


//CountSuccessStatus--all
const getstatusbyDriverid = async (req, res) => {
  try {
    const Driver_id = req.params.driver_id;
    let getResponce = await DriverDetailsAll.find({ Driver_id });
    let c = 0;
    for (let i = 0; i < getResponce.length; i++) {
      if (getResponce[i]["status"] == "success") {
        c++;
      }
    }
    res.status(200).json({ message: "Alll Status", totalDelivery: c});
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//Storedata This is function for every If Condition
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


// CountSuccessStatus---And Complet Status Delvery----
const getallSuccesseddelivery = async (req, res) => {
  try {
    const Driver_id = req.params.driver_id;
    let getResponce = await DriverDetailsAll.find({ Driver_id });
    let data = [];

    for (let i = 0; i < getResponce.length; i++) {
      if (getResponce[i]["status"] == "success") {
        // console.log(getResponce[i])
        data.push(getResponce[i]);
      }
    }

    res.status(200).json({ message: "Alll Successed", Data: data });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


// get all Pending delivery
const getallPendingdelivery = async (req, res) => {
  try {
    const Driver_id = req.params.driver_id;
    let getResponce = await DriverDetailsAll.find({ Driver_id });
    let data = [];

    for (let i = 0; i < getResponce.length; i++) {
      if (getResponce[i]["status"] == "pending") {
        // console.log(getResponce[i])
        data.push(getResponce[i]);
      }
    }

    res.status(200).json({ message: "All Pending", Data: data });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//get all delivery details
const getallDriver = async (req, res) => {
  try {
    let currentpage = req.query.page ? req.query.page : 1
    let pagelimit = req.query.pagelimit ? req.query.pagelimit : 2
    let page = currentpage * pagelimit - pagelimit;
    const name = req.query.name ? req.query.name : "";
    let getResponce = await DriverDetailsAll.find({ driver_name: { "$regex": name } }).limit(pagelimit).skip(page)
    console.log(getResponce);

    res.status(200).json({
      message: "All delivery", Data: getResponce, currentpage,
      pagelimit
    });

  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



// postapi
const DetailDriverId = async (req, res) => {
  try {

    let search = Storedata(["driver_id", "add_amount"], req.body);
    if (search[0] == false) return res.status(400).json({ message: `${search[1]} Field Requried`, data: [] });

    const { driver_id, add_amount } = req.body;


    const GetborrowedDetails = await Walltes.findOne({ driver_id, amount_type: "cash_in_hand" });
    const Getborrowedcash = await Walltes.findOne({ driver_id, amount_type: "borrowed_cash" });

    if (!GetborrowedDetails) return res.status(400).json({ message: "No Cash in hand found" })
    if (GetborrowedDetails.amount_Value < add_amount) return res.status(400).json({ message: "No balance" })
    if (add_amount > 20) return res.status(400).json({ message: "limit exid" })

    if (!Getborrowedcash) {
      let current1 = GetborrowedDetails.amount_Value
      let update = await Walltes.findOneAndUpdate({ driver_id, amount_type: "cash_in_hand" }, {
        amount_Value: current1 - add_amount
      });
      let create = await Walltes.create({ driver_id, amount_type: "borrowed_cash", amount_Value: add_amount, currency: "KWD" });
    } else {
      let current1 = GetborrowedDetails.amount_Value
      let current2 = Getborrowedcash.amount_Value
      if (current2 + add_amount > 20) {
        return res.status(400).json({ message: "limit exid" })

      }

      let update = await Walltes.findOneAndUpdate({ driver_id, amount_type: "cash_in_hand" }, {
        amount_Value: current1 - add_amount
      });
      let update2 = await Walltes.findOneAndUpdate({ driver_id, amount_type: "borrowed_cash" }, {
        amount_Value: current2 + add_amount
      });
    }

    const GetborrowedDetail = await Walltes.find({ driver_id });

    res.status(200).json({ message: "Borroed_cash", status: true, GetborrowedDetail })
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });

  }
}


// const WeeklyReport = async (req,res) => {
//   console.log("enter")
//   try {
//     let driver_id;
//     let createdAt
//     // let userId = req.user;
//     let UserDeatils = await User.findOne(
//       { _id: req.user },
//       { _id: 1, firstname: 1, email: 1 }
//     );
//     // console.log(UserDeatils);
//     console.log(req.user)
//     const Total_Delivery = await DeliveryDeatils.find({ driver_id: req.user });
//     // console.log(Total_Delivery)
//     const GetWeeklyReport = await Walltes.find(driver_id,createdAt,{
//       $gte:"Mon May 30 18:47:00 +0000 2015",
//       $Lt:"Sun May 3020:40:36+0000 2010"})

//       // console.log(GetWeeklyReport)
//       let GetAllReportsData = await DeliveryDeatils .find({
//         driver_id:req.user
//       })
//     // console.log(GetAllReportsData,"hhhhhh")
//     res.status(200).json({message:"All Reports",UserDeatils,
//     Total_Deliveries: Total_Delivery.length,
//     Today_Deliveries: GetAllReportsData.length,GetWeeklyReport})

//   } catch (error) {
//     res.status(400).json({ message: error.message, status: false });

//   }
// }



const WeeklyReport = async (req, res) => {
  try {
    let date = new Date();
    let driver_id
    let pastdate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    let monthlyReport = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);
    let dailyreport = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 0);

    // let UserDeatils = await User.findById(req.user);
    let UserDeatils = await User.findOne(
      { _id: req.user },
      { _id: 1, firstname: 1, email: 1 }
    );

    // console.log(req.user)

    const Total_Delivery = await DeliveryDeatils.find({
      driver_id: req.user, createdAt: {
        $gte: pastdate,
        $lt: date
      }
    });

    const Daily_Delivery = await DeliveryDeatils.find({
      driver_id: req.user, createdAt: {
        $gte: dailyreport,
        $lt: date
      }
    });

    const Monthly_Delivery = await DeliveryDeatils.find({
      driver_id: req.user, createdAt: {
        $gte: monthlyReport,
        $lt: date
      }
    });

    const GetAllReportsData = await DeliveryDeatils.find({ driver_id: req.user });
    const GetWalletdata = await Walltes.find(driver_id)
    res.status(200).json({
      message: "All Reports", UserDeatils,
      weekly_Deliveries: Total_Delivery.length,
      Total_Deliveries: GetAllReportsData.length, Monthly_Delivery: Monthly_Delivery.length,
      Daily_Delivery: Daily_Delivery.length, GetWalletdata,
    })

  } catch (error) {
    res.status(400).json({ message: error.message, status: false });

  }
}

const monthly_Bonus = async (req, res) => {
  try {
    let date = new Date();
    let Currentdate = new Date(date.getFullYear(), date.getMonth(), 1);
    let monthlyReport = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);
    console.log(Currentdate)

    let Lastdate = new Date(date.getFullYear(), date.getMonth(), 31);
    console.log(Lastdate)

    let search = Storedata(["driver_id"], req.params);
    if (search[0] == false) return res.status(400).json({ message: `${search[1]} Field Requried`, data: [] });

    const { driver_id } = req.params;

    const Total_Delivery = await DeliveryDeatils.find({

      driver_id, createdAt: {
        $gte: Currentdate,
        $lt: Lastdate
      }
    });

    const Monthly_Orders = await DeliveryDeatils.find({
      driver_id: req.user, createdAt: {
        $gte: monthlyReport,
        $lt: date
      }
    });

    let array = {}
    let count = 0;
    let Total_Bonuus = 0
    for (let i = 0; i < Total_Delivery.length; i++) {
      let a = Total_Delivery[i].date
      array[a] = array[a] ? array[a] + 1 : 1
      if (array[a] > 10) count++
    }

    Total_Bonuus = count * 100
    res.status(200).json({ message: "Monthly-Bonus", Total_Bonuus, Total_Delivery: Total_Delivery.length, Monthly_Orders: Monthly_Orders.length })

    // console.log(total_order)

  } catch (error) {
    res.status(400).json({ message: error.message, status: false });

  }
}


const gettodaydelivery = async (req, res) => {
  try {
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let date = year + "-" + month + "-" + day;
    const GetAllReportsData = await DeliveryDeatils.find({ driver_id: req.user, date });
    res.status(200).json({ message: "All Today delivery", Data: GetAllReportsData });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//GetByDriverIdDriversHistory--POending
// const GetDelveryHistoryByDriverId = async (req, res) => {
//   try {
//     // const id = req.params.id;
//     let getResponce = await DriverDetailsAll.findOne({_id:req.params.id});

//     res.status(200).json({ message: "History", getResponce});
//   } catch (error) {
//     res.status(400).json({ message: error.message, status: false });
//   }
// };


const GetDelveryHistoryByDriverId = async (req, res) => {
  try {
    // const driver_id = req.params.id;
    let getResponce = await DeliveryDeatils.find({ _id:req.params.id});
    res
      .status(200)
      .json({ message: " Delvery History",Responce: getResponce});
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};



//GetByidHistory
module.exports = {
  getstatusbyDriverid,
  getallSuccesseddelivery,
  getallPendingdelivery,
  getallDriver,
  DetailDriverId,
  WeeklyReport,
  monthly_Bonus,
  gettodaydelivery,
  GetDelveryHistoryByDriverId
  
};


