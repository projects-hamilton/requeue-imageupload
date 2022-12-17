const { SearchAnyUserNamew,
     getUsers, 
     AddUsers, 
     DeleteUsers,
      DeleteDriverDetails,
       AddVechileDetails, 
       EditVechileDetails, 
       DeleteVichle,
        AddAnyDrivers,
        DaiyAndMonthlyReport,
        GetUserCompanyDetails, 
         } = require("../controller/AdminController");



const { isAuthenticated } = require("../middilware/auth");
const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({

destination: function (req, file, cb) {
cb(null, "public") },


filename: function (req, file, cb) {
    let newname = Math.floor(10000000000 + Math.random() * 90000000000) + "." + file.originalname.split(".")[1]
    file.originalname=newname
    cb(null, file.originalname);},});

var upload = multer({ storage: storage });


//get book
router.get("/search-any-user-name/:Name",SearchAnyUserNamew);

router.get('/get-user-deatils',getUsers)
router.post('/add-users',AddUsers)
router.delete('/delete-user-details/:id',DeleteUsers)
router.delete('/delete-driver-details/:id',DeleteDriverDetails)
router.post('/add-vechile-deatils',upload.single("imgUrl"),AddVechileDetails)
// router.get('/get-driver-deatils-vichile-deatils',GetAllDriverDetails)
router.patch('/edit-vihicle-detail/:id',upload.single("imgUrl"),EditVechileDetails)
router.delete('/delete-vihcile/:id',DeleteVichle)
router.post('/add-any-driver',upload.single("driver_images"),AddAnyDrivers)
router.get('/get-daily-and-monthly-report',isAuthenticated,DaiyAndMonthlyReport)
router.get('/get-companies-details',isAuthenticated,GetUserCompanyDetails)
// router.get('/export-users',exportUsers)


module.exports= router


