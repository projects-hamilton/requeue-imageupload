const express = require("express");
const router = express.Router();

const {
  getstatusbyDriverid,
  getallSuccesseddelivery,
  getallPendingdelivery,
  DetailDriverId,
  WeeklyReport,
  monthly_Bonus,
  getallDriver,
  gettodaydelivery,
  GetDelveryHistoryByDriverId,
} = require("../controller/DriverController");


router.get(
  "/get-by-driver-id-status/:Driver_id",
  getstatusbyDriverid
);

// get all successed delivery
router.get(
  "/get-all-success-delivery",
  getallSuccesseddelivery
);

// get all pending delivery
router.get("/get-all-pending-delivery",getallPendingdelivery);

// get all  delivery details
router.get('/all-drivers', getallDriver);

router.post("/get-deatils", DetailDriverId);
router.get("/get-alls-reports",WeeklyReport);
router.get("/get-monthly-bonus/:driver_id", monthly_Bonus);
router.get("/get-today-delevery-deatils", gettodaydelivery);
router.get('/get-history-by-driver-id/:id',GetDelveryHistoryByDriverId)
router.get('/get-today-delevry-deatils',gettodaydelivery)

module.exports = router;
