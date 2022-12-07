const express = require("express");

const router = express.Router();
// const  = require("../controller/userController");
const { Signup, Login, verify_OTP, RestPasswordsendOTP,RestPassword, CheckOtpSendSMS } = require("../controller/userController");


router.post("/signup",Signup)
router.post("/login",Login)
router.post('/verify',verify_OTP);
router.post('/reset-password',RestPasswordsendOTP);

//otpcheck
router.post('/otpcheck',CheckOtpSendSMS);

//RestPasswordLink
router.post('/reset-password',RestPassword);



module.exports=router

