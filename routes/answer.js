const router = require("express").Router();
const survey = require("../controller/answer");

router.post("/postanswer", survey.postAnswer);
router.post("/bulkpostanswer", survey.BulkpostAnswer);
router.get("/allanswer", survey.getallAnswer);
router.patch("/updateunswers/:id", survey.UpdateAnswersDetails);
router.delete("/deleteanswer/:id", survey.DeleteAnswersDetails);
router.get("/single/:id", survey.GetSingleQuestionAnswerAndUser);

module.exports = router;
