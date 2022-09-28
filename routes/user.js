const express = require("express");
const router = express.Router();

const user  = require('../controller/user')


router.get("/get", user.getQuestions);
router.get("/get/:id", user.getByIDQuestions);




module.exports = router;