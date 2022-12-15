const express = require("express");
const router = express.Router();

const { CompanyProfilesPost } = require("../controller/CompanyController");
// router.post('/company-details',CompanyProfilesPost)
router.post("/company-details", CompanyProfilesPost);
module.exports = router;


