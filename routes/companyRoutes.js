const express = require("express");

const { CompanyProfilesPost, 
    DeleteCompanyDetailsById, 
    GetAllComapnyDetails, 
    GetByCompanyId, 
    UpdatedCompanyDetails } = require("../controller/CompanyController");

const router = express.Router();

router.post("/company-details", CompanyProfilesPost);
router.delete('/delete-company-detials/:id',DeleteCompanyDetailsById)
router.get('/get-all-comapny-deatils',GetAllComapnyDetails)
router.get('/get-by-company-id/:id',GetByCompanyId)
router.patch('/edit-company-deatils/:id',UpdatedCompanyDetails)

module.exports = router;


