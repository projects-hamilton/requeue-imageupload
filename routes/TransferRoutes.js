const express = require("express");

const { transfer, GetTransferRequest, TransferApproved, UpdatedAmount } = require("../controller/TransferController");

const router = express.Router();


router.get('/get-transfer',GetTransferRequest)

router.post('/add-transfer-request',transfer)

router.patch('/upadte-request/:id',TransferApproved)
router.patch('/update-amount/:id',UpdatedAmount)


module.exports = router