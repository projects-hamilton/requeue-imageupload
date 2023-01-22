const {

    DaiyAndMonthlyReport,

    editVechileDetails,

} = require("../controller/AdminController");

const { isAuthenticated } = require("../middilware/auth");
const express = require("express");
const router = express.Router();

router.patch('/edit-vihicle-detail/:id', isAuthenticated, editVechileDetails)
router.get('/get-daily-and-monthly-report', isAuthenticated, DaiyAndMonthlyReport)

module.exports = router


