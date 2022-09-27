// /get ans

const Answers = require("../models/answer");
const Question = require("../models/survey");
const User = require("../models/Admin");
//post answer
const postAnswer = async (req, res) => {
  let { UserID, Answer } = req.body;

  try {
    if (!(UserID && Answer)) {
      res
        .status(400)
        .json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await Answers.create({
        UserID,
        Answer,
      });

      if (!getResponce) {
        res
          .status(400)
          .json({ message: "Answers not  Has Posted", status: false });
      } else {
        res.status(200).json({
          message: "postAnswers is  created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};

//get all answer
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

//get all answer
const GetSingleQuestionAnswerAndUser = async (req, res) => {
  try {
    const getQuestionsdata = await Answers.findOne({ _id: req.params.id });
    if (!getQuestionsdata) {
      res.json({ message: "there is no Answers", status: false });
    }
    const getUser = await User.findOne({ _id: getQuestionsdata.UserID });
    const getQuestions = await Question.findOne({
      _id: getQuestionsdata.QuestionID
    });
    res.json({
      message: "Found  Answers",
      data: {"User":getUser,"Question":getQuestions,"Answer":getQuestionsdata},
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Updated Answerd
const UpdateAnswersDetails = async (req, res) => {
  let { UserID, Answer } = req.body;
  try {
    const UpdateQuestionsdata = await Answers.findOneAndUpdate(
      { id: req.params._id },
      { Answer, UserID }
    );
    if (!UpdateQuestionsdata) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Answers  has updated successsfully",
        data: UpdateQuestionsdata,
        status: true,
      });
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//Delete Answers
const DeleteAnswersDetails = async (req, res) => {
  try {
    const deteleQuestionDetails = await Answers.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deteleQuestionDetails) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({
        message: "Answers Details  has deleted successfully",
        status: true,
      });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

module.exports = {
  postAnswer,
  getallAnswer,
  UpdateAnswersDetails,
  DeleteAnswersDetails,
  GetSingleQuestionAnswerAndUser,
};
