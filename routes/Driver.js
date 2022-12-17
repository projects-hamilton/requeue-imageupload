const express = require("express");
const router = express.Router();

const {
  getstatusbyDriverid,
  getallSuccesseddelivery,
  getallPendingdelivery,
  getalldelivery,
  DetailDriverId,
  WeeklyReport,
  monthly_Bonus,
  gettodaydelivery,
  GetDelveryHistoryByDriverId,
} = require("../controller/DriverController");
const { GetAllDriverDetailsAndVihcleDeatils } = require("../controller/SupervisorController");

const { isAuthenticated } = require("../middilware/auth");

// get status by driver id

router.get(
  "/get-by-driver-id-status/:Driver_id",
  isAuthenticated,
  getstatusbyDriverid
);

// get all successed delivery
router.get(
  "/get-all-success-delivery",
  isAuthenticated,
  getallSuccesseddelivery
);

// get all pending delivery
router.get("/get-all-pending-delivery", isAuthenticated, getallPendingdelivery);

// get all  delivery details
router.get("/get-all-delivery-details", isAuthenticated, getalldelivery);

router.post("/get-deatils", DetailDriverId);
router.get("/get-alls-reports", isAuthenticated, WeeklyReport);
router.get("/get-monthly-bonus", isAuthenticated, monthly_Bonus);
router.get("/get-today-delevery-deatils", isAuthenticated, gettodaydelivery);
router.get('/get-history-by-driver-id/:id',isAuthenticated,GetDelveryHistoryByDriverId)

module.exports = router;
