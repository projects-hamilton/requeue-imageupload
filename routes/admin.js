const { 
    getUsers, 
    DeleteUsers,

    DeleteVichle,

    DaiyAndMonthlyReport,
    AddUsers,
    EditUsers,
    editVechileDetails,
   
} = require("../controller/AdminController");



const { isAuthenticated } = require("../middilware/auth");
const express = require("express");
const router = express.Router();

// const path = require("path");
// const multer = require("multer");

// var storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         cb(null, "public")
//     },

//     filename: function (req, file, cb) {
//         let newname = Math.floor(10000000000 + Math.random() * 90000000000) + "." + file.originalname.split(".")[1]
//         file.originalname = newname
//         cb(null, file.originalname);
//     },
// });


// var upload = multer({ storage: storage });

router.get('/get-user-deatils', isAuthenticated,getUsers)
router.post('/add-users', isAuthenticated, AddUsers)
router.patch('/edit-user/:id',isAuthenticated,EditUsers)
router.delete('/delete-user-details/:id', isAuthenticated,DeleteUsers)
router.patch('/edit-vihicle-detail/:id', isAuthenticated,editVechileDetails)
router.get('/get-daily-and-monthly-report', isAuthenticated, DaiyAndMonthlyReport)

module.exports = router


