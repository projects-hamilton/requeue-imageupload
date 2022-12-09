const express = require("express");
const router = express.Router();

const {getstatusbyDriverid } = require("../controller/DriverController");
const { isAuthenticated } = require("../middilware/auth");


// get status by driver id

router.get(
  "/get-by-driver-id-status/:Driver_id",
  isAuthenticated,
  getstatusbyDriverid
);
module.exports= router