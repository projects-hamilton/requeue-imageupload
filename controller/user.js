


// /getAll  questions
const Questions = require("../models/survey");

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

module.exports = {
  getQuestions,
};