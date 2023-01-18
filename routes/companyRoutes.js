const express = require("express");
const router = express.Router();

const { CompanyProfilesPost,
    DeleteCompanyDetailsById,
    GetAllComapnyDetails,
    GetByCompanyId,
    UpdatedCompanyDetails } = require("../controller/CompanyController");
const { isAuthenticated } = require("../middilware/auth");


router.post("/company-details", isAuthenticated, CompanyProfilesPost);
router.delete('/delete-company-detials/:id', isAuthenticated,DeleteCompanyDetailsById)
router.get('/get-all-comapny-deatils', isAuthenticated,GetAllComapnyDetails)
router.get('/get-by-company-id/:id',isAuthenticated,GetByCompanyId)
router.patch('/edit-company-deatils/:id', isAuthenticated,UpdatedCompanyDetails)

module.exports = router;


