const express = require("express");
const router = express.Router();

const {
  getstatusbyDriverid,
  getallSuccesseddelivery,
  getallPendingdelivery,
  getalldelivery,
  DetailDriverId,
} = require("../controller/DriverController");

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

router.post('/get-deatils',DetailDriverId)

module.exports= router
