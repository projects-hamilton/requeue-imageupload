const express = require("express");

const { transfer, GetTransferRequest, driverApprovalupdate } = require("../controller/TransferController");

const router = express.Router();


router.get('/get-transfer',GetTransferRequest)

router.post('/add-transfer-request',transfer)

router.patch('/upadte-request/:id',driverApprovalupdate)


module.exports = router