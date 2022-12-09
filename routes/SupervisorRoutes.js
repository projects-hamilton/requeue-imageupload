const express = require("express");

const router = express.Router();



const { DriverMultpleGroupPost, 
    UpdatedDriverMultipleGroups, 
    AddArea, 
    UpdatedArea,
     GetAllLocation, 
     GetDriversGroups, 
     DeleteDriverGroupsByID,
     dailystatusofthedriver,
     GetAllDriverDetailsAndVihcleDeatils,
     AddWalletsPost,
     DeliveryDeatilsAlll,
     Amountforeachdriver,
     TotalDelivery,
    //  TodayDelivery,
    //  CashHandDelivery,
     GetPendingStatusWaitingForAppproved,
     driverApproval,
     driverApprovalupdate,
     GetAllDriverList,
     GetByDriverId,
     GetByStatus,
<<<<<<< HEAD
     exportDelivery} = require('../controller/SupervisorController');
=======
     exportUsers,
     GetByDriverIdStatus} = require('../controller/SupervisorController');
>>>>>>> 843c2b6f57b48bce50ccc50aad41d48c82614c7a
const { isAuthenticated } = require("../middilware/auth");

router.post("/post-multple-driver-group",DriverMultpleGroupPost)
router.patch('/edit-driver-multiple-group/:id',UpdatedDriverMultipleGroups)
router.delete('/delete-driver-multple-group/:id',DeleteDriverGroupsByID)
router.post('/add-area',AddArea)
router.patch('/edit-area/:id',UpdatedArea)
router.get('/get-all-location',GetAllLocation)
router.get('/get-group',GetDriversGroups)
router.post('/driver-daily-status',dailystatusofthedriver)
router.get('/get-all-driver-details-vichile',GetAllDriverDetailsAndVihcleDeatils)
router.post('/delivery-deatils',DeliveryDeatilsAlll)
router.post('/add-wallet',AddWalletsPost)
router.get('/Amunt-Details',isAuthenticated,Amountforeachdriver)
router.get('/get-each-drive-amount',isAuthenticated,Amountforeachdriver)
// router.get('/total-delivery',TotalDelivery)
// router.get('/today-delivery',TodayDelivery)
// router.get('/cash-in-hand',CashHandDelivery)
router.post('/driver-aaproved',isAuthenticated,driverApproval)
router.patch('/update-driver-approvel/:id',isAuthenticated,driverApprovalupdate)
router.get('/pending-status/:id',GetPendingStatusWaitingForAppproved)
router.get('/driver-all-list',isAuthenticated,GetAllDriverList)
router.get('/get-by-driver-id/:id',isAuthenticated,GetByDriverId)
router.get('/get-all-status/:Status',isAuthenticated,GetByStatus)
<<<<<<< HEAD
router.get('/export-invoice-deatils',exportDelivery)
=======
// router.get('/export-invoice-deatils',exportUsers)
router.get('/get-by-driver-id-status/:Driver_id',isAuthenticated,GetByDriverIdStatus)

>>>>>>> 843c2b6f57b48bce50ccc50aad41d48c82614c7a
// router.post("/login",User.Login)

module.exports=router
