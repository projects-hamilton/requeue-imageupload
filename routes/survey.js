const router = require("express").Router();
const survey = require('../controller/survey')
const { isAuthenticated } = require("../middilware/auth");


// post book
router.post("/create/question",isAuthenticated, survey.postQuestion);

//get book
router.get("/getquestion",isAuthenticated,survey.getQuestions);

//patch api for book
router.patch("/update/question/:id",isAuthenticated,survey.UpdateQuestionsDetails);

//Delete api --
router.delete("/delete/question/:id",isAuthenticated,survey.DeleteQuestionsDetails);

router.get("/getbyid/:id",isAuthenticated, survey.getByIDQuestions);
// router.post('/postanswer',survey.postAnswer)


module.exports= router