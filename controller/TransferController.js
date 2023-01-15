

const notificationAll = require("../models/notification");
const Transition = require("../models/transition");
const Walltes = require('../models/wallet')
const User = require("../models/user");
const transition = require("../models/transition");

// const {}=require('../models/allschemma')

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

//Function of Notification---
// async function notification(user_id,link,message) {
//     try {
//       let create = await Notification.create({ user_id, link, message })
//       return[true,create]
//     } catch (error) {
//       return [false, error.message]
//     }
//   }
  
//   let a = await notification("asodjiaosijwq90qi0qi0qw", "/hello", "uper waala function h or esa use karna h")
//   if (a[0] == false) return res.status(400).json({ message: a[1], data: [] });
//   let notification = a[1]
  


const transfer = async (req, res) => {
    try {
  
      let search = Storedata(["driver_id", "add_amount"], req.body);
      if (search[0] == false) return res.status(400).json({ message: `${search[1]} Field Requried`, data: [] });
  
      const { driver_id, amount_Value } = req.body;
      const d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();
      let date = year + "-" + month + "-" + day;
  
      const GetCashInhandValue = await Walltes.findOne({ driver_id, amount_type: "cash_in_hand" });
      if (!GetCashInhandValue) return res.status(400).json({ message: "No Cash in hand found" })
      if (GetCashInhandValue.amount_Value < amount_Value) return res.status(400).json({ message: "No balance" })
  
      const GetTransferRequest = await Transition.create({
        driver_id,
        amount_Value,
        date
  
      })

      let notificationData = await notification(driver_id,"#","New Tranfer Request has been added")
      res.status(200).json({ message: "Transfer Request has sent", GetTransferRequest, notificationData })
  
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
  
    }
  
  }


  async function notification(user_id,link,message) {
    try {
      let create = await notificationAll.create({ user_id, link, message })
      return[true,create]
    } catch (error) {
      return [false, error.message]
    }
  }
  

//get---
const GetTransferRequest = async (req, res) => {
    try {
        if(req.query.status){
            let status = req.query.status ? req.query.status : ""
            const getResponce = await Transition.find({ status }).populate('driver_id')
            res
                .status(200)
                .json({ message: "SuccessFully-", status: true, data: getResponce });

        }else{
            const getResponce = await Transition.find().populate('driver_id')
            res
                .status(200)
                .json({ message: "SuccessFully-", status: true, data: getResponce });
        }
     

    } catch (error) {
        res.send({ message: error.message, status: false });
    }
};


//driverApprovalupdate
const TransferApproved = async (req, res) => {
    try {
        const {status} = req.body
        let Existing = await Transition.findOne({ _id: req.params.id})
    
        if (!Existing){
           return  res.status(403).json({message:"somwthing went wrong"})
        }

        if (status =="accepted"){
            let driver_id = Existing.driver_id
    
            const GetCashInhandValue = await Walltes.findOne({driver_id,amount_type: "cash_in_hand" }); 
            if (!GetCashInhandValue) return res.status(400).json({ message: "No Cash in hand found" })
            let current1Value = GetCashInhandValue.amount_Value-Existing.amount_Value
            const getResponce = await Walltes.findOneAndUpdate({ driver_id, amount_type: "cash_in_hand" },{
                amount_Value:current1Value
            }); 
        }
        
        let a = await Transition.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            { status }
        );
       

        res.status(200).json({ message: "Successs", a });
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};



//Upadte-Amount
const UpdatedAmount = async (req, res) => {
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
    transfer,
    GetTransferRequest,
    TransferApproved,
    UpdatedAmount

}