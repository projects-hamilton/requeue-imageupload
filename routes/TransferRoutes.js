const express = require("express");

const { transfer, GetTransferRequest, TransferApproved, UpdatedAmount } = require("../controller/TransferController");
// const { isAuthenticated } = require("../middilware/auth");

const router = express.Router();
// isAuthenticated




const { isAuthenticated } = require("../middilware/auth");
router.get('/get-transfer', isAuthenticated, GetTransferRequest)
router.post('/add-transfer-request',isAuthenticated,transfer)

router.patch('/upadte-request/:id',isAuthenticated,TransferApproved)
router.patch('/update-amount/:id',isAuthenticated,UpdatedAmount)


module.exports = router