const express = require("express");

const router = express.Router();
const {  Login,  RestPasswordsendOTP,RestPassword, CheckOtpSendSMS } = require("../controller/authController");



router.post("/login",Login)
router.post('/reset-password-otp',RestPasswordsendOTP);
router.post('/otpcheck',CheckOtpSendSMS);
router.post('/reset-password',RestPassword);


module.exports=router
