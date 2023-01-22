const express = require("express");

const router = express.Router();
const {  AddUsers, EditUsers, DeleteUsers, getUsers, GetSingleUser } = require("../controller/userController");


router.get("/get",getUsers)
router.get("/single/:id",GetSingleUser)
router.post("/add",AddUsers)
router.patch("/edit/:id",EditUsers)
router.delete("/delete/:id",DeleteUsers)





module.exports=router

