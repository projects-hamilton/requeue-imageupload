//  count of success delivery
const DriverDetailsAll = require("../models/delivery ");

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
    res.status(200).json({ message: "All delivery", Data:getResponce});
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = {
  getstatusbyDriverid,
  getallSuccesseddelivery,
  getallPendingdelivery,
  getalldelivery,
};
