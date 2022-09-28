


// /getAll  questions
const Questions = require("../models/survey");
const Answers = require("../models/answer");

const getQuestions = async (req, res) => {
  try {
    const getQuestionsdata = await Questions.find();
    if (!getQuestionsdata) {
      res.json({ message: "there is no Questions", status: false });
    }
    res.json({
      message: "Found  Questions",
      data: getQuestionsdata,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};




//All Answer
const getallAnswer = async (req, res) => {
  try {
    const getQuestionsdata = await Answers.find();
    if (!getQuestionsdata) {
      res.json({ message: "there is no Answers", status: false });
    }
    res.json({
      message: "Found  Answers",
      data: getQuestionsdata,
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};



module.exports = {
  getQuestions,
  getallAnswer
};