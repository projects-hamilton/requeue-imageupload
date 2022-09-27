const express = require("express");
const router = express.Router();

const User = require("../controller/Admin");


router.post("/signup",User.Signup)
router.post("/login",User.Login)



module.exports=router

