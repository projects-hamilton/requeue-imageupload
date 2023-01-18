const express = require("express");

const router = express.Router();



const { DriverMultpleGroupPost,
    UpdatedDriverMultipleGroups,
    AddArea,
    UpdatedArea,
    GetAllLocation,
    GetDriversGroups,
    DeleteDriverGroupsByID,

    GetAllDriverDetailsAndVihcleDeatils,
    AddWalletsPost,
    DeliveryDeatilsAlll,
    Amountforeachdriver,
    driverApprovalupdate,
    GetAllDriverList,
    GetByDriverId,
    GetByStatus,
    exportDelivery,
    createInvoice } = require('../controller/SupervisorController');
const { isAuthenticated } = require("../middilware/auth");

router.post("/post-multple-driver-group", isAuthenticated,DriverMultpleGroupPost)
router.patch('/edit-driver-multiple-group/:id', isAuthenticated,UpdatedDriverMultipleGroups)
router.delete('/delete-driver-multple-group/:id', isAuthenticated,DeleteDriverGroupsByID)
router.post('/add-area', isAuthenticated, AddArea)
router.patch('/edit-area/:id', isAuthenticated,UpdatedArea)
router.get('/get-all-location', isAuthenticated, GetAllLocation)
router.get('/get-group', isAuthenticated,GetDriversGroups)
router.get('/get-all-driver-details-vichile', isAuthenticated, GetAllDriverDetailsAndVihcleDeatils)
router.post('/delivery-deatils', DeliveryDeatilsAlll)
router.post('/add-wallet', AddWalletsPost)
router.get('/Amunt-Details', isAuthenticated,Amountforeachdriver)
router.get('/get-each-drive-amount', isAuthenticated, Amountforeachdriver)
// router.get('/total-delivery',TotalDelivery)
// router.get('/today-delivery',TodayDelivery)
// router.get('/cash-in-hand',CashHandDelivery)
// router.post('/driver-aaproved',isAuthenticated,driverApproval)
router.patch('/update-driver-approvel/:id', isAuthenticated, driverApprovalupdate)
router.get('/driver-all-list', isAuthenticated, GetAllDriverList)
router.get('/get-by-driver-id/:id', isAuthenticated, GetByDriverId)
router.get('/get-all-status/:Status', isAuthenticated, GetByStatus)
router.get('/export-invoice-deatils', exportDelivery)
router.get('/invoice-create/:id', createInvoice)

module.exports = router
