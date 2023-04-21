const express = require("express");

const router = express.Router();
const {  AddUsers, EditUsers,getUsers, GetSingleUser, EditVechileDetails, DeleteVehicleDetails, DeleteUsersAll } = require("../controller/userController");


router.get("/get",getUsers)
router.get("/single/:id",GetSingleUser)
router.post("/add",AddUsers)
router.patch("/edit/:id",EditUsers)
router.delete("/delete-user/:id",DeleteUsersAll)
router.patch("/update/:id",EditVechileDetails)
router.delete("/delete-vehicle/:id",DeleteVehicleDetails)



module.exports=router

