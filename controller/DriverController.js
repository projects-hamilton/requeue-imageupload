

//get status by driver id
const DriverDetailsAll = require("../models/delivery ")

// const getstatusbyDriverid = async (req, res) => {
//   try {
//     // const Driverid = req.params.Driverid;
//     let getResponce = await DriverDetailsAll.find({driver_id});
//     res.status(200).json({ message: "Alll Status", getResponce });
//   } catch (error) {
//     res.status(400).json({ message: error.message, status: false });
//   }
// };

const getstatusbyDriverid = async (req, res) => {
  try {
    const Driver_id = req.params.driver_id;
    let getResponce = await DriverDetailsAll.find({ Driver_id });
    res.status(200).json({ message: "Alll Status", getResponce });
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


module.exports = { getstatusbyDriverid };