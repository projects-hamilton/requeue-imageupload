


const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const { isAuthenticated } = require("../middilware/auth");
const { Create_store } = require("../controller/storeController");

var storage = multer.diskStorage({

destination: function (req, file, cb) {
cb(null, "public") },


filename: function (req, file, cb) {
    let newname = Math.floor(10000000000 + Math.random() * 90000000000) + "." + file.originalname.split(".")[1]
    file.originalname=newname
    cb(null, file.originalname);},});

var upload = multer({ storage: storage });

// const store_controller = require("../controllers/storeController");

// router.post('/create-store',auth,upload.single('logo'),store_controller)
router.post('/create-store',isAuthenticated,upload.single('logo'),Create_store)


module.exports=router
