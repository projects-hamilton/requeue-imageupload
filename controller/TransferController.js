

const notification = require("../models/notification");
const Transition = require("../models/transition");
const Walltes = require('../models/wallet')
const User = require("../models/user");

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


const transfer = async (req, res) => {
    try {

        let search = Storedata(["driver_id", "amount_Value"], req.body);
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
        res.status(200).json({ message: "Transfer Request has sent", GetTransferRequest })

    } catch (error) {
        res.status(400).json({ message: error.message, status: false });

    }

}



//get---
const GetTransferRequest = async (req, res) => {
    try {
        if(req.query.status){
            let status = req.query.status ? req.query.status : ""
            const getResponce = await Transition.find({ status }).populate({ path: "User", strictPopulate: false })
            res
                .status(200)
                .json({ message: "SuccessFully-", status: true, data: getResponce });

        }else{
            const getResponce = await Transition.find().populate({ path: "User", strictPopulate: false })
            res
                .status(200)
                .json({ message: "SuccessFully-", status: true, data: getResponce });
        }
     

    } catch (error) {
        res.send({ message: error.message, status: false });
    }
};
//driverApprovalupdate
const driverApprovalupdate = async (req, res) => {
    console.log("Enter");
    try {
        let a = await Transition.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            { status: req.body.status }
        );

        res.status(200).json({ message: "Successs", a });
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};

module.exports = {
    transfer,
    GetTransferRequest,
    driverApprovalupdate

}