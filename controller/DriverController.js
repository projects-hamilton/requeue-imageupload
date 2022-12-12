//  count of success delivery
const DriverDetailsAll = require("../models/delivery ");

const Walltes = require('../models/wallet')

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
    res.status(200).json({ message: "Alll Status", totalDelivery: c });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//Storedata
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

// get all Successed delivery
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
const getalldelivery = async (req, res) => {
  try {
    const Driver_id = req.params.driver_id;
    let getResponce = await DriverDetailsAll.find({ Driver_id });
    res.status(200).json({ message: "All delivery", Data: getResponce });
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
      if(current2+add_amount>20){
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






module.exports = {
  getstatusbyDriverid,
  getallSuccesseddelivery,
  getallPendingdelivery,
  getalldelivery,
  DetailDriverId
};
